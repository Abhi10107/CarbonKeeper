import { useState } from 'react';
import { PageIntro } from '@/shared/components/PageIntro';
import { ActivityComposer } from '../components/ActivityComposer';
import { ActivityReviewCard } from '../components/ActivityReviewCard';
import { useActivityLogging } from '../hooks';

const ActivityPage = () => {
  const [text, setText] = useState('');
  const { draft, setDraft, parseMutation, logMutation } = useActivityLogging();

  return (
    <>
      <PageIntro
        eyebrow="Activity Logging"
        title="Log your footprint the natural way"
        description="Describe your day in plain English. CarbonKeeper extracts the activity type, quantity, and estimated emissions before anything is saved."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <ActivityComposer
          value={text}
          onChange={setText}
          onSubmit={() => parseMutation.mutate(text)}
          isSubmitting={parseMutation.isPending}
        />

        {draft ? (
          <ActivityReviewCard
            activity={draft}
            onConfirm={() => logMutation.mutate(draft)}
            onDiscard={() => setDraft(null)}
            isSaving={logMutation.isPending}
          />
        ) : (
          <section className="surface-card flex items-center justify-center p-10 text-center text-slate-500">
            Your parsed activity will appear here for confirmation before it is saved.
          </section>
        )}
      </div>

      {(parseMutation.error || logMutation.error) && (
        <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {(parseMutation.error ?? logMutation.error)?.message}
        </div>
      )}

      {logMutation.isSuccess && (
        <div className="mt-6 rounded-3xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-700">
          Activity saved successfully. Your dashboard and insights have been refreshed.
        </div>
      )}
    </>
  );
};

export default ActivityPage;
