import { render, screen } from '@testing-library/react';
import { EquivalentCards } from './EquivalentCards';

describe('EquivalentCards', () => {
  it('shows all equivalents', () => {
    render(
      <EquivalentCards
        equivalents={[
          { label: 'Smartphone charges', value: 10, unit: 'charges' },
          { label: 'Fan runtime', value: 4, unit: 'hours' },
          { label: 'Boiled kettles', value: 20, unit: 'times' }
        ]}
      />
    );

    expect(screen.getByText(/smartphone charges/i)).toBeInTheDocument();
    expect(screen.getByText(/fan runtime/i)).toBeInTheDocument();
    expect(screen.getByText(/boiled kettles/i)).toBeInTheDocument();
  });
});
