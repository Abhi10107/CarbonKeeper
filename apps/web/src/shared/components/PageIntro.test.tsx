import { render, screen } from '@testing-library/react';
import { PageIntro } from './PageIntro';

describe('PageIntro', () => {
  it('renders heading content', () => {
    render(<PageIntro eyebrow="Dashboard" title="Hello" description="World" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });
});
