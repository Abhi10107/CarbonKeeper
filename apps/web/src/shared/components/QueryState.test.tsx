import { render, screen } from '@testing-library/react';
import { QueryState } from './QueryState';

describe('QueryState', () => {
  it('shows loading', () => {
    render(
      <QueryState isLoading error={null}>
        <div>Loaded</div>
      </QueryState>
    );
    expect(screen.getByText(/loading your data/i)).toBeInTheDocument();
  });

  it('shows errors', () => {
    render(
      <QueryState isLoading={false} error={new Error('Oops')}>
        <div>Loaded</div>
      </QueryState>
    );
    expect(screen.getByText('Oops')).toBeInTheDocument();
  });

  it('shows children', () => {
    render(
      <QueryState isLoading={false} error={null}>
        <div>Loaded</div>
      </QueryState>
    );
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
