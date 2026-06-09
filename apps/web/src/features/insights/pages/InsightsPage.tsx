import { PageIntro } from '@/shared/components/PageIntro';
import { QueryState } from '@/shared/components/QueryState';
import { titleCase } from '@/shared/utils/formatters';
import { useInsightsQuery } from '../hooks';
import { EquivalentCards } from '../components/EquivalentCards';
import { RecommendationList } from '../components/RecommendationList';

const InsightsPage = () => {
  const insightsQuery = useInsightsQuery();

  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Find the patterns behind your footprint"
        description="See which behaviors contribute the most, which shifts would matter most, and how your emissions translate into everyday equivalents."
      />

      <QueryState isLoading={insightsQuery.isLoading} error={insightsQuery.error as Error | null}>
        {insightsQuery.data && (
          <div className="grid gap-6">
            <section className="surface-card p-6">
              <h3 className="text-xl font-bold text-ink">Behavioral analysis</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {insightsQuery.data.categoryBreakdown.map((item) => (
                  <article key={item.category} className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {titleCase(item.category)}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-ink">{item.percentage}% of your footprint</p>
                    <p className="mt-2 text-sm text-slate-500">{item.totalKgCO2.toFixed(1)} kg CO2 total</p>
                  </article>
                ))}
              </div>
            </section>

            <RecommendationList recommendations={insightsQuery.data.recommendations} />
            <EquivalentCards equivalents={insightsQuery.data.equivalents} />
          </div>
        )}
      </QueryState>
    </>
  );
};

export default InsightsPage;
