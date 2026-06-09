import { render, screen } from '@testing-library/react';
import { TrendChart } from './TrendChart';

describe('TrendChart', () => {
  it('renders chart heading', () => {
    render(
      <TrendChart
        data={[
          { date: '2026-06-03', totalKgCO2: 1 },
          { date: '2026-06-04', totalKgCO2: 2 },
          { date: '2026-06-05', totalKgCO2: 3 },
          { date: '2026-06-06', totalKgCO2: 2 },
          { date: '2026-06-07', totalKgCO2: 1 },
          { date: '2026-06-08', totalKgCO2: 4 },
          { date: '2026-06-09', totalKgCO2: 3 }
        ]}
      />
    );

    expect(screen.getByText(/weekly carbon trend/i)).toBeInTheDocument();
  });
});
