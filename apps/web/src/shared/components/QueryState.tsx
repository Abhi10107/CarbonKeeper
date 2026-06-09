import type { ReactNode } from 'react';

interface QueryStateProps {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
}

export const QueryState = ({ isLoading, error, children }: QueryStateProps) => {
  if (isLoading) {
    return <div className="surface-card p-8 text-center text-slate-500">Loading your data...</div>;
  }

  if (error) {
    return <div className="surface-card p-8 text-center text-red-600">{error.message}</div>;
  }

  return <>{children}</>;
};
