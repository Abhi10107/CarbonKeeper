import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 400
  ) {
    super(message);
  }
}

export const notFoundHandler = (_request: Request, _response: Response, next: NextFunction) => {
  next(new AppError('The requested endpoint was not found.', 404));
};

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'The request payload is invalid.',
      issues: error.issues.map((issue) => issue.message)
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    message: 'Something went wrong while processing your request.'
  });
};
