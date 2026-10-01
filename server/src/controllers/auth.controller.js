import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { REFRESH_COOKIE, refreshCookieOptions } from '../config/cookies.js';
import { randomToken, sha256 } from '../lib/crypto.js';
import { sendPasswordResetEmail } from '../services/email.service.js';
import {
  issueRefreshToken,
  purgeExpiredTokens,
  refreshTtlMs,
  revokeAllForUser,
  revokeRefreshToken,
  rotateRefreshToken,
  signAccessToken,
} from '../services/token.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';
import { logger } from '../utils/logger.js';

const BCRYPT_COST = 12;
const RESET_TTL_MS = 30 * 60_000;
// Constant-time-ish path for unknown emails so response timing doesn't reveal accounts.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', BCRYPT_COST);

// Progressive lockout: 5 failures → 1 min, then doubling up to 1 hour.
const lockoutMs = (attempts) => (attempts < 5 ? 0 : Math.min(60_000 * 2 ** (attempts - 5), 3_600_000));

const publicUser = ({ id, email, name, role }) => ({ id, email, name, role });

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE, token, refreshCookieOptions(refreshTtlMs()));
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE, { ...refreshCookieOptions(0), maxAge: undefined });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await bcrypt.compare(password, DUMMY_HASH);
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw ApiError.tooMany('Too many failed attempts. Try again later.');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const attempts = user.failedLoginAttempts + 1;
    const lock = lockoutMs(attempts);
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: attempts, lockedUntil: lock ? new Date(Date.now() + lock) : null },
    });
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.emailVerified) throw ApiError.forbidden('Please verify your email before logging in');

  await prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: 0, lockedUntil: null } });
  await purgeExpiredTokens(user.id);

  setRefreshCookie(res, await issueRefreshToken(user.id));
  ok(res, { accessToken: signAccessToken(user), user: publicUser(user) }, 'Logged in');
}

export async function refresh(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) throw ApiError.unauthorized('Session expired');

  try {
    const { userId, token: next } = await rotateRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.unauthorized('Session expired');

    setRefreshCookie(res, next);
    ok(res, { accessToken: signAccessToken(user), user: publicUser(user) });
  } catch (err) {
    clearRefreshCookie(res);
    throw err;
  }
}

export async function logout(req, res) {
  await revokeRefreshToken(req.cookies?.[REFRESH_COOKIE]);
  clearRefreshCookie(res);
  ok(res, null, 'Logged out');
}

export function me(req, res) {
  ok(res, { user: publicUser(req.user) });
}

const FORGOT_MESSAGE = 'If that email has an account, a reset link is on its way.';

export async function forgotPassword(req, res) {
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });

  if (user) {
    const token = randomToken(32);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetHash: sha256(token), passwordResetExpires: new Date(Date.now() + RESET_TTL_MS) },
    });
    sendPasswordResetEmail(user.email, token).catch((err) => logger.error(err));
  }

  ok(res, null, FORGOT_MESSAGE);
}

export async function resetPassword(req, res) {
  const { token, password } = req.body;
  const user = await prisma.user.findUnique({ where: { passwordResetHash: sha256(token) } });

  if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
    throw ApiError.badRequest('This reset link is invalid or has expired');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, BCRYPT_COST),
      passwordResetHash: null,
      passwordResetExpires: null,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });
  await revokeAllForUser(user.id);

  ok(res, null, 'Password updated. You can now log in.');
}
