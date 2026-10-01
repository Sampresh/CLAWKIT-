import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimit.middleware.js';
import { validate } from '../validators/index.js';
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from '../validators/auth.validators.js';

const router = Router();

router.post('/login', authLimiter, validate({ body: loginSchema }), auth.login);
router.post('/refresh', authLimiter, auth.refresh);
router.post('/logout', auth.logout);
router.get('/me', verifyToken, auth.me);
router.post('/forgot-password', authLimiter, validate({ body: forgotPasswordSchema }), auth.forgotPassword);
router.post('/reset-password', authLimiter, validate({ body: resetPasswordSchema }), auth.resetPassword);

export default router;
