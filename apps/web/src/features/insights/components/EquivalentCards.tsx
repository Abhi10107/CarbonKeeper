import type { EnvironmentalEquivalent } from '@carbonkeeper/shared';

interface EquivalentCardsProps {
  equivalents: EnvironmentalEquivalent[];
}

export const EquivalentCards = ({ equivalents }: EquivalentCardsProps) => (
  <section className="surface-card p-6">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-ink">Environmental equivalents</h3>
      <p className="text-sm text-slate-500">Translate your emissions into everyday comparisons that are easier to picture.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {equivalents.map((equivalent) => (
        <article key={equivalent.label} className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{equivalent.label}</p>
          <p className="mt-3 text-3xl font-bold text-ink">{equivalent.value}</p>
          <p className="mt-2 text-sm text-slate-500">{equivalent.unit}</p>
        </article>
      ))}
    </div>
  </section>
);
