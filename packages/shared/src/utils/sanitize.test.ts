import { sanitizeActivityText } from './sanitize';

describe('sanitizeActivityText', () => {
  test.each([
    ['  hello   world  ', 'hello world'],
    ['line\u0000break', 'line break'],
    ['already clean', 'already clean']
  ])('sanitizes "%s"', (input, expected) => {
    expect(sanitizeActivityText(input)).toBe(expected);
  });
});
