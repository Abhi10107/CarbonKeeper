import { render, screen } from '@testing-library/react';
import { RecommendationPreview } from './RecommendationPreview';

describe('RecommendationPreview', () => {
  it('renders preview cards', () => {
    render(
      <RecommendationPreview
        recommendations={[
          {
            id: 'r1',
            title: 'Swap two short trips',
            description: 'Use the bus twice each week.',
            category: 'transport',
            estimatedMonthlyReductionKgCO2: 7,
            difficulty: 'medium'
          }
        ]}
      />
    );

    expect(screen.getByText(/swap two short trips/i)).toBeInTheDocument();
  });
});
