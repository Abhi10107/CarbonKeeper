import { useId } from 'react';

interface ActivityComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const examples = ['I drove 12 km today', 'I took the bus to college', 'I ate vegetarian meals today', 'I used AC for 4 hours'];

export const ActivityComposer = ({ value, onChange, onSubmit, isSubmitting }: ActivityComposerProps) => {
  const descriptionId = useId();

  return (
    <section className="surface-card p-6">
      <label htmlFor="activity-input" className="text-lg font-bold text-ink">
        What did you do today?
      </label>
      <p id={descriptionId} className="mt-2 text-sm text-slate-500">
        Describe your activity naturally. CarbonKeeper will estimate category, amount, and emissions for you.
      </p>
      <textarea
        id="activity-input"
        aria-describedby={descriptionId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What did you do today?"
        className="mt-4 min-h-40 w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-base text-ink outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onChange(example)}
            className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            {example}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Parsing...' : 'Parse activity'}
      </button>
    </section>
  );
};
