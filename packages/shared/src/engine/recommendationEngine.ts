import type { ActivityCategory, ParsedActivity, Recommendation } from '../types';
import { sumEmissions } from './carbonEngine';

const categoryTotals = (activities: ParsedActivity[]): Record<ActivityCategory, number> =>
  activities.reduce(
    (accumulator, activity) => {
      accumulator[activity.category] += activity.estimatedKgCO2;
      return accumulator;
    },
    { transport: 0, food: 0, energy: 0, waste: 0 }
  );

const totalTrips = (activities: ParsedActivity[], kind: ParsedActivity['kind']): number =>
  activities.filter((activity) => activity.kind === kind).length;

export const createRecommendations = (activities: ParsedActivity[]): Recommendation[] => {
  if (activities.length === 0) {
    return [
      {
        id: 'starter-1',
        title: 'Log your first week',
        description: 'Add a few transport, food, and energy activities so CarbonKeeper can build tailored advice.',
        category: 'transport',
        estimatedMonthlyReductionKgCO2: 0,
        difficulty: 'easy'
      }
    ];
  }

  const totals = categoryTotals(activities);
  const totalKgCO2 = sumEmissions(activities);
  const recommendations: Recommendation[] = [];

  if (totals.transport >= totalKgCO2 * 0.35) {
    const carTrips = totalTrips(activities, 'car');
    recommendations.push({
      id: 'transport-shift',
      title: 'Swap two short car trips each week',
      description: `Transport is your largest source right now. Replacing two of roughly ${Math.max(carTrips, 2)} weekly car trips with public transport or cycling could cut your footprint noticeably.`,
      category: 'transport',
      estimatedMonthlyReductionKgCO2: Number((totals.transport * 0.18).toFixed(1)),
      difficulty: 'medium'
    });
  }

  if (totals.energy >= totalKgCO2 * 0.25) {
    recommendations.push({
      id: 'energy-ac',
      title: 'Trim one hour of AC use on most days',
      description: 'Your energy footprint suggests cooling is a meaningful driver. Reducing one hour of AC runtime on five days a week can create a steady monthly drop.',
      category: 'energy',
      estimatedMonthlyReductionKgCO2: Number((totals.energy * 0.2).toFixed(1)),
      difficulty: 'easy'
    });
  }

  if (totals.food >= totalKgCO2 * 0.2) {
    recommendations.push({
      id: 'food-switch',
      title: 'Introduce two lower-impact meals weekly',
      description: 'A couple of vegetarian swaps each week can bring down your food emissions without changing your full routine.',
      category: 'food',
      estimatedMonthlyReductionKgCO2: Number((totals.food * 0.15).toFixed(1)),
      difficulty: 'easy'
    });
  }

  if (totals.waste > 0) {
    recommendations.push({
      id: 'waste-sort',
      title: 'Reduce mixed waste volume',
      description: 'Sorting recyclables and compostables can keep general waste from compounding over the month.',
      category: 'waste',
      estimatedMonthlyReductionKgCO2: Number((totals.waste * 0.22).toFixed(1)),
      difficulty: 'medium'
    });
  }

  return recommendations.slice(0, 5);
};
