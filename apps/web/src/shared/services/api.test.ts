import { api } from './api';

describe('api service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('returns dashboard data', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { carbonScore: 90 } })
    });

    await expect(api.dashboard()).resolves.toEqual({ carbonScore: 90 });
  });

  it('throws on failed requests', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Failed' })
    });

    await expect(api.dashboard()).rejects.toThrow('Failed');
  });
});
