import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function enableFocusVisible() {
  const originalMatches = HTMLElement.prototype.matches;
  vi.spyOn(HTMLElement.prototype, 'matches').mockImplementation(function matches(this: HTMLElement, selector) {
    if (selector === ':focus-visible') return true;
    return originalMatches.call(this, selector);
  });
}

function createRect(x: number, y: number, width: number, height: number): DOMRect {
  return { x, y, width, height, top: y, right: x + width, bottom: y + height, left: x, toJSON: () => ({}) } as DOMRect;
}

describe('Tooltip', () => {
  it('opens immediately on focus-visible and connects aria-describedby', async () => {
    enableFocusVisible();
    render(<Tooltip content="Copy link"><Button label="Copy link" /></Tooltip>);
    const trigger = screen.getByRole('button', { name: 'Copy link' });

    fireEvent.focus(trigger);

    const tooltip = await screen.findByRole('tooltip');
    const describedBy = trigger.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toBe(tooltip);
  });

  it('closes on Escape', async () => {
    enableFocusVisible();
    render(<Tooltip content="Copy link"><Button label="Copy link" /></Tooltip>);
    const trigger = screen.getByRole('button', { name: 'Copy link' });
    fireEvent.focus(trigger);
    await screen.findByRole('tooltip');

    fireEvent.keyDown(trigger, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull(), { timeout: 500 });
  });

  it('flips to the opposite side when the preferred placement does not fit', async () => {
    enableFocusVisible();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function getBoundingClientRect(this: HTMLElement) {
      if (this.matches('button')) return createRect(100, 0, 80, 40);
      if (this.classList.contains('tooltip')) return createRect(0, 0, 120, 36);
      return createRect(0, 0, 0, 0);
    });
    render(<Tooltip content="Copy link" placement="top"><Button label="Copy link" /></Tooltip>);

    fireEvent.focus(screen.getByRole('button', { name: 'Copy link' }));

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip.getAttribute('data-placement')).toBe('bottom');
  });

  it('uses the content as the accessible name of an unlabeled icon-only Button', async () => {
    enableFocusVisible();
    render(
      <Tooltip content="Copy link">
        <Button variant="tertiary" size="sm" iconOnly iconLeft="copy" label="" />
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Copy link' });
    fireEvent.focus(trigger);
    await screen.findByRole('tooltip');
    expect(trigger.getAttribute('aria-label')).toBe('Copy link');
  });

  it('preserves the inverse theme in its portal', async () => {
    enableFocusVisible();
    render(<div data-theme="inverse"><Tooltip content="Copy link"><Button label="Copy link" /></Tooltip></div>);
    fireEvent.focus(screen.getByRole('button', { name: 'Copy link' }));
    await screen.findByRole('tooltip');

    expect(document.querySelector('.tooltip-portal')?.getAttribute('data-theme')).toBe('inverse');
  });
});
