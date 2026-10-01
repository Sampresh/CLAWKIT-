import rateLimit from 'express-rate-limit';

const make = (windowMs, limit) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  });

export const globalLimiter = make(15 * 60_000, 300);
export const authLimiter = make(15 * 60_000, 20);
export const formLimiter = make(60 * 60_000, 10);
