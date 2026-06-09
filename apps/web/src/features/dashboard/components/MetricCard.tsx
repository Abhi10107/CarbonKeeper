interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
}

export const MetricCard = ({ label, value, detail }: MetricCardProps) => (
  <section className="surface-card p-6">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className="mt-4 text-3xl font-bold text-ink">{value}</p>
    <p className="mt-3 text-sm text-slate-500">{detail}</p>
  </section>
);
