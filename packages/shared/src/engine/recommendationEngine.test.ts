import type { ActivityDraft } from './carbonEngine';
import { createParsedActivity } from './carbonEngine';
import { createRecommendations } from './recommendationEngine';

const recommendationFixtures: Array<[string, ActivityDraft, string]> = [
  ['transport', { text: 'x', category: 'transport', kind: 'car', amount: 25, unit: 'km' }, 'transport-shift'],
  ['energy', { text: 'x', category: 'energy', kind: 'ac', amount: 8, unit: 'hours' }, 'energy-ac'],
  ['food', { text: 'x', category: 'food', kind: 'non-vegetarian', amount: 3, unit: 'meals' }, 'food-switch'],
  ['waste', { text: 'x', category: 'waste', kind: 'general', amount: 3, unit: 'bags' }, 'waste-sort']
];

describe('createRecommendations', () => {
  it('returns a starter recommendation for empty history', () => {
    expect(createRecommendations([])).toHaveLength(1);
  });

  test.each(recommendationFixtures)('creates a %s recommendation', (_label, draft, recommendationId) => {
    const activities = Array.from({ length: 6 }, () => createParsedActivity(draft));
    expect(createRecommendations(activities).some((recommendation) => recommendation.id === recommendationId)).toBe(true);
  });
});
