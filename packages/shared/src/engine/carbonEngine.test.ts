import { createParsedActivity, sumEmissions } from './carbonEngine';

describe('carbonEngine', () => {
  test.each([
    ['car', 'transport', 10, 1.92],
    ['bus', 'transport', 10, 1.05],
    ['train', 'transport', 10, 0.41],
    ['bike', 'transport', 10, 0],
    ['flight', 'transport', 10, 2.55],
    ['vegetarian', 'food', 2, 2.2],
    ['mixed', 'food', 2, 3.4],
    ['non-vegetarian', 'food', 2, 5],
    ['ac', 'energy', 2, 2.4],
    ['electricity', 'energy', 2, 1.64],
    ['general', 'waste', 2, 0.9]
  ] as const)('computes %s emissions', (kind, category, amount, total) => {
    const activity = createParsedActivity({
      text: kind,
      category,
      kind,
      amount,
      unit: category === 'food' ? 'meals' : category === 'energy' && kind === 'electricity' ? 'kwh' : category === 'energy' ? 'hours' : category === 'waste' ? 'bags' : 'km'
    });

    expect(activity.estimatedKgCO2).toBe(total);
  });

  it('sums emissions precisely', () => {
    const activities = [
      createParsedActivity({ text: 'car', category: 'transport', kind: 'car', amount: 5, unit: 'km' }),
      createParsedActivity({ text: 'ac', category: 'energy', kind: 'ac', amount: 3, unit: 'hours' })
    ];

    expect(sumEmissions(activities)).toBe(4.56);
  });
});
