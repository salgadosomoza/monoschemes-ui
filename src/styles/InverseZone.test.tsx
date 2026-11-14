import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from '../components/Button';

describe('inverse theme zone', () => {
  afterEach(cleanup);

  it('keeps the inverse theme marker around its content', () => {
    const { getByRole } = render(
      <div data-theme="inverse">
        <Button label="Action" />
      </div>,
    );

    const button = getByRole('button', { name: 'Action' });
    expect(button.closest('[data-theme="inverse"]')?.getAttribute('data-theme')).toBe('inverse');
    expect(screen.getByRole('button', { name: 'Action' })).toBe(button);
  });
});
