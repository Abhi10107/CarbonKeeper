import { memo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryBreakdownItem } from '@carbonkeeper/shared';
import { titleCase } from '@/shared/utils/formatters';

const COLORS = ['#10b981', '#0f766e', '#60a5fa', '#cbd5e1'];

interface BreakdownChartProps {
  data: CategoryBreakdownItem[];
}

export const BreakdownChart = memo(({ data }: BreakdownChartProps) => (
  <section className="surface-card p-6">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-ink">Activity breakdown</h3>
      <p className="text-sm text-slate-500">See which categories shape your footprint most.</p>
    </div>
    <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="totalKgCO2" nameKey="category" innerRadius={65} outerRadius={95} paddingAngle={4}>
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.category} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <p className="font-semibold text-ink">{titleCase(item.category)}</p>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {item.totalKgCO2.toFixed(1)} kg CO2 · {item.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
));
