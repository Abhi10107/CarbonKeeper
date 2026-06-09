import { render, screen } from '@testing-library/react';
import { RouteFallback } from './RouteFallback';

describe('RouteFallback', () => {
  it('renders a loading state', () => {
    render(<RouteFallback />);
    expect(screen.getByText(/loading your carbon snapshot/i)).toBeInTheDocument();
  });
});
