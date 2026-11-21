import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { TagGroup } from './TagGroup';

afterEach(cleanup);

const tags = [
  { label: 'Design' },
  { label: 'Research' },
  { label: 'Product' },
  { label: 'Strategy' },
  { label: 'Accessibility' },
  { label: 'Systems' },
];

describe('TagGroup', () => {
  it('shows up to maxVisible tags and announces the hidden count', () => {
    render(<TagGroup tags={tags} maxVisible={4} />);
    expect(screen.getAllByText(/^(Design|Research|Product|Strategy)$/)).toHaveLength(4);
    expect(screen.queryByText('Accessibility')).toBeNull();
    const control = screen.getByRole('button', { name: 'Show 2 more tags' });
    expect(control.textContent).toBe('+2');
    expect(control.getAttribute('aria-expanded')).toBe('false');
  });

  it('expands and collapses while keeping focus on the same control', () => {
    render(<TagGroup tags={tags} maxVisible={4} />);
    const control = screen.getByRole('button', { name: 'Show 2 more tags' });
    control.focus();
    fireEvent.click(control);
    expect(screen.getByText('Accessibility')).toBeTruthy();
    expect(screen.getByText('Systems')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Show fewer tags' }).textContent).toBe('Show less');
    expect(document.activeElement).toBe(control);
    fireEvent.click(control);
    expect(screen.queryByText('Accessibility')).toBeNull();
  });

  it('supports controlled state and does not show a control without overflow', () => {
    const onExpandedChange = vi.fn();
    const { rerender } = render(<TagGroup tags={tags} maxVisible={6} onExpandedChange={onExpandedChange} />);
    expect(screen.queryByRole('button')).toBeNull();
    rerender(<TagGroup tags={tags} maxVisible={4} expanded={false} onExpandedChange={onExpandedChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Show 2 more tags' }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Accessibility')).toBeNull();
  });

  it('uses semantic list items for tags and the overflow control', () => {
    render(<TagGroup tags={tags} maxVisible={2} />);
    expect(screen.getByRole('list', { name: 'Tags' }).querySelectorAll('li')).toHaveLength(3);
  });
});
