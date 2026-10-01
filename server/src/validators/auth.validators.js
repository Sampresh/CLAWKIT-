import { z } from 'zod';
import { email } from './index.js';

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required').max(200),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z.object({
  token: z.string().min(32).max(200),
  password: z.string().min(12, 'Use at least 12 characters').max(200),
});
