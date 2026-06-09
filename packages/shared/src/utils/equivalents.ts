import type { EnvironmentalEquivalent } from '../types';

const SMARTPHONE_CHARGE_KG = 0.00822;
const FAN_HOUR_KG = 0.075;
const BOIL_WATER_KG = 0.039;

export const toEnvironmentalEquivalents = (
  totalKgCO2: number
): EnvironmentalEquivalent[] => [
  {
    label: 'Smartphone charges',
    value: Math.round(totalKgCO2 / SMARTPHONE_CHARGE_KG),
    unit: 'charges'
  },
  {
    label: 'Fan runtime',
    value: Number((totalKgCO2 / FAN_HOUR_KG).toFixed(1)),
    unit: 'hours'
  },
  {
    label: 'Boiled kettles',
    value: Math.round(totalKgCO2 / BOIL_WATER_KG),
    unit: 'times'
  }
];
