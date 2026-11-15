import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormNumber } from './FormNumber';
afterEach(cleanup);
describe('FormNumber', () => {
  it('changes value by buttons and arrow keys within limits', () => {
    const onChange = vi.fn();
    render(<FormNumber label="Amount" defaultValue={4} min={0} max={5} onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Amount' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenLastCalledWith(5);
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenLastCalledWith(5);
    expect((screen.getByRole('button', { name: 'Increase' }) as HTMLButtonElement).disabled).toBe(true);
  });
  it('rejects non-numeric text on blur', () => {
    const onChange = vi.fn();
    render(<FormNumber label="Amount" defaultValue={2} onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Amount' });
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('2');
    expect(onChange).not.toHaveBeenCalled();
  });
  it('supports Shift step increments and Home and End bounds', () => {
    const onChange = vi.fn();
    render(<FormNumber label="Amount" defaultValue={2} min={0} max={30} step={2} onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Amount' });
    fireEvent.keyDown(input, { key: 'ArrowUp', shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith(22);
    fireEvent.keyDown(input, { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith(30);
    fireEvent.keyDown(input, { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
