import { api } from './api';

describe('api service additional endpoints', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test.each([
    ['insights', () => api.insights()],
    ['challenges', () => api.challenges()],
    ['parse', () => api.parseActivity('I drove 12 km today')],
    ['log', () =>
      api.logActivity({
        id: '1',
        text: 'I drove 12 km today',
        category: 'transport',
        kind: 'car',
        amount: 12,
        unit: 'km',
        estimatedKgCO2: 2.3,
        occurredAt: new Date().toISOString(),
        notes: [],
        confidence: 0.9
      })]
  ])('requests %s data', async (_label, action) => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { ok: true } })
    });

    await expect(action()).resolves.toEqual({ ok: true });
  });
});
