import type { Request, Response } from 'express';
import { z } from 'zod';
import { validateBody } from './validate';

describe('validateBody', () => {
  it('parses valid request bodies', () => {
    const middleware = validateBody(z.object({ text: z.string() }));
    const request = { body: { text: 'hello' } } as Request;
    const next = jest.fn();
    middleware(request, {} as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('throws for invalid request bodies', () => {
    const middleware = validateBody(z.object({ text: z.string() }));
    expect(() => middleware({ body: {} } as Request, {} as Response, jest.fn())).toThrow();
  });
});
