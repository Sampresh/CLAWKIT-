import { z } from 'zod';

export const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  unread: z.enum(['true', 'false']).optional(),
});

export const updateMessageSchema = z.object({ read: z.boolean() });
