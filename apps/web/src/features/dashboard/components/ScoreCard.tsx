interface ScoreCardProps {
  score: number;
  status: string;
}

export const ScoreCard = ({ score, status }: ScoreCardProps) => (
  <section className="surface-card relative overflow-hidden p-6">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-teal-500 to-skysoft-500" />
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Carbon Score</p>
    <div className="mt-5 flex items-end gap-4">
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-brand-100 bg-brand-50">
        <span className="text-4xl font-extrabold text-brand-700">{score}</span>
      </div>
      <div>
        <p className="text-sm text-slate-500">Today’s status</p>
        <p className="text-2xl font-bold text-ink">{status}</p>
      </div>
    </div>
  </section>
);
