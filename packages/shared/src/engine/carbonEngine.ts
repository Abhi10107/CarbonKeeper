import { EMISSION_FACTORS } from '../config/emissionFactors';
import type { ActivityCategory, ParsedActivity } from '../types';

export interface ActivityDraft {
  text: string;
  category: ActivityCategory;
  kind: ParsedActivity['kind'];
  amount: number;
  unit: ParsedActivity['unit'];
  occurredAt?: string;
  notes?: string[];
  confidence?: number;
}

const computeEstimate = (category: ActivityCategory, kind: ParsedActivity['kind'], amount: number): number => {
  switch (category) {
    case 'transport':
      return EMISSION_FACTORS.transport[kind as keyof typeof EMISSION_FACTORS.transport] * amount;
    case 'food':
      return EMISSION_FACTORS.food[kind as keyof typeof EMISSION_FACTORS.food] * amount;
    case 'energy':
      return EMISSION_FACTORS.energy[kind as keyof typeof EMISSION_FACTORS.energy] * amount;
    case 'waste':
      return EMISSION_FACTORS.waste[kind as keyof typeof EMISSION_FACTORS.waste] * amount;
  }
};

export const createParsedActivity = (draft: ActivityDraft, id = crypto.randomUUID()): ParsedActivity => ({
  id,
  text: draft.text,
  category: draft.category,
  kind: draft.kind,
  amount: draft.amount,
  unit: draft.unit,
  estimatedKgCO2: Number(computeEstimate(draft.category, draft.kind, draft.amount).toFixed(2)),
  occurredAt: draft.occurredAt ?? new Date().toISOString(),
  notes: draft.notes ?? [],
  confidence: draft.confidence ?? 0.9
});

export const sumEmissions = (activities: ParsedActivity[]): number =>
  Number(activities.reduce((total, activity) => total + activity.estimatedKgCO2, 0).toFixed(2));
