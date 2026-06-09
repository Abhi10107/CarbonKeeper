import { createParsedActivity } from './carbonEngine';
import { createChallenges } from './challengeEngine';

describe('createChallenges', () => {
  it('tracks progress across challenge types', () => {
    const activities = [
      createParsedActivity({ text: 'bus', category: 'transport', kind: 'bus', amount: 10, unit: 'km' }),
      createParsedActivity({ text: 'train', category: 'transport', kind: 'train', amount: 10, unit: 'km' }),
      createParsedActivity({ text: 'veg', category: 'food', kind: 'vegetarian', amount: 1, unit: 'meals' }),
      createParsedActivity({ text: 'ac', category: 'energy', kind: 'ac', amount: 2, unit: 'hours' })
    ];

    const challenges = createChallenges(activities);
    expect(challenges).toHaveLength(3);
    expect(challenges[0]?.progress).toBe(2);
    expect(challenges[1]?.progress).toBe(1);
    expect(challenges[2]?.progress).toBe(1);
  });
});
