import { shiftDateKey, toDateKey } from './date';

describe('date utilities', () => {
  it('formats dates consistently', () => {
    expect(toDateKey('2026-06-09T12:00:00.000Z')).toBe('2026-06-09');
  });

  it('shifts dates by days', () => {
    expect(shiftDateKey('2026-06-09', -2)).toBe('2026-06-07');
  });
});
