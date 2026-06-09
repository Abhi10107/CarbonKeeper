import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('shows a metric payload', () => {
    render(<MetricCard label="Today's Footprint" value="3.2 kg CO2" detail="+10% vs yesterday" />);
    expect(screen.getByText(/today's footprint/i)).toBeInTheDocument();
    expect(screen.getByText(/3.2 kg co2/i)).toBeInTheDocument();
  });
});
