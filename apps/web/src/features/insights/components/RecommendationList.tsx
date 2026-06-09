import type { Recommendation } from '@carbonkeeper/shared';
import { formatKg } from '@/shared/utils/formatters';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export const RecommendationList = ({ recommendations }: RecommendationListProps) => (
  <section className="surface-card p-6">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-ink">Personalized recommendations</h3>
      <p className="text-sm text-slate-500">Specific actions based on your actual activity patterns.</p>
    </div>
    <div className="space-y-3">
      {recommendations.map((recommendation) => (
        <article key={recommendation.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-semibold text-ink">{recommendation.title}</h4>
            <span className="text-sm font-semibold text-brand-700">
              Save {formatKg(recommendation.estimatedMonthlyReductionKgCO2)} / month
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{recommendation.description}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Difficulty: {recommendation.difficulty}
          </p>
        </article>
      ))}
    </div>
  </section>
);
