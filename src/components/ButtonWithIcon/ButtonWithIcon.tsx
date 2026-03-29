import type { ReactNode } from 'react';
import '../../styles/icons.css';
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
  /** Icon content rendered alongside the label. Falls back to chevron_left/chevron_right. */
  icon?: ReactNode;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
}

export function ButtonWithIcon({
  variant = 'primary',
  iconPosition = 'right',
  disabled = false,
  label = 'Button',
  icon,
  onClick,
}: ButtonWithIconProps) {
  const iconNode = icon ?? (
    <span className="material-symbols-outlined">
      {iconPosition === 'left' ? 'chevron_left' : 'chevron_right'}
    </span>
  );

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
