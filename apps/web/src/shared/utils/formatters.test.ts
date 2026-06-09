import { formatKg, formatPercentDelta, titleCase } from './formatters';

describe('formatters', () => {
  test.each([
    [1.234, '1.2 kg CO2'],
    [0, '0.0 kg CO2']
  ])('formats kilograms', (value, expected) => {
    expect(formatKg(value)).toBe(expected);
  });

  test.each([
    [10, 5, '+100% vs yesterday'],
    [5, 10, '-50% vs yesterday'],
    [0, 0, 'No change'],
    [3, 0, 'New activity logged']
  ])('formats deltas', (today, previous, expected) => {
    expect(formatPercentDelta(today, previous)).toBe(expected);
  });

  it('title-cases tokens', () => {
    expect(titleCase('non-vegetarian')).toBe('Non Vegetarian');
  });
});
