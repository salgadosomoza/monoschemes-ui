import '../../styles/icons.css';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  label?: string;
  /** Material Symbols icon name (e.g. "chevron_right", "arrow_forward"). */
  iconName?: string;
  iconPosition?: ButtonIconPosition;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  disabled = false,
  label = 'Button',
  iconName,
  iconPosition = 'right',
  onClick,
}: ButtonProps) {
  const iconEl = iconName ? (
    <span className="button-icon">
      <span className="material-symbols-outlined">{iconName}</span>
    </span>
  ) : null;

  return (
    <button
      className="button"
      data-variant={variant}
      data-has-icon={iconName ? '' : undefined}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {iconEl && iconPosition === 'left' && iconEl}
      <span className="button-label">{label}</span>
      {iconEl && iconPosition === 'right' && iconEl}
    </button>
  );
}
