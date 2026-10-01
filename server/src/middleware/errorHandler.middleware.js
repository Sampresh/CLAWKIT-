import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export function notFound(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err instanceof ApiError ? err.statusCode : err.status || err.statusCode || 500;

  if (status >= 500) logger.error(err);

  const message = status >= 500 && env.isProd ? 'Something went wrong' : err.message || 'Something went wrong';
  const body = { success: false, message };
  if (err.details) body.errors = err.details;
  if (!env.isProd && status >= 500) body.stack = err.stack;

  res.status(status).json(body);
}
