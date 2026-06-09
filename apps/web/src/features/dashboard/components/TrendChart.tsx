import { memo } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DailySnapshot } from '@carbonkeeper/shared';

interface TrendChartProps {
  data: DailySnapshot[];
}

export const TrendChart = memo(({ data }: TrendChartProps) => (
  <section className="surface-card p-6">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-ink">Weekly carbon trend</h3>
      <p className="text-sm text-slate-500">Track the last 7 days of estimated CO2 emissions.</p>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="totalKgCO2" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
));
