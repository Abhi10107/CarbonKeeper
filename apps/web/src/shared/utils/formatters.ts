export const formatKg = (value: number) => `${value.toFixed(1)} kg CO2`;

export const formatPercentDelta = (today: number, previous: number) => {
  if (previous === 0) {
    return today === 0 ? 'No change' : 'New activity logged';
  }

  const delta = ((today - previous) / previous) * 100;
  const prefix = delta > 0 ? '+' : '';
  return `${prefix}${delta.toFixed(0)}% vs yesterday`;
};

export const titleCase = (value: string) =>
  value.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
