import { GeminiParserService } from './geminiService';

describe('GeminiParserService', () => {
  it('returns null without an API key', async () => {
    const service = new GeminiParserService();
    const result = await service.parse('I drove 10 km');
    expect(result).toBeNull();
  });
});
