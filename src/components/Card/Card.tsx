import type { MouseEventHandler, ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  /** Content rendered inside the card. Interactive cards should not contain other controls. */
  children: ReactNode;
  /** Highlights the card as selected. */
  selected?: boolean;
  /** Makes the whole card a button and handles activation. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible label when the card content does not provide one. */
  'aria-label'?: string;
}

export function Card({ children, selected = false, onClick, 'aria-label': ariaLabel }: CardProps) {
  const className = ['card', onClick && 'card--interactive'].filter(Boolean).join(' ');

  if (onClick) {
    return (
      <button
        className={className}
        type="button"
        aria-label={ariaLabel}
        aria-pressed={selected}
        data-selected={selected || undefined}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return <div className={className} data-selected={selected || undefined}>{children}</div>;
}
