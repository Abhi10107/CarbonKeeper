import {
  buildDashboardData,
  buildInsightsData,
  createChallenges,
  createParsedActivity,
  parseActivityText,
  sanitizeActivityText,
  type ParsedActivity
} from '@carbonkeeper/shared';
import { z } from 'zod';
import type { ActivityRepository } from '../types';
import { AppError } from '../middleware/errorHandler';
import type { GeminiParserService } from './geminiService';

const parseRequestSchema = z.object({
  text: z.string().min(2).max(300),
  occurredAt: z.string().datetime().optional()
});

const activitySchema = z.object({
  text: z.string().min(2).max(300),
  category: z.enum(['transport', 'food', 'energy', 'waste']),
  kind: z.enum(['car', 'bus', 'train', 'bike', 'flight', 'vegetarian', 'mixed', 'non-vegetarian', 'ac', 'electricity', 'general']),
  amount: z.number().positive(),
  unit: z.enum(['km', 'hours', 'meals', 'kwh', 'bags', 'trip']),
  occurredAt: z.string().datetime().optional(),
  notes: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8)
});

export class ActivityService {
  constructor(
    private readonly repository: ActivityRepository,
    private readonly geminiParser: GeminiParserService
  ) {}

  async parse(input: unknown): Promise<ParsedActivity> {
    const payload = parseRequestSchema.parse(input);
    const sanitizedText = sanitizeActivityText(payload.text);

    if (!sanitizedText) {
      throw new AppError('Please describe an activity before submitting.', 400);
    }

    const aiParsed = await this.geminiParser.parse(sanitizedText, payload.occurredAt);
    if (aiParsed) {
      return aiParsed;
    }

    const fallback = parseActivityText(sanitizedText);
    if (!fallback) {
      throw new AppError('We could not understand that activity yet. Try adding distance, duration, or meal details.', 422);
    }

    return payload.occurredAt ? { ...fallback, occurredAt: payload.occurredAt } : fallback;
  }

  async log(input: unknown): Promise<ParsedActivity> {
    const payload = activitySchema.parse(input);
    const activity = createParsedActivity(payload);
    return this.repository.save(activity);
  }

  async getDashboard() {
    const activities = await this.repository.list();
    return buildDashboardData(activities);
  }

  async getInsights() {
    const activities = await this.repository.list();
    return buildInsightsData(activities);
  }

  async getChallenges() {
    const activities = await this.repository.list();
    return createChallenges(activities);
  }
}
