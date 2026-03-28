import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  /** Visual style of the button. */
  variant?: ButtonVariant;
  /** Renders the button in a disabled state. */
  disabled?: boolean;
  /** Text label displayed inside the button. */
  label?: string;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  disabled = false,
  label = 'Button',
  onClick,
}: ButtonProps) {
  return (
    <button
      className="button"
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
