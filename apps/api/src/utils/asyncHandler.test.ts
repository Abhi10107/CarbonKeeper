import type { NextFunction, Request, Response } from 'express';
import { asyncHandler } from './asyncHandler';

describe('asyncHandler', () => {
  it('forwards rejected promises', async () => {
    const next = jest.fn() as NextFunction;
    const handler = asyncHandler(async () => {
      throw new Error('failed');
    });

    await handler({} as Request, {} as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
