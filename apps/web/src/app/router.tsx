import { Suspense, lazy, type ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './shell/AppShell';
import { ErrorBoundaryPage } from './shell/ErrorBoundaryPage';
import { RouteFallback } from './shell/RouteFallback';

const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));
const ActivityPage = lazy(() => import('../features/activities/pages/ActivityPage'));
const InsightsPage = lazy(() => import('../features/insights/pages/InsightsPage'));
const ChallengesPage = lazy(() => import('../features/challenges/pages/ChallengesPage'));

const withSuspense = (element: ReactElement) => <Suspense fallback={<RouteFallback />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: 'activities', element: withSuspense(<ActivityPage />) },
      { path: 'insights', element: withSuspense(<InsightsPage />) },
      { path: 'challenges', element: withSuspense(<ChallengesPage />) }
    ]
  }
]);
