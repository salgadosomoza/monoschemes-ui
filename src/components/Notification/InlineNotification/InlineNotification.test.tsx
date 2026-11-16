import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { InlineNotification } from './InlineNotification';

afterEach(cleanup);

describe('InlineNotification', () => {
  it('renders the default message as a status region', () => {
    render(<InlineNotification message="Changes saved." />);

    const notification = screen.getByRole('status');
    expect(notification.getAttribute('data-type')).toBe('default');
    expect(notification.textContent).toContain('Changes saved.');
  });

  it('renders error messages as alerts', () => {
    render(<InlineNotification message="Could not save changes." type="error" />);

    const notification = screen.getByRole('alert');
    expect(notification.getAttribute('data-type')).toBe('error');
    expect(notification.textContent).toContain('Could not save changes.');
  });
});
