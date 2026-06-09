import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody } from '../middleware/validate';
import type { ActivityService } from '../services/activityService';

const parseBodySchema = z.object({
  text: z.string().min(2).max(300),
  occurredAt: z.string().datetime().optional()
});

const logBodySchema = z.object({
  text: z.string().min(2).max(300),
  category: z.enum(['transport', 'food', 'energy', 'waste']),
  kind: z.enum(['car', 'bus', 'train', 'bike', 'flight', 'vegetarian', 'mixed', 'non-vegetarian', 'ac', 'electricity', 'general']),
  amount: z.number().positive(),
  unit: z.enum(['km', 'hours', 'meals', 'kwh', 'bags', 'trip']),
  occurredAt: z.string().datetime().optional(),
  notes: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1).optional()
});

export const createActivityRouter = (activityService: ActivityService) => {
  const router = Router();

  router.post(
    '/parse',
    validateBody(parseBodySchema),
    asyncHandler(async (request, response) => {
      const parsed = await activityService.parse(request.body);
      response.status(200).json({ data: parsed });
    })
  );

  router.post(
    '/log',
    validateBody(logBodySchema),
    asyncHandler(async (request, response) => {
      const saved = await activityService.log(request.body);
      response.status(201).json({ data: saved });
    })
  );

  router.get(
    '/dashboard',
    asyncHandler(async (_request, response) => {
      response.status(200).json({ data: await activityService.getDashboard() });
    })
  );

  router.get(
    '/insights',
    asyncHandler(async (_request, response) => {
      response.status(200).json({ data: await activityService.getInsights() });
    })
  );

  router.get(
    '/challenges',
    asyncHandler(async (_request, response) => {
      response.status(200).json({ data: await activityService.getChallenges() });
    })
  );

  return router;
};
