import { ApiError } from '../utils/ApiError.js';

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== 'ADMIN') throw ApiError.forbidden();
  next();
}
