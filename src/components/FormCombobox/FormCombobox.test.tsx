import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { FormCombobox } from './FormCombobox';

afterEach(cleanup);

const options = [
  { value: 'cafe', label: 'Café Norte' },
  { value: 'studio', label: 'Mar Sala Estudio' },
  { value: 'disabled', label: 'Design Disabled', disabled: true },
  { value: 'design', label: 'Design Systems' },
];

describe('FormCombobox', () => {
  it('filters at word starts without case or accent sensitivity and highlights the match', () => {
    render(<FormCombobox label="Team" options={options} />);
    const input = screen.getByRole('combobox', { name: 'Team' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'CAFE' } });
    expect(screen.getByRole('option', { name: 'Café Norte' }).querySelector('strong')?.textContent).toBe('Café');
    expect(screen.queryByRole('option', { name: 'Mar Sala Estudio' })).toBeNull();
  });

  it('moves through enabled options, selects with Enter, and exposes the active option', () => {
    const onChange = vi.fn();
    render(<FormCombobox label="Team" options={options} onChange={onChange} />);
    const input = screen.getByRole('combobox', { name: 'Team' });
    fireEvent.focus(input);
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy();
    fireEvent.change(input, { target: { value: 'Design' } });
    expect(screen.getByRole('option', { name: 'Design Disabled' }).getAttribute('aria-disabled')).toBe('true');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('design');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('restores the last selected label when the query is not selected and focus leaves', () => {
    render(<FormCombobox label="Team" options={options} defaultValue="studio" />);
    const input = screen.getByRole('combobox', { name: 'Team' }) as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'unmatched text' } });
    fireEvent.blur(input, { relatedTarget: document.body });
    expect(input.value).toBe('Mar Sala Estudio');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and preserves the selected option', () => {
    render(<FormCombobox label="Team" options={options} defaultValue="studio" />);
    const input = screen.getByRole('combobox', { name: 'Team' }) as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Café' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('Mar Sala Estudio');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('announces result counts and supports the loading empty state', () => {
    const { rerender } = render(<FormCombobox label="Team" options={options} />);
    const input = screen.getByRole('combobox', { name: 'Team' });
    fireEvent.focus(input);
    expect(screen.getByText('4 results')).toBeTruthy();
    rerender(<FormCombobox label="Team" options={[]} query="remote" loading />);
    fireEvent.focus(screen.getByRole('combobox', { name: 'Team' }));
    expect(screen.getByText('Loading…')).toBeTruthy();
    expect(screen.getByText('Loading results')).toBeTruthy();
  });

  it('keeps previously available options visible while refreshing remote results', () => {
    render(<FormCombobox label="Team" options={options} query="remote query" loading />);
    fireEvent.focus(screen.getByRole('combobox', { name: 'Team' }));
    expect(screen.getByRole('option', { name: 'Café Norte' })).toBeTruthy();
    expect(screen.getByText('Loading…')).toBeTruthy();
    expect(screen.getByText('Loading results; showing 4 previous results')).toBeTruthy();
  });

  it('submits only the selected option value under name', () => {
    render(<form data-testid="form"><FormCombobox label="Team" name="team" options={options} defaultValue="studio" /></form>);
    const form = screen.getByTestId('form') as HTMLFormElement;
    expect(new FormData(form).get('team')).toBe('studio');
  });
});
