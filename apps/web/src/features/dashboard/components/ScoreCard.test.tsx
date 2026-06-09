import { render, screen } from '@testing-library/react';
import { ScoreCard } from './ScoreCard';

describe('ScoreCard', () => {
  it('shows score and status', () => {
    render(<ScoreCard score={82} status="Good" />);
    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
  });
});
