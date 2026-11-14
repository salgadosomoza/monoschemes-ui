import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormDate } from './FormDate';

describe('FormDate', () => {
  afterEach(cleanup);

  it('opens on field click, selects a day, closes and returns focus', () => {
    const onChange = vi.fn();
    render(<FormDate label="Date" value="14/04/2026" onChange={onChange} />);
    const field = screen.getByRole('textbox', { name: 'Date' });
    fireEvent.click(field);
    expect(screen.getByRole('dialog', { name: 'Date' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Wednesday, April 15, 2026' }));
    expect(onChange).toHaveBeenCalledWith('15/04/2026');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(field);
  });

  it('opens from the field without moving focus away from it', () => {
    render(<FormDate label="Date" value="14/04/2026" />);
    const field = screen.getByRole('textbox', { name: 'Date' });
    field.focus();
    fireEvent.click(field);
    expect(screen.getByRole('dialog', { name: 'Date' })).toBeTruthy();
    expect(document.activeElement).toBe(field);
  });

  it('focuses the selected day when opened from the icon or shortcut', () => {
    render(<FormDate label="Date" value="14/04/2026" />);
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }));
    const selectedDay = screen.getByRole('button', { name: 'Tuesday, April 14, 2026' });
    expect(document.activeElement).toBe(selectedDay);
    cleanup();
    render(<FormDate label="Date" value="14/04/2026" />);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Date' }), { key: 'ArrowDown', altKey: true });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Tuesday, April 14, 2026' }));
  });

  it('closes with Escape without changing the value', () => {
    const onChange = vi.fn();
    render(<FormDate label="Date" value="14/04/2026" onChange={onChange} defaultOpen />);
    const selectedDay = screen.getByRole('button', { name: 'Tuesday, April 14, 2026' });
    expect(document.activeElement).toBe(selectedDay);
    fireEvent.keyDown(selectedDay, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Date' }));
  });

  it('marks dates outside min/max as disabled and prevents selection', () => {
    const onChange = vi.fn();
    render(<FormDate label="Date" value="14/04/2026" min="2026-04-10" max="2026-04-20" onChange={onChange} defaultOpen />);
    const beforeMin = screen.getByRole('button', { name: 'Thursday, April 9, 2026' });
    expect(beforeMin.getAttribute('aria-disabled')).toBe('true');
    fireEvent.click(beforeMin);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts a typed valid date and marks an impossible date invalid', () => {
    const onChange = vi.fn();
    render(<FormDate label="Date" onChange={onChange} />);
    const field = screen.getByRole('textbox', { name: 'Date' });
    fireEvent.change(field, { target: { value: '29 / 02 / 2025' } });
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.change(field, { target: { value: '28 / 02 / 2025' } });
    expect(field.getAttribute('aria-invalid')).toBeNull();
    expect(onChange).toHaveBeenCalledWith('28/02/2025');
  });

  it('clears a controlled value and calls onChange with an empty string', () => {
    const onChange = vi.fn();
    function ControlledDate() {
      const [value, setValue] = useState('14/04/2026');
      return <FormDate label="Date" value={value} onChange={(next) => { onChange(next); setValue(next); }} />;
    }
    render(<ControlledDate />);
    const field = screen.getByRole('textbox', { name: 'Date' }) as HTMLInputElement;
    fireEvent.change(field, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith('');
    expect(field.value).toBe('');
  });

  it('opens with Alt+ArrowDown', () => {
    render(<FormDate label="Date" />);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Date' }), { key: 'ArrowDown', altKey: true });
    expect(screen.getByRole('dialog', { name: 'Date' })).toBeTruthy();
  });
});
