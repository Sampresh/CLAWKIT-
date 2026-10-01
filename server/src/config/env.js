import dotenv from 'dotenv';

// server/.env wins over the root .env shared with docker-compose.
dotenv.config({ path: ['.env', '../.env'], quiet: true });

const REQUIRED = ['DATABASE_URL', 'CLIENT_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const SECRETS = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];

const stripSlash = (url) => (url ? url.replace(/\/+$/, '') : url);

export function validateEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`[env] Missing required variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  for (const k of SECRETS) {
    if (process.env[k].length < 32) console.warn(`[env] ${k} is shorter than 32 characters`);
  }

  if (env.isProd) {
    if (process.env.JWT_ACCESS_SECRET === process.env.JWT_REFRESH_SECRET) {
      console.error('[env] JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must differ in production');
      process.exit(1);
    }
    if (!env.smtp.host) console.warn('[env] SMTP_HOST not set — emails will be logged, not sent');
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5001,
  clientUrl: stripSlash(process.env.CLIENT_URL),
  serverPublicUrl: stripSlash(process.env.SERVER_PUBLIC_URL),
  forceHttps: process.env.FORCE_HTTPS === 'true',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromEmail: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME || 'CLAWKIT',
  },
  adminEmail: process.env.ADMIN_EMAIL,
};
