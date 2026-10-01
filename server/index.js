import { env, validateEnv } from './src/config/env.js';
import { connectDB, prisma } from './src/config/db.js';
import { logger } from './src/utils/logger.js';

validateEnv();

const { app } = await import('./src/app.js');

try {
  await connectDB();
} catch (err) {
  logger.error(`Database connection failed: ${err.message}`);
  process.exit(1);
}

const server = app.listen(env.port, () => logger.info(`API listening on :${env.port} (${env.nodeEnv})`));

const shutdown = (signal) => {
  logger.info(`${signal} received, shutting down`);
  server.close(() => prisma.$disconnect().finally(() => process.exit(0)));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
