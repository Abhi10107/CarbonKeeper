export const toDateKey = (value: string | Date): string => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toISOString().slice(0, 10);
};

export const shiftDateKey = (dateKey: string, offsetDays: number): string => {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return toDateKey(date);
};
