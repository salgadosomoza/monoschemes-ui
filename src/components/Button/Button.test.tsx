import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { ButtonText } from '../ButtonText/ButtonText';

afterEach(cleanup);

describe('Button', () => {
  it('uses primary and md as its defaults', () => {
    render(<Button label="Save" />);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('data-variant')).toBe('primary');
    expect(button.getAttribute('data-size')).toBe('md');
  });

  it('renders every variant and size through its public API', () => {
    const { rerender } = render(<Button variant="secondary" size="sm" label="Action" />);
    let button = screen.getByRole('button', { name: 'Action' });
    expect(button.getAttribute('data-variant')).toBe('secondary');
    expect(button.getAttribute('data-size')).toBe('sm');

    rerender(<Button variant="tertiary" size="lg" label="Action" />);
    button = screen.getByRole('button', { name: 'Action' });
    expect(button.getAttribute('data-variant')).toBe('tertiary');
    expect(button.getAttribute('data-size')).toBe('lg');
    rerender(<Button variant="danger" label="Action" />);
    expect(screen.getByRole('button', { name: 'Action' }).getAttribute('data-variant')).toBe('danger');
    rerender(<Button variant="link" label="Action" />);
    expect(screen.getByRole('button', { name: 'Action' }).getAttribute('data-variant')).toBe('link');
  });

  it('provides an accessible name for icon-only buttons', () => {
    render(<Button iconOnly iconLeft="search" label="Search" />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeTruthy();
  });

  it('keeps its accessible name and marks itself busy while loading', () => {
    render(<Button label="Saving" loading />);
    const button = screen.getByRole('button', { name: 'Saving' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('preserves disabled behavior', () => {
    render(<Button label="Unavailable" disabled />);
    expect((screen.getByRole('button', { name: 'Unavailable' }) as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('deprecated Button wrappers', () => {
  it('maps ButtonIcon to an accessible icon-only Button', () => {
    render(<ButtonIcon iconName="search" />);
    expect(screen.getByRole('button', { name: 'search' }).getAttribute('data-icon-only')).toBe('');
  });

  it('maps ButtonText to the link variant', () => {
    render(<ButtonText label="More" />);
    expect(screen.getByRole('button', { name: 'More' }).getAttribute('data-variant')).toBe('link');
  });
});
