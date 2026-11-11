import type { ReactNode } from 'react';
import './Kbd.css';

export interface KbdProps {
  /** The key or shortcut text to display. */
  children: ReactNode;
  /** Compact caption or larger body-2 presentation. Defaults to sm. */
  size?: 'sm' | 'md';
}

export function Kbd({ children, size = 'sm' }: KbdProps) {
  return <kbd className="kbd" data-size={size}>{children}</kbd>;
}
