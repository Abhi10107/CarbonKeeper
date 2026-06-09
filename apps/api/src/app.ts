import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import { JsonActivityRepository } from './data/activityRepository';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiRateLimit } from './middleware/rateLimit';
import { createActivityRouter } from './routes/activityRoutes';
import { ActivityService } from './services/activityService';
import { GeminiParserService } from './services/geminiService';
import type { ActivityRepository } from './types';

export interface AppDependencies {
  repository?: ActivityRepository;
  geminiParser?: GeminiParserService;
}

export const createApp = (dependencies: AppDependencies = {}) => {
  const app = express();
  const repository = dependencies.repository ?? new JsonActivityRepository();
  const geminiParser = dependencies.geminiParser ?? new GeminiParserService();
  const activityService = new ActivityService(repository, geminiParser);

  app.use(helmet());
  app.use(
    cors({
      origin: env.FRONTEND_URL ?? 'http://localhost:5173'
    })
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(apiRateLimit);

  app.get('/health', (_request, response) => {
    response.status(200).json({ status: 'ok' });
  });

  app.get('/api/health', (_request, response) => {
    response.status(200).json({ ok: true });
  });

  app.use('/api', createActivityRouter(activityService));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
