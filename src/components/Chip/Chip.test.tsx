import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  afterEach(cleanup);

  it('renders the label', () => {
    render(<Chip label="Design" />);
    expect(screen.getByText('Design')).toBeTruthy();
  });

  it('labels the close control and calls onClose', () => {
    const onClose = vi.fn();
    render(<Chip label="Design" onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Design' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('exposes the selected state and reports each toggle', () => {
    const onSelectedChange = vi.fn();
    const { rerender } = render(<Chip label="Design" onSelectedChange={onSelectedChange} />);
    const labelButton = screen.getByRole('button', { name: 'Design' });

    expect(labelButton.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(labelButton);
    expect(onSelectedChange).toHaveBeenLastCalledWith(true);

    rerender(<Chip label="Design" selected onSelectedChange={onSelectedChange} />);
    expect(screen.getByRole('button', { name: 'Design' }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(onSelectedChange).toHaveBeenLastCalledWith(false);
  });
});
