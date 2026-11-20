import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Toast, type ToastType } from './Toast';

afterEach(cleanup);

describe('Toast', () => {
  const cases: Array<{ type: ToastType; role: 'status' | 'alert'; live: 'polite' | 'assertive'; icon: string | null }> = [
    { type: 'default', role: 'status', live: 'polite', icon: null },
    { type: 'success', role: 'status', live: 'polite', icon: 'circle-check' },
    { type: 'warning', role: 'status', live: 'polite', icon: 'alert-triangle' },
    { type: 'error', role: 'alert', live: 'assertive', icon: 'alert-circle' },
  ];

  it.each(cases)('$type uses the designed icon, type and live-region role', ({ type, role, live, icon }) => {
    const { container } = render(<Toast message={`Toast ${type}`} type={type} isVisible duration={0} />);
    const toast = screen.getByRole(role);

    expect(toast.getAttribute('data-type')).toBe(type);
    expect(toast.getAttribute('aria-live')).toBe(live);
    expect(toast.textContent).toContain(`Toast ${type}`);

    const renderedIcon = container.querySelector('svg.toast-icon');
    if (icon) {
      expect(renderedIcon).not.toBeNull();
      expect(renderedIcon?.classList.contains(`tabler-icon-${icon}`)).toBe(true);
    } else {
      expect(renderedIcon).toBeNull();
    }
  });
});
