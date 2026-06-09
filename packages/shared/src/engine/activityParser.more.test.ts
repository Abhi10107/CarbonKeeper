import { parseActivityText } from './activityParser';

describe('parseActivityText additional coverage', () => {
  test.each([
    ['I drive 7 km every evening', 'car'],
    ['Bus ride to office', 'bus'],
    ['Metro for 18 km', 'train'],
    ['Cycling to the park', 'bike'],
    ['Flight from Mumbai to Bengaluru', 'flight'],
    ['Vegan breakfast and dinner', 'vegetarian'],
    ['Non veg lunch', 'non-vegetarian'],
    ['I ate food outside', 'mixed'],
    ['Air conditioning for 2 hours', 'ac'],
    ['Electricity units were 6 today', 'electricity'],
    ['Trash bag from the kitchen', 'general'],
    ['Garbage disposal', 'general'],
    ['Plane trip 900 km', 'flight'],
    ['I had 3 meals today', 'mixed'],
    ['AC on all afternoon', 'ac']
  ])('detects %s', (input, kind) => {
    expect(parseActivityText(input)?.kind).toBe(kind);
  });
});
