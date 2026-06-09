import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorBoundaryPage } from './ErrorBoundaryPage';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useRouteError: () => new Error('Broken route')
  };
});

describe('ErrorBoundaryPage', () => {
  it('shows a fallback message', () => {
    render(
      <MemoryRouter>
        <ErrorBoundaryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/broken route/i)).toBeInTheDocument();
  });
});
