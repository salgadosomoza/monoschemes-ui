import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormMultiSelect } from './FormMultiSelect';
afterEach(() => { cleanup(); vi.useRealTimers(); });
const options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'three', label: 'Three' }];
describe('FormMultiSelect', () => {
  it('toggles options, exposes selected state and summarizes excess values', () => {
    const onChange = vi.fn();
    render(<FormMultiSelect label="Teams" options={options} defaultValue={['one', 'two']} onChange={onChange} />);
    expect(screen.getByRole('combobox', { name: /One, Two/ })).toBeTruthy();
    fireEvent.click(screen.getByRole('combobox', { name: /One, Two/ }));
    const option = screen.getByRole('option', { name: /Three/ });
    expect(option.getAttribute('aria-selected')).toBe('false');
    fireEvent.click(option);
    expect(onChange).toHaveBeenLastCalledWith(['one', 'two', 'three']);
    expect(screen.getByRole('combobox', { name: /One, Two \+1/ })).toBeTruthy();
    expect(screen.getByRole('option', { name: /Three/ }).getAttribute('aria-selected')).toBe('true');
  });
  it('closes with Escape', () => {
    vi.useFakeTimers();
    render(<FormMultiSelect label="Teams" options={options} />);
    const trigger = screen.getByRole('combobox', { name: 'Teams: Select' });
    fireEvent.click(trigger); fireEvent.keyDown(trigger, { key: 'Escape' });
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole('listbox')).toBeNull();
  });
  it('moves the active option and toggles it with Space', () => {
    render(<FormMultiSelect label="Teams" options={options} />);
    const trigger = screen.getByRole('combobox', { name: 'Teams: Select' });
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByRole('option', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
  });
});
