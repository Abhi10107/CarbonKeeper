import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validateBody =
  <T>(schema: ZodType<T>): RequestHandler =>
  (request, _response, next) => {
    request.body = schema.parse(request.body);
    next();
  };
