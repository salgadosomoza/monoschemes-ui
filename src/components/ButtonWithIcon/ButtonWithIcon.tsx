import type { ReactNode } from 'react';
import './ButtonWithIcon.css';

export type ButtonWithIconVariant = 'primary' | 'secondary';
export type ButtonWithIconPosition = 'left' | 'right';

export interface ButtonWithIconProps {
  /** Visual style of the button. */
  variant?: ButtonWithIconVariant;
  /** Side of the label where the icon is placed. */
  iconPosition?: ButtonWithIconPosition;
  /** Renders the button in a disabled state. */
  disabled?: boolean;
  /** Text label displayed inside the button. */
  label?: string;
  /** Icon content rendered alongside the label. */
  icon?: ReactNode;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
}

function DefaultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

export function ButtonWithIcon({
  variant = 'primary',
  iconPosition = 'right',
  disabled = false,
  label = 'Button',
  icon,
  onClick,
}: ButtonWithIconProps) {
  const iconNode = icon ?? <DefaultIcon />;

  return (
    <button
      className="button-with-icon"
      data-variant={variant}
      data-icon-position={iconPosition}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {iconPosition === 'left' && <span className="button-with-icon-icon">{iconNode}</span>}
      <span className="button-with-icon-label">{label}</span>
      {iconPosition === 'right' && <span className="button-with-icon-icon">{iconNode}</span>}
    </button>
  );
}
