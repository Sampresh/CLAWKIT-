import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/db.js';
import { randomToken, sha256 } from '../lib/crypto.js';
import { toMs } from '../lib/duration.js';
import { ApiError } from '../utils/ApiError.js';

const ALG = 'HS256';

export const refreshTtlMs = () => toMs(env.jwt.refreshExpiry);

export function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwt.accessSecret, {
    algorithm: ALG,
    expiresIn: env.jwt.accessExpiry,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret, { algorithms: [ALG] });
}

// Refresh tokens are JWTs carrying a random jti; only the hash of the token is stored.
export async function issueRefreshToken(userId, family = randomToken(16)) {
  const token = jwt.sign({ sub: userId, jti: randomToken(16), fam: family }, env.jwt.refreshSecret, {
    algorithm: ALG,
    expiresIn: env.jwt.refreshExpiry,
  });
  await prisma.refreshToken.create({
    data: { tokenHash: sha256(token), family, userId, expiresAt: new Date(Date.now() + refreshTtlMs()) },
  });
  return token;
}

export async function rotateRefreshToken(token) {
  let payload;
  try {
    payload = jwt.verify(token, env.jwt.refreshSecret, { algorithms: [ALG] });
  } catch {
    throw ApiError.unauthorized('Session expired');
  }

  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: sha256(token) } });
  if (!stored || stored.userId !== payload.sub) throw ApiError.unauthorized('Session expired');

  if (stored.revokedAt) {
    // Reuse of a rotated token: assume theft and end every session in this family.
    await revokeFamily(stored.family);
    throw ApiError.unauthorized('Session expired');
  }

  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  return { userId: stored.userId, token: await issueRefreshToken(stored.userId, stored.family) };
}

export async function revokeRefreshToken(token) {
  if (!token) return;
  await prisma.refreshToken.updateMany({
    where: { tokenHash: sha256(token), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export const revokeFamily = (family) =>
  prisma.refreshToken.updateMany({ where: { family, revokedAt: null }, data: { revokedAt: new Date() } });

export const revokeAllForUser = (userId) =>
  prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });

export const purgeExpiredTokens = (userId) =>
  prisma.refreshToken.deleteMany({ where: { userId, expiresAt: { lt: new Date() } } });
