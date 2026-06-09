import { PageIntro } from '@/shared/components/PageIntro';
import { QueryState } from '@/shared/components/QueryState';
import { titleCase } from '@/shared/utils/formatters';
import { useChallengesQuery } from '../hooks';

const ChallengesPage = () => {
  const challengesQuery = useChallengesQuery();

  return (
    <>
      <PageIntro
        eyebrow="Challenges"
        title="Build momentum with small sustainability wins"
        description="Track streak-friendly goals that reinforce lower-carbon habits across transport, food, and home energy."
      />

      <QueryState isLoading={challengesQuery.isLoading} error={challengesQuery.error as Error | null}>
        {challengesQuery.data && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challengesQuery.data.map((challenge) => {
              const percentage = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));
              return (
                <article key={challenge.id} className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">{titleCase(challenge.category)}</p>
                  <h3 className="mt-2 text-2xl font-bold text-ink">{challenge.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{challenge.description}</p>
                  <div className="mt-6 h-3 rounded-full bg-brand-50">
                    <div className="h-3 rounded-full bg-brand-600 transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    {challenge.progress}/{challenge.target} {challenge.unit}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </QueryState>
    </>
  );
};

export default ChallengesPage;
