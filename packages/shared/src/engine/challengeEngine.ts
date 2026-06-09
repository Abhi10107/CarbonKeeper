import type { Challenge, ParsedActivity } from '../types';

export const createChallenges = (activities: ParsedActivity[]): Challenge[] => {
  const busTrips = activities.filter((activity) => activity.kind === 'bus' || activity.kind === 'train').length;
  const vegetarianMeals = activities.filter((activity) => activity.kind === 'vegetarian').length;
  const lowAcDays = activities.filter((activity) => activity.kind === 'ac' && activity.amount <= 3).length;

  return [
    {
      id: 'public-transport-week',
      title: 'Public Transport Week',
      description: 'Use buses or trains for at least 5 logged trips this week.',
      category: 'transport',
      target: 5,
      progress: busTrips,
      unit: 'trips'
    },
    {
      id: 'meat-free-monday',
      title: 'Meat-Free Momentum',
      description: 'Log 4 vegetarian meals this week.',
      category: 'food',
      target: 4,
      progress: vegetarianMeals,
      unit: 'meals'
    },
    {
      id: 'energy-saver',
      title: 'Energy Saver Challenge',
      description: 'Keep AC usage at or below 3 hours on 4 days this week.',
      category: 'energy',
      target: 4,
      progress: lowAcDays,
      unit: 'days'
    }
  ];
};
