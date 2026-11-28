import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CookieBanner, CookiePreferences } from './CookieConsent';

afterEach(cleanup);

const categories = [
  { id: 'required', name: 'Necessary', description: 'Remember preferences.', required: true },
  { id: 'analytics', name: 'Analytics', description: 'Understand visits.' },
];

describe('cookie consent', () => {
  it('renders a named region with equal-weight choices and a separate preferences action', () => {
    const actions = { onAcceptAll: vi.fn(), onRejectAll: vi.fn(), onOpenPreferences: vi.fn() };
    render(<CookieBanner message="Choose which cookies to allow." {...actions} />);

    expect(screen.getByRole('region', { name: 'We use cookies' })).toBeTruthy();
    const accept = screen.getByRole('button', { name: 'Accept all' });
    const reject = screen.getByRole('button', { name: 'Reject all' });
    expect(accept.getAttribute('data-variant')).toBe(reject.getAttribute('data-variant'));
    fireEvent.click(accept);
    fireEvent.click(reject);
    fireEvent.click(screen.getByRole('button', { name: 'Customize' }));
    expect(actions.onAcceptAll).toHaveBeenCalledOnce();
    expect(actions.onRejectAll).toHaveBeenCalledOnce();
    expect(actions.onOpenPreferences).toHaveBeenCalledOnce();
  });

  it('keeps required categories active and saves only allowed category IDs', () => {
    const onSave = vi.fn();
    render(
      <CookiePreferences
        layout="inline"
        description="Choose a category."
        categories={categories}
        onSave={onSave}
        onAcceptAll={vi.fn()}
        onRejectAll={vi.fn()}
      />,
    );
    const analytics = screen.getByRole('checkbox', { name: 'Analytics', description: 'Understand visits.' }) as HTMLInputElement;

    expect(screen.getByText('Always on')).toBeTruthy();
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(analytics.checked).toBe(false);
    fireEvent.click(analytics);
    fireEvent.click(screen.getByRole('button', { name: 'Save preferences' }));
    expect(onSave).toHaveBeenCalledWith(['required', 'analytics']);
    fireEvent.click(screen.getByRole('button', { name: 'Reject all' }));
    expect(analytics.checked).toBe(false);
  });
});
