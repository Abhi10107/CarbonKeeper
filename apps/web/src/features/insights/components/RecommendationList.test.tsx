import { render, screen } from '@testing-library/react';
import { RecommendationList } from './RecommendationList';

describe('RecommendationList', () => {
  it('shows monthly reduction estimates', () => {
    render(
      <RecommendationList
        recommendations={[
          {
            id: '1',
            title: 'Reduce AC runtime',
            description: 'Trim one hour daily.',
            category: 'energy',
            estimatedMonthlyReductionKgCO2: 10,
            difficulty: 'easy'
          }
        ]}
      />
    );

    expect(screen.getByText(/save 10.0 kg co2/i)).toBeInTheDocument();
  });
});
