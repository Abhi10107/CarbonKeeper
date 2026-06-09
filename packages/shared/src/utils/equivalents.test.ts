import { toEnvironmentalEquivalents } from './equivalents';

describe('toEnvironmentalEquivalents', () => {
  it('returns relatable comparisons', () => {
    const values = toEnvironmentalEquivalents(4.11);
    expect(values.map((item) => item.label)).toEqual(['Smartphone charges', 'Fan runtime', 'Boiled kettles']);
    expect(values[0]?.value).toBeGreaterThan(100);
  });
});
