import { prisma } from '../config/db.js';
import { verifyAccessToken } from '../services/token.service.js';
import { ApiError } from '../utils/ApiError.js';

// Verifies the bearer token, then re-reads the user so revoked/deleted accounts lose access immediately.
export async function verifyToken(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw ApiError.unauthorized();

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized('Invalid or expired token');
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, name: true, role: true, emailVerified: true },
  });
  if (!user) throw ApiError.unauthorized();

  req.user = user;
  next();
}
