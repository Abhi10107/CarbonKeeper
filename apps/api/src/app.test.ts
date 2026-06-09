import request from 'supertest';
import { createParsedActivity } from '@carbonkeeper/shared';
import { createApp } from './app';
import type { ActivityRepository } from './types';
import { GeminiParserService } from './services/geminiService';

class InMemoryRepository implements ActivityRepository {
  constructor(private activities = [createParsedActivity({ text: 'car', category: 'transport', kind: 'car', amount: 10, unit: 'km' })]) {}

  async list() {
    return this.activities;
  }

  async save(activity: ReturnType<typeof createParsedActivity>) {
    this.activities = [...this.activities, activity];
    return activity;
  }
}

class StubGeminiParser extends GeminiParserService {
  override async parse() {
    return null;
  }
}

describe('createApp', () => {
  const app = createApp({
    repository: new InMemoryRepository(),
    geminiParser: new StubGeminiParser()
  });

  it('returns health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('returns dashboard data', async () => {
    const response = await request(app).get('/api/dashboard');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('carbonScore');
  });

  it('parses a supported activity', async () => {
    const response = await request(app).post('/api/parse').send({ text: 'I drove 12 km today' });
    expect(response.status).toBe(200);
    expect(response.body.data.kind).toBe('car');
  });

  it('logs a confirmed activity', async () => {
    const payload = {
      text: 'I used AC for 4 hours',
      category: 'energy',
      kind: 'ac',
      amount: 4,
      unit: 'hours',
      occurredAt: new Date().toISOString(),
      notes: ['manual'],
      confidence: 0.9
    };

    const response = await request(app).post('/api/log').send(payload);
    expect(response.status).toBe(201);
    expect(response.body.data.estimatedKgCO2).toBe(4.8);
  });

  it('returns challenges', async () => {
    const response = await request(app).get('/api/challenges');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(3);
  });

  it('returns insights', async () => {
    const response = await request(app).get('/api/insights');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('recommendations');
  });

  it('handles unknown routes', async () => {
    const response = await request(app).get('/api/missing');
    expect(response.status).toBe(404);
  });
});
