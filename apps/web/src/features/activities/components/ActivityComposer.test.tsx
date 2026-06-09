import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityComposer } from './ActivityComposer';

describe('ActivityComposer', () => {
  it('updates the field and submits', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<ActivityComposer value="" onChange={onChange} onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/what did you do today/i), 'I drove 12 km today');
    await user.click(screen.getByRole('button', { name: /parse activity/i }));

    expect(onChange).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('fills examples when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<ActivityComposer value="" onChange={onChange} onSubmit={jest.fn()} isSubmitting={false} />);
    await user.click(screen.getByRole('button', { name: /i took the bus to college/i }));
    expect(onChange).toHaveBeenCalledWith('I took the bus to college');
  });
});
