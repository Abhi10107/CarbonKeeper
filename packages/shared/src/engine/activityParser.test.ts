import { parseActivityText } from './activityParser';

describe('parseActivityText', () => {
  test.each([
    ['I drove 12 km today', 'transport', 'car', 12],
    ['I took the bus to work', 'transport', 'bus', 8],
    ['I used the train for 20 km', 'transport', 'train', 20],
    ['I cycled 6 km in the morning', 'transport', 'bike', 6],
    ['I flew from Delhi to Mumbai', 'transport', 'flight', 1150],
    ['I had a vegetarian lunch', 'food', 'vegetarian', 1],
    ['I had chicken for dinner', 'food', 'non-vegetarian', 1],
    ['I ate two meals today', 'food', 'mixed', 2],
    ['I used AC for 5 hours today', 'energy', 'ac', 5],
    ['I consumed 4 kWh of electricity', 'energy', 'electricity', 4],
    ['I threw one bag of waste', 'waste', 'general', 1]
  ])('parses "%s"', (input, category, kind, amount) => {
    const parsed = parseActivityText(input);
    expect(parsed).not.toBeNull();
    expect(parsed?.category).toBe(category);
    expect(parsed?.kind).toBe(kind);
    expect(parsed?.amount).toBe(amount);
  });

  it('returns null for empty text', () => {
    expect(parseActivityText('   ')).toBeNull();
  });

  it('sanitizes control characters', () => {
    const parsed = parseActivityText('I drove 10 km\u0000 today');
    expect(parsed?.text).toBe('I drove 10 km today');
  });
});
