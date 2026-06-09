export const EMISSION_FACTORS = {
  transport: {
    car: 0.192,
    bus: 0.105,
    train: 0.041,
    bike: 0,
    flight: 0.255
  },
  food: {
    vegetarian: 1.1,
    mixed: 1.7,
    'non-vegetarian': 2.5
  },
  energy: {
    ac: 1.2,
    electricity: 0.82
  },
  waste: {
    general: 0.45
  }
} as const;

export const CITY_DISTANCE_KM: Record<string, number> = {
  'delhi-mumbai': 1150,
  'mumbai-delhi': 1150,
  'delhi-bengaluru': 1740,
  'bengaluru-delhi': 1740,
  'mumbai-bengaluru': 840,
  'bengaluru-mumbai': 840,
  'chennai-hyderabad': 520,
  'hyderabad-chennai': 520
};
