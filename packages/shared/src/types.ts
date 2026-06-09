export type ActivityCategory = 'transport' | 'food' | 'energy' | 'waste';

export type TransportMode = 'car' | 'bus' | 'train' | 'bike' | 'flight';
export type FoodType = 'vegetarian' | 'mixed' | 'non-vegetarian';
export type EnergyType = 'ac' | 'electricity';
export type WasteType = 'general';

export type ActivityKind = TransportMode | FoodType | EnergyType | WasteType;

export interface ParsedActivity {
  id: string;
  text: string;
  category: ActivityCategory;
  kind: ActivityKind;
  amount: number;
  unit: 'km' | 'hours' | 'meals' | 'kwh' | 'bags' | 'trip';
  estimatedKgCO2: number;
  occurredAt: string;
  notes: string[];
  confidence: number;
}

export interface DailySnapshot {
  date: string;
  totalKgCO2: number;
}

export interface CategoryBreakdownItem {
  category: ActivityCategory;
  totalKgCO2: number;
  percentage: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  estimatedMonthlyReductionKgCO2: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface EnvironmentalEquivalent {
  label: string;
  value: number;
  unit: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  target: number;
  progress: number;
  unit: string;
}

export interface DashboardData {
  carbonScore: number;
  carbonStatus: 'Excellent' | 'Good' | 'Needs Attention';
  todayFootprintKgCO2: number;
  previousDayFootprintKgCO2: number;
  weeklyTrend: DailySnapshot[];
  activityBreakdown: CategoryBreakdownItem[];
  sustainabilityStreak: number;
  recommendationsPreview: Recommendation[];
}

export interface InsightsData {
  categoryBreakdown: CategoryBreakdownItem[];
  recommendations: Recommendation[];
  equivalents: EnvironmentalEquivalent[];
}
