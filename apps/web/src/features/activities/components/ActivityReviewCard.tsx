import type { ParsedActivity } from '@carbonkeeper/shared';
import { formatKg, titleCase } from '@/shared/utils/formatters';

interface ActivityReviewCardProps {
  activity: ParsedActivity;
  onConfirm: () => void;
  onDiscard: () => void;
  isSaving: boolean;
}

export const ActivityReviewCard = ({ activity, onConfirm, onDiscard, isSaving }: ActivityReviewCardProps) => (
  <section className="surface-card p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Review before saving</p>
        <h3 className="mt-2 text-2xl font-bold text-ink">{titleCase(activity.kind)}</h3>
      </div>
      <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-500">
        {Math.round(activity.confidence * 100)}% confidence
      </span>
    </div>
    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-4">
        <dt className="text-sm text-slate-500">Category</dt>
        <dd className="mt-2 font-semibold text-ink">{titleCase(activity.category)}</dd>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <dt className="text-sm text-slate-500">Estimated emissions</dt>
        <dd className="mt-2 font-semibold text-ink">{formatKg(activity.estimatedKgCO2)}</dd>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <dt className="text-sm text-slate-500">Amount</dt>
        <dd className="mt-2 font-semibold text-ink">
          {activity.amount} {activity.unit}
        </dd>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <dt className="text-sm text-slate-500">Notes</dt>
        <dd className="mt-2 font-semibold text-ink">{activity.notes[0] ?? 'No extra notes'}</dd>
      </div>
    </dl>
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onConfirm}
        disabled={isSaving}
        className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        {isSaving ? 'Saving...' : 'Confirm and save'}
      </button>
      <button
        type="button"
        onClick={onDiscard}
        className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        Discard
      </button>
    </div>
  </section>
);
