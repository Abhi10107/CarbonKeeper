import type { NextFunction, Request, Response } from 'express';
import { z, type ZodError } from 'zod';
import { AppError, errorHandler } from './errorHandler';

const createResponse = () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;

  return response;
};

describe('errorHandler', () => {
  it('handles app errors', () => {
    const response = createResponse();
    errorHandler(new AppError('Bad request', 400), {} as Request, response, jest.fn() as NextFunction);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('handles zod errors', () => {
    const response = createResponse();
    const schema = z.object({ name: z.string() });
    const parsed = schema.safeParse({});
    errorHandler((parsed as { error: ZodError }).error, {} as Request, response, jest.fn() as NextFunction);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('handles unknown errors', () => {
    const response = createResponse();
    errorHandler(new Error('boom'), {} as Request, response, jest.fn() as NextFunction);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
