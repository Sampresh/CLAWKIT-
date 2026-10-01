import { Router } from 'express';
import * as content from '../controllers/content.controller.js';
import { formLimiter } from '../middleware/rateLimit.middleware.js';
import { validate } from '../validators/index.js';
import { contactSchema, subscribeSchema } from '../validators/content.validators.js';

const router = Router();

router.post('/contact', formLimiter, validate({ body: contactSchema }), content.submitContact);
router.post('/newsletter', formLimiter, validate({ body: subscribeSchema }), content.subscribe);

export default router;
