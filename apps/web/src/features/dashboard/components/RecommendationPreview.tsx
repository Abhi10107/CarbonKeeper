import type { Recommendation } from '@carbonkeeper/shared';

interface RecommendationPreviewProps {
  recommendations: Recommendation[];
}

export const RecommendationPreview = ({ recommendations }: RecommendationPreviewProps) => (
  <section className="surface-card p-6">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-ink">AI recommendations</h3>
      <p className="text-sm text-slate-500">A preview of your highest-impact next steps.</p>
    </div>
    <div className="space-y-3">
      {recommendations.map((recommendation) => (
        <article key={recommendation.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-ink">{recommendation.title}</h4>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              {recommendation.difficulty}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{recommendation.description}</p>
        </article>
      ))}
    </div>
  </section>
);
