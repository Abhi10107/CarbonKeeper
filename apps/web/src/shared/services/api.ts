import type { Challenge, DashboardData, InsightsData, ParsedActivity } from '@carbonkeeper/shared';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...init
  });

  const payload = (await response.json()) as { data?: T; message?: string };

  if (!response.ok || !payload.data) {
    throw new Error(payload.message ?? 'We could not complete your request.');
  }

  return payload.data;
};

export const api = {
  dashboard: () => request<DashboardData>('/api/dashboard'),
  insights: () => request<InsightsData>('/api/insights'),
  challenges: () => request<Challenge[]>('/api/challenges'),
  parseActivity: (text: string) =>
    request<ParsedActivity>('/api/parse', {
      method: 'POST',
      body: JSON.stringify({ text, occurredAt: new Date().toISOString() })
    }),
  logActivity: (activity: ParsedActivity) =>
    request<ParsedActivity>('/api/log', {
      method: 'POST',
      body: JSON.stringify(activity)
    })
};
