import { render, screen } from '@testing-library/react';
import { BreakdownChart } from './BreakdownChart';

describe('BreakdownChart', () => {
  it('renders category labels', () => {
    render(
      <BreakdownChart
        data={[
          { category: 'transport', totalKgCO2: 4, percentage: 50 },
          { category: 'food', totalKgCO2: 2, percentage: 25 },
          { category: 'energy', totalKgCO2: 2, percentage: 25 },
          { category: 'waste', totalKgCO2: 0, percentage: 0 }
        ]}
      />
    );

    expect(screen.getByText(/transport/i)).toBeInTheDocument();
    expect(screen.getByText(/food/i)).toBeInTheDocument();
  });
});
