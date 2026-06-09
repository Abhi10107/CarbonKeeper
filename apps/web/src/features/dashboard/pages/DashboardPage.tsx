import { PageIntro } from '@/shared/components/PageIntro';
import { QueryState } from '@/shared/components/QueryState';
import { formatKg, formatPercentDelta } from '@/shared/utils/formatters';
import { useDashboardQuery } from '../hooks';
import { BreakdownChart } from '../components/BreakdownChart';
import { MetricCard } from '../components/MetricCard';
import { RecommendationPreview } from '../components/RecommendationPreview';
import { ScoreCard } from '../components/ScoreCard';
import { TrendChart } from '../components/TrendChart';

const DashboardPage = () => {
  const dashboardQuery = useDashboardQuery();

  return (
    <>
      <PageIntro
        eyebrow="Dashboard"
        title="Understand your footprint at a glance"
        description="CarbonKeeper turns daily activities into a clear picture of your emissions, trends, streaks, and next steps."
      />

      <QueryState isLoading={dashboardQuery.isLoading} error={dashboardQuery.error as Error | null}>
        {dashboardQuery.data && (
          <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-[1.25fr,1fr,1fr]">
              <ScoreCard score={dashboardQuery.data.carbonScore} status={dashboardQuery.data.carbonStatus} />
              <MetricCard
                label="Today's Footprint"
                value={formatKg(dashboardQuery.data.todayFootprintKgCO2)}
                detail={formatPercentDelta(
                  dashboardQuery.data.todayFootprintKgCO2,
                  dashboardQuery.data.previousDayFootprintKgCO2
                )}
              />
              <MetricCard
                label="Sustainability Streak"
                value={`${dashboardQuery.data.sustainabilityStreak} days`}
                detail="Consecutive days with at least one logged activity."
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
              <TrendChart data={dashboardQuery.data.weeklyTrend} />
              <RecommendationPreview recommendations={dashboardQuery.data.recommendationsPreview} />
            </div>

            <BreakdownChart data={dashboardQuery.data.activityBreakdown} />
          </div>
        )}
      </QueryState>
    </>
  );
};

export default DashboardPage;
