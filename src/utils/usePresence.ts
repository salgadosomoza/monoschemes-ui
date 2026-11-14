import { useCallback, useEffect, useRef, useState } from 'react';

export type PresenceState = 'open' | 'closed';

export function readCssDuration(variableName: string, fallback = 120, element?: Element | null): number {
  if (typeof window === 'undefined' || !window.getComputedStyle) return fallback;
  const value = window.getComputedStyle(element ?? document.documentElement).getPropertyValue(variableName).trim();
  const match = /^([\d.]+)(ms|s)$/.exec(value);
  if (!match) return fallback;
  return Number(match[1]) * (match[2] === 's' ? 1000 : 1);
}

export function usePresence(open: boolean, exitMs = 120) {
  const [mounted, setMounted] = useState(open);
  const [state, setState] = useState<PresenceState>(open ? 'open' : 'closed');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishExit = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
    setMounted(false);
  }, []);

  const onTransitionEnd = useCallback((event: { target: EventTarget | null; currentTarget: EventTarget | null }) => {
    if (event.target === event.currentTarget) finishExit();
  }, [finishExit]);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
    if (open) {
      setMounted(true);
      setState('open');
      return;
    }
    setState('closed');
    if (!mounted) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setMounted(false);
      return;
    }
    timeout.current = setTimeout(finishExit, Math.max(0, exitMs) + 50);
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [open, mounted, exitMs, finishExit]);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  return { mounted: open || mounted, state: open ? 'open' : state, onTransitionEnd };
}
