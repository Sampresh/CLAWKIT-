import { z } from 'zod';
import { email } from './index.js';

export const CONTACT_TOPICS = ['support', 'feedback', 'vet', 'press', 'other'];

// `website` is a honeypot: real users never see or fill it.
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email,
  topic: z.enum(CONTACT_TOPICS),
  dogName: z.string().trim().max(60).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(5000),
  website: z.string().max(200).optional(),
});

export const subscribeSchema = z.object({
  email,
  website: z.string().max(200).optional(),
});
