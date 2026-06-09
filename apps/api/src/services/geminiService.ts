import { GoogleGenerativeAI } from '@google/generative-ai';
import { createParsedActivity } from '@carbonkeeper/shared';
import { z } from 'zod';
import { env } from '../config/env';

const geminiResponseSchema = z.object({
  category: z.enum(['transport', 'food', 'energy', 'waste']),
  kind: z.enum(['car', 'bus', 'train', 'bike', 'flight', 'vegetarian', 'mixed', 'non-vegetarian', 'ac', 'electricity', 'general']),
  amount: z.number().positive(),
  unit: z.enum(['km', 'hours', 'meals', 'kwh', 'bags', 'trip']),
  notes: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8)
});

export class GeminiParserService {
  private readonly client = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null;

  async parse(text: string, occurredAt?: string) {
    if (!this.client) {
      return null;
    }

    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
You are extracting a carbon activity into strict JSON.
Return only JSON with keys: category, kind, amount, unit, notes, confidence.
Supported categories: transport, food, energy, waste.
Supported kinds:
- transport: car, bus, train, bike, flight
- food: vegetarian, mixed, non-vegetarian
- energy: ac, electricity
- waste: general
Supported units: km, hours, meals, kwh, bags, trip

Activity: "${text}"
      `.trim();

      const result = await model.generateContent(prompt);
      const raw = result.response.text().replace(/```json|```/g, '').trim();
      const parsed = geminiResponseSchema.parse(JSON.parse(raw));

      return createParsedActivity({
        text,
        category: parsed.category,
        kind: parsed.kind,
        amount: parsed.amount,
        unit: parsed.unit,
        occurredAt,
        notes: parsed.notes,
        confidence: parsed.confidence
      });
    } catch {
      return null;
    }
  }
}
