import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormTime } from './FormTime';
afterEach(() => { cleanup(); vi.useRealTimers(); });
describe('FormTime', () => {
  it('opens, keeps hour selection open, chooses minutes and returns focus', () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<FormTime label="Time" defaultOpen onChange={onChange} />);
    fireEvent.click(screen.getByRole('option', { name: '09' }));
    expect(screen.getByRole('dialog', { name: 'Choose time' })).toBeTruthy();
    fireEvent.click(screen.getByRole('option', { name: '30' }));
    expect(onChange).toHaveBeenCalledWith('09:30');
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByLabelText('Time')).toBe(document.activeElement);
  });
  it('closes on Escape without committing', () => {
    const onChange = vi.fn();
    render(<FormTime label="Time" onChange={onChange} />);
    const input = screen.getByLabelText('Time');
    const trigger = screen.getByRole('button', { name: 'Choose time' });
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts a typed time and enforces the min and max in the picker', () => {
    const onChange = vi.fn();
    render(<FormTime label="Time" defaultOpen min="09:30" max="10:00" onChange={onChange} />);
    const input = screen.getByLabelText('Time') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0930' } });
    expect(onChange).toHaveBeenLastCalledWith('09:30');
    expect(input.value).toBe('09 : 30');
    fireEvent.click(screen.getByRole('option', { name: '08' }));
    expect(screen.getByRole('option', { name: '08' }).getAttribute('aria-disabled')).toBe('true');
    fireEvent.click(screen.getByRole('option', { name: '09' }));
    fireEvent.click(screen.getByRole('option', { name: '25' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('option', { name: '30' }));
    expect(onChange).toHaveBeenLastCalledWith('09:30');
  });
});
