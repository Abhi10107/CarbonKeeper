import { buildDashboardData, buildInsightsData, getCategoryBreakdown, getStreak } from './dashboardEngine';
import { createParsedActivity } from './carbonEngine';

const baseDate = new Date('2026-06-09T10:00:00.000Z');

const activity = (overrides: Partial<ReturnType<typeof createParsedActivity>>) =>
  createParsedActivity({
    text: 'entry',
    category: 'transport',
    kind: 'car',
    amount: 10,
    unit: 'km',
    occurredAt: baseDate.toISOString(),
    ...overrides
  });

describe('dashboardEngine', () => {
  it('builds dashboard metrics', () => {
    const activities = [
      activity({ occurredAt: '2026-06-09T08:00:00.000Z' }),
      activity({ category: 'food', kind: 'vegetarian', amount: 1, unit: 'meals', occurredAt: '2026-06-08T08:00:00.000Z' })
    ];

    const dashboard = buildDashboardData(activities, baseDate);
    expect(dashboard.todayFootprintKgCO2).toBe(1.92);
    expect(dashboard.previousDayFootprintKgCO2).toBe(1.1);
    expect(dashboard.weeklyTrend).toHaveLength(7);
    expect(dashboard.recommendationsPreview.length).toBeGreaterThan(0);
  });

  it('calculates streaks', () => {
    const activities = [
      activity({ occurredAt: '2026-06-09T08:00:00.000Z' }),
      activity({ occurredAt: '2026-06-08T08:00:00.000Z' }),
      activity({ occurredAt: '2026-06-07T08:00:00.000Z' })
    ];

    expect(getStreak(activities, '2026-06-09')).toBe(3);
  });

  it('builds category percentages', () => {
    const activities = [
      activity({ estimatedKgCO2: 2 }),
      activity({ category: 'food', kind: 'vegetarian', amount: 1, unit: 'meals', estimatedKgCO2: 1 })
    ];

    const breakdown = getCategoryBreakdown(activities);
    expect(breakdown.find((item) => item.category === 'transport')?.percentage).toBe(64);
    expect(breakdown.find((item) => item.category === 'food')?.percentage).toBe(36);
  });

  it('builds insights with equivalents', () => {
    const insights = buildInsightsData([activity({ estimatedKgCO2: 10 })]);
    expect(insights.equivalents).toHaveLength(3);
    expect(insights.recommendations.length).toBeGreaterThan(0);
  });
});
