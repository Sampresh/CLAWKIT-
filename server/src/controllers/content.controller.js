import { prisma } from '../config/db.js';
import { sendContactNotification } from '../services/email.service.js';
import { created, ok } from '../utils/ApiResponse.js';
import { logger } from '../utils/logger.js';

export async function submitContact(req, res) {
  const { website, ...data } = req.body;
  // Honeypot filled → pretend success, store nothing.
  if (website) return created(res, null, 'Thanks! We will get back to you soon.');

  const msg = await prisma.contactMessage.create({
    data: { ...data, dogName: data.dogName || null },
  });
  sendContactNotification(msg).catch((err) => logger.error(err));

  created(res, null, 'Thanks! We will get back to you soon.');
}

export async function subscribe(req, res) {
  const { email, website } = req.body;
  if (!website) {
    await prisma.subscriber.upsert({ where: { email }, create: { email }, update: {} });
  }
  // Same response whether new or existing, so the endpoint can't be used to probe the list.
  ok(res, null, "You're on the list.");
}
