import { prisma } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';

const paged = async (model, { page, pageSize }, where = {}) => {
  const [items, total] = await prisma.$transaction([
    model.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
    model.count({ where }),
  ]);
  return { items, total, page, pageSize, pages: Math.max(1, Math.ceil(total / pageSize)) };
};

export async function stats(_req, res) {
  const [messages, unread, subscribers] = await prisma.$transaction([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.subscriber.count(),
  ]);
  ok(res, { messages, unread, subscribers });
}

export async function listMessages(req, res) {
  const { unread, ...pagination } = req.validatedQuery;
  const where = unread === 'true' ? { read: false } : {};
  ok(res, await paged(prisma.contactMessage, pagination, where));
}

export async function updateMessage(req, res) {
  const updated = await prisma.contactMessage
    .update({ where: { id: req.params.id }, data: { read: req.body.read } })
    .catch(() => null);
  if (!updated) throw ApiError.notFound('Message not found');
  ok(res, updated);
}

export async function deleteMessage(req, res) {
  const { count } = await prisma.contactMessage.deleteMany({ where: { id: req.params.id } });
  if (!count) throw ApiError.notFound('Message not found');
  ok(res, null, 'Deleted');
}

export async function listSubscribers(req, res) {
  ok(res, await paged(prisma.subscriber, req.validatedQuery));
}

export async function deleteSubscriber(req, res) {
  const { count } = await prisma.subscriber.deleteMany({ where: { id: req.params.id } });
  if (!count) throw ApiError.notFound('Subscriber not found');
  ok(res, null, 'Deleted');
}

export async function exportSubscribers(_req, res) {
  const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: 'asc' } });
  const csv = ['email,subscribed_at', ...rows.map((r) => `${r.email},${r.createdAt.toISOString()}`)].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="clawkit-subscribers.csv"');
  res.send(csv);
}
