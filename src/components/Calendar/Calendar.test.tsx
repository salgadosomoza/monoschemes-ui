import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  afterEach(cleanup);
  it('moves focus by day and selects with Enter', () => {
    const onChange = vi.fn();
    render(<Calendar type="date" month={new Date(2026, 3, 1)} defaultValue={new Date(2026, 3, 14)} onChange={onChange} />);
    const april14 = screen.getByRole('button', { name: /Tuesday, April 14, 2026/i });
    april14.focus();
    fireEvent.keyDown(april14, { key: 'ArrowRight' });
    const april15 = screen.getByRole('button', { name: /Wednesday, April 15, 2026/i });
    expect(document.activeElement).toBe(april15);
    fireEvent.keyDown(april15, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 3, 15));
  });

  it('selects a date range in two steps', () => {
    const onChange = vi.fn();
    render(<Calendar type="date-range" month={new Date(2026, 3, 1)} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Monday, April 6, 2026/i }));
    expect(onChange).toHaveBeenLastCalledWith({ start: new Date(2026, 3, 6), end: null });
    fireEvent.click(screen.getByRole('button', { name: /Thursday, April 9, 2026/i }));
    expect(onChange).toHaveBeenLastCalledWith({ start: new Date(2026, 3, 6), end: new Date(2026, 3, 9) });
  });

  it('uses narrow, Monday-first weekday headings', () => {
    render(<Calendar type="date" month={new Date(2026, 3, 1)} locale="en" />);
    const headings = screen.getAllByRole('columnheader').map((heading) => heading.textContent);
    expect(headings).toEqual(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
  });
});
