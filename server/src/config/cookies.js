import { env } from './env.js';

export const REFRESH_COOKIE = 'ck_rt';

// Scoped to the auth routes so the refresh token is never sent anywhere else.
export const refreshCookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? 'none' : 'lax',
  path: '/api/v1/auth',
  maxAge: maxAgeMs,
});
