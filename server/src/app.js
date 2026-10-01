import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.middleware.js';
import { globalLimiter } from './middleware/rateLimit.middleware.js';
import routes from './routes/index.js';

export const app = express();

app.use(helmet());
app.set('trust proxy', 1);

if (env.forceHttps) {
  app.use((req, res, next) => {
    if (req.secure || req.path === '/health') return next();
    res.redirect(308, `https://${req.headers.host}${req.originalUrl}`);
  });
}

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());
app.use(globalLimiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);
