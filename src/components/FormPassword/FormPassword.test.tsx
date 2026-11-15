import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FormPassword } from './FormPassword';

afterEach(cleanup);

describe('FormPassword', () => {
  it('toggles visibility and its accessible label while preserving the value', () => {
    render(<FormPassword label="Password" value="s3cret" />);
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
    const toggle = screen.getByRole('button', { name: 'Show password' });
    input.focus();
    fireEvent.mouseDown(toggle);
    expect(document.activeElement).toBe(input);
    fireEvent.click(toggle);
    expect(input.type).toBe('text');
    expect(input.value).toBe('s3cret');
    expect(screen.getByRole('button', { name: 'Hide password' }).getAttribute('aria-pressed')).toBe('true');
  });
});
