import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Stepper } from './Stepper';
afterEach(cleanup);
describe('Stepper', () => {
  it('derives states, marks the current step and links completed steps', () => {
    render(<Stepper current={1} steps={[{ label: 'Account', href: '/account' }, { label: 'Details' }, { label: 'Review' }]} />);
    expect(screen.getByRole('link', { name: /Account/ }).getAttribute('href')).toBe('/account');
    expect(screen.getByText('Details').closest('li')?.getAttribute('aria-current')).toBe('step');
    expect(screen.getByText('Review').closest('li')?.getAttribute('data-state')).toBe('upcoming');
  });
});
