import { Router } from 'express';
import * as admin from '../controllers/admin.controller.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { idParam, validate } from '../validators/index.js';
import { listQuery, updateMessageSchema } from '../validators/admin.validators.js';

const router = Router();

router.use(verifyToken, requireAdmin);

router.get('/stats', admin.stats);
router.get('/messages', validate({ query: listQuery }), admin.listMessages);
router.patch('/messages/:id', validate({ params: idParam, body: updateMessageSchema }), admin.updateMessage);
router.delete('/messages/:id', validate({ params: idParam }), admin.deleteMessage);
router.get('/subscribers', validate({ query: listQuery }), admin.listSubscribers);
router.get('/subscribers/export', admin.exportSubscribers);
router.delete('/subscribers/:id', validate({ params: idParam }), admin.deleteSubscriber);

export default router;
