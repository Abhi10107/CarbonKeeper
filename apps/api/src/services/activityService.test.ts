import { createParsedActivity } from '@carbonkeeper/shared';
import { ActivityService } from './activityService';
import type { ActivityRepository } from '../types';
import { GeminiParserService } from './geminiService';

class InMemoryRepository implements ActivityRepository {
  constructor(private readonly activities = [createParsedActivity({ text: 'car', category: 'transport', kind: 'car', amount: 10, unit: 'km' })]) {}

  async list() {
    return this.activities;
  }

  async save(activity: ReturnType<typeof createParsedActivity>) {
    return activity;
  }
}

class GeminiSuccess extends GeminiParserService {
  override async parse(text: string, occurredAt?: string) {
    return createParsedActivity({
      text,
      category: 'energy',
      kind: 'ac',
      amount: 2,
      unit: 'hours',
      occurredAt
    });
  }
}

class GeminiNull extends GeminiParserService {
  override async parse() {
    return null;
  }
}

describe('ActivityService', () => {
  it('uses Gemini output when available', async () => {
    const service = new ActivityService(new InMemoryRepository(), new GeminiSuccess());
    const parsed = await service.parse({ text: 'I used AC for 2 hours' });
    expect(parsed.kind).toBe('ac');
  });

  it('falls back to rule-based parsing', async () => {
    const service = new ActivityService(new InMemoryRepository(), new GeminiNull());
    const parsed = await service.parse({ text: 'I took the bus to work' });
    expect(parsed.kind).toBe('bus');
  });

  it('saves logged activities', async () => {
    const service = new ActivityService(new InMemoryRepository(), new GeminiNull());
    const saved = await service.log({
      text: 'I had a vegetarian lunch',
      category: 'food',
      kind: 'vegetarian',
      amount: 1,
      unit: 'meals'
    });

    expect(saved.estimatedKgCO2).toBe(1.1);
  });

  it('builds dashboard output', async () => {
    const service = new ActivityService(new InMemoryRepository(), new GeminiNull());
    const dashboard = await service.getDashboard();
    expect(dashboard.activityBreakdown.length).toBe(4);
  });
});
