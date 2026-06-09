import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createParsedActivity } from '@carbonkeeper/shared';
import { ActivityReviewCard } from './ActivityReviewCard';

const activity = createParsedActivity({
  text: 'I used AC for 4 hours',
  category: 'energy',
  kind: 'ac',
  amount: 4,
  unit: 'hours'
});

describe('ActivityReviewCard', () => {
  it('renders parsed values', () => {
    render(<ActivityReviewCard activity={activity} onConfirm={jest.fn()} onDiscard={jest.fn()} isSaving={false} />);
    expect(screen.getByText(/energy/i)).toBeInTheDocument();
    expect(screen.getByText(/4.8 kg co2/i)).toBeInTheDocument();
  });

  it('triggers confirm and discard', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onDiscard = jest.fn();
    render(<ActivityReviewCard activity={activity} onConfirm={onConfirm} onDiscard={onDiscard} isSaving={false} />);
    await user.click(screen.getByRole('button', { name: /confirm and save/i }));
    await user.click(screen.getByRole('button', { name: /discard/i }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onDiscard).toHaveBeenCalled();
  });
});
