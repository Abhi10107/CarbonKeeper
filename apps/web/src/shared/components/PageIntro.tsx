interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const PageIntro = ({ eyebrow, title, description }: PageIntroProps) => (
  <div className="mb-6">
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">{eyebrow}</p>
    <h2 className="mt-2 text-3xl font-extrabold text-ink">{title}</h2>
    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
  </div>
);
