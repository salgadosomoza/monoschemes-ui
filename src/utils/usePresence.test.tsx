import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePresence } from './usePresence';

function Presence({ open }: { open: boolean }) {
  const presence = usePresence(open, 120);
  return presence.mounted ? <div data-testid="presence" data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} /> : null;
}

describe('usePresence', () => {
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it('mounts immediately when opening', () => {
    const { rerender } = render(<Presence open={false} />);
    expect(screen.queryByTestId('presence')).toBeNull();
    rerender(<Presence open />);
    expect(screen.getByTestId('presence').getAttribute('data-state')).toBe('open');
  });

  it('keeps a closing node mounted until transitionend or the fallback timer', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Presence open />);
    rerender(<Presence open={false} />);
    expect(screen.getByTestId('presence').getAttribute('data-state')).toBe('closed');
    act(() => { vi.advanceTimersByTime(169); });
    expect(screen.getByTestId('presence')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.queryByTestId('presence')).toBeNull();
  });

  it('unmounts on transitionend from the presence node', () => {
    const { rerender } = render(<Presence open />);
    rerender(<Presence open={false} />);
    const node = screen.getByTestId('presence');
    act(() => { node.dispatchEvent(new Event('transitionend', { bubbles: true })); });
    expect(screen.queryByTestId('presence')).toBeNull();
  });

  it('unmounts immediately when reduced motion is enabled', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    const { rerender } = render(<Presence open />);
    rerender(<Presence open={false} />);
    expect(screen.queryByTestId('presence')).toBeNull();
  });
});
