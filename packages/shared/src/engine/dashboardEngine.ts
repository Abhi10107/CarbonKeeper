import type { CategoryBreakdownItem, DashboardData, InsightsData, ParsedActivity } from '../types';
import { createRecommendations } from './recommendationEngine';
import { sumEmissions } from './carbonEngine';
import { toEnvironmentalEquivalents } from '../utils/equivalents';
import { shiftDateKey, toDateKey } from '../utils/date';

const getWeeklyTrend = (activities: ParsedActivity[], today: string) =>
  Array.from({ length: 7 }, (_, index) => {
    const date = shiftDateKey(today, index - 6);
    const totalKgCO2 = sumEmissions(activities.filter((activity) => toDateKey(activity.occurredAt) === date));
    return { date, totalKgCO2 };
  });

export const getCategoryBreakdown = (activities: ParsedActivity[]): CategoryBreakdownItem[] => {
  const total = sumEmissions(activities);
  const totals = activities.reduce<Record<CategoryBreakdownItem['category'], number>>(
    (accumulator, activity) => {
      accumulator[activity.category] += activity.estimatedKgCO2;
      return accumulator;
    },
    { transport: 0, food: 0, energy: 0, waste: 0 }
  );

  return (Object.entries(totals) as Array<[CategoryBreakdownItem['category'], number]>).map(([category, totalKgCO2]) => ({
    category,
    totalKgCO2: Number(totalKgCO2.toFixed(2)),
    percentage: total === 0 ? 0 : Math.round((totalKgCO2 / total) * 100)
  }));
};

export const getStreak = (activities: ParsedActivity[], today: string): number => {
  const dates = new Set(activities.map((activity) => toDateKey(activity.occurredAt)));
  let streak = 0;

  for (let index = 0; index < 365; index += 1) {
    const date = shiftDateKey(today, -index);
    if (!dates.has(date)) break;
    streak += 1;
  }

  return streak;
};

const getScore = (todayFootprintKgCO2: number): DashboardData['carbonScore'] => {
  const score = Math.max(25, Math.round(100 - todayFootprintKgCO2 * 4));
  return Math.min(score, 100);
};

const scoreStatus = (score: number): DashboardData['carbonStatus'] => {
  if (score >= 85) return 'Excellent';
  if (score >= 65) return 'Good';
  return 'Needs Attention';
};

export const buildDashboardData = (activities: ParsedActivity[], now = new Date()): DashboardData => {
  const today = toDateKey(now);
  const yesterday = shiftDateKey(today, -1);
  const todayActivities = activities.filter((activity) => toDateKey(activity.occurredAt) === today);
  const previousDayActivities = activities.filter((activity) => toDateKey(activity.occurredAt) === yesterday);
  const todayFootprintKgCO2 = sumEmissions(todayActivities);
  const previousDayFootprintKgCO2 = sumEmissions(previousDayActivities);
  const carbonScore = getScore(todayFootprintKgCO2);

  return {
    carbonScore,
    carbonStatus: scoreStatus(carbonScore),
    todayFootprintKgCO2,
    previousDayFootprintKgCO2,
    weeklyTrend: getWeeklyTrend(activities, today),
    activityBreakdown: getCategoryBreakdown(activities),
    sustainabilityStreak: getStreak(activities, today),
    recommendationsPreview: createRecommendations(activities).slice(0, 3)
  };
};

export const buildInsightsData = (activities: ParsedActivity[]): InsightsData => {
  const total = sumEmissions(activities);
  return {
    categoryBreakdown: getCategoryBreakdown(activities),
    recommendations: createRecommendations(activities),
    equivalents: toEnvironmentalEquivalents(total)
  };
};
