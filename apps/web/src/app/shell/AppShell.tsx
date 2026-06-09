import { BarChart3, Footprints, Lightbulb, Sparkles } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/activities', label: 'Log Activity', icon: Footprints },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
  { to: '/challenges', label: 'Challenges', icon: Sparkles }
];

export const AppShell = () => (
  <div className="min-h-screen bg-mist">
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-white px-6 py-5 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">CarbonKeeper</p>
          <h1 className="mt-1 text-3xl font-extrabold text-ink">Your calm, conversational carbon coach</h1>
        </div>
        <nav aria-label="Primary" className="flex flex-wrap gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);
