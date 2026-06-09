import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export const ErrorBoundaryPage = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Something unexpected happened.';

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
      <div className="surface-card w-full p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">CarbonKeeper</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">We hit a snag</h1>
        <p className="mt-4 text-slate-600">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};
