import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

// validate({ body, query, params }) → parses each part and replaces it with the parsed value.
export const validate = (schemas) => (req, _res, next) => {
  for (const [part, schema] of Object.entries(schemas)) {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
      throw ApiError.badRequest('Validation failed', details);
    }
    if (part === 'query') req.validatedQuery = result.data;
    else req[part] = result.data;
  }
  next();
};

export const email = z.string().trim().toLowerCase().pipe(z.email('Enter a valid email').max(254));

export const idParam = z.object({ id: z.string().min(1).max(40) });
