import type { ReactNode } from 'react';
import './ButtonIcon.css';

export type ButtonIconVariant = 'primary' | 'secondary';
export type ButtonIconState = 'enabled' | 'hover' | 'disabled';

export interface ButtonIconProps {
  /** Visual style of the button. */
  variant?: ButtonIconVariant;
  /** Interactive state of the button. */
  state?: ButtonIconState;
  /** Icon content rendered inside the button. */
  icon?: ReactNode;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
}

function DefaultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

export function ButtonIcon({
  variant = 'primary',
  state = 'enabled',
  icon,
  onClick,
}: ButtonIconProps) {
  return (
    <button
      className="button-icon"
      data-variant={variant}
      data-state={state}
      disabled={state === 'disabled'}
      onClick={onClick}
      type="button"
      aria-label="icon button"
    >
      {icon ?? <DefaultIcon />}
    </button>
  );
}
