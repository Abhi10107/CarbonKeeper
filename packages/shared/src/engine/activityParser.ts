import { CITY_DISTANCE_KM } from '../config/emissionFactors';
import { createParsedActivity } from './carbonEngine';
import { sanitizeActivityText } from '../utils/sanitize';
import type { ParsedActivity } from '../types';

const extractNumber = (text: string): number | undefined => {
  const match = text.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : undefined;
};

const extractWordNumber = (text: string): number | undefined => {
  const numberWords: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5
  };

  const match = text.match(/\b(one|two|three|four|five)\b/i);
  return match?.[1] ? numberWords[match[1].toLowerCase()] : undefined;
};

const inferFlightDistance = (text: string): number | undefined => {
  const routeMatch = text.match(/from\s+([a-z\s]+?)\s+to\s+([a-z\s]+)/i);
  if (!routeMatch) return undefined;
  const from = routeMatch[1];
  const to = routeMatch[2];
  if (!from || !to) return undefined;
  const key = `${from.trim().toLowerCase()}-${to.trim().toLowerCase()}`.replace(/\s+/g, '');
  return CITY_DISTANCE_KM[key];
};

const mealCount = (text: string): number => {
  if (/\b(breakfast|lunch|dinner)\b/i.test(text)) {
    return (text.match(/\b(breakfast|lunch|dinner)\b/gi) ?? []).length;
  }

  if (/\bmeals?\b/i.test(text)) {
    return extractNumber(text) ?? extractWordNumber(text) ?? 1;
  }

  return 1;
};

export const parseActivityText = (input: string): ParsedActivity | null => {
  const text = sanitizeActivityText(input);

  if (!text) {
    return null;
  }

  if (/\b(drove|drive|car)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 5;
    return createParsedActivity({
      text,
      category: 'transport',
      kind: 'car',
      amount,
      unit: 'km',
      notes: ['Detected a car trip from the phrasing.'],
      confidence: 0.92
    });
  }

  if (/\b(bus)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 8;
    return createParsedActivity({
      text,
      category: 'transport',
      kind: 'bus',
      amount,
      unit: 'km',
      notes: ['Estimated a bus trip distance from the text.'],
      confidence: 0.86
    });
  }

  if (/\b(train|metro)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 10;
    return createParsedActivity({
      text,
      category: 'transport',
      kind: 'train',
      amount,
      unit: 'km',
      notes: ['Mapped train or metro travel to rail emission factors.'],
      confidence: 0.86
    });
  }

  if (/\b(bike|bicycle|cycled|cycling)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 4;
    return createParsedActivity({
      text,
      category: 'transport',
      kind: 'bike',
      amount,
      unit: 'km',
      notes: ['Cycling is treated as zero direct operational emissions.'],
      confidence: 0.9
    });
  }

  if (/\b(flew|flight|airplane|plane)\b/i.test(text)) {
    const amount = extractNumber(text) ?? inferFlightDistance(text) ?? 800;
    return createParsedActivity({
      text,
      category: 'transport',
      kind: 'flight',
      amount,
      unit: 'km',
      notes: ['Flight distance was inferred from route or fallback averages.'],
      confidence: inferFlightDistance(text) ? 0.94 : 0.78
    });
  }

  if (/\b(vegetarian|vegan)\b/i.test(text)) {
    return createParsedActivity({
      text,
      category: 'food',
      kind: 'vegetarian',
      amount: mealCount(text),
      unit: 'meals',
      notes: ['Food emissions estimated from a lower-impact meal profile.'],
      confidence: 0.88
    });
  }

  if (/\b(chicken|mutton|beef|non[- ]veg)\b/i.test(text)) {
    return createParsedActivity({
      text,
      category: 'food',
      kind: 'non-vegetarian',
      amount: mealCount(text),
      unit: 'meals',
      notes: ['Higher-impact meal assumptions applied for meat-heavy meals.'],
      confidence: 0.88
    });
  }

  if (/\b(meals?|ate|food|lunch|dinner|breakfast)\b/i.test(text)) {
    return createParsedActivity({
      text,
      category: 'food',
      kind: 'mixed',
      amount: mealCount(text),
      unit: 'meals',
      notes: ['Food entry defaulted to a mixed meal profile.'],
      confidence: 0.72
    });
  }

  if (/\b(ac|air conditioner|air conditioning)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 1;
    return createParsedActivity({
      text,
      category: 'energy',
      kind: 'ac',
      amount,
      unit: 'hours',
      notes: ['AC emissions were estimated from hours of runtime.'],
      confidence: 0.9
    });
  }

  if (/\b(electricity|kwh|units)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 1;
    return createParsedActivity({
      text,
      category: 'energy',
      kind: 'electricity',
      amount,
      unit: 'kwh',
      notes: ['Electricity usage was mapped to a grid-average factor.'],
      confidence: 0.84
    });
  }

  if (/\b(waste|trash|garbage|bin)\b/i.test(text)) {
    const amount = extractNumber(text) ?? 1;
    return createParsedActivity({
      text,
      category: 'waste',
      kind: 'general',
      amount,
      unit: 'bags',
      notes: ['Waste emissions were estimated from a general disposal baseline.'],
      confidence: 0.78
    });
  }

  return null;
};
