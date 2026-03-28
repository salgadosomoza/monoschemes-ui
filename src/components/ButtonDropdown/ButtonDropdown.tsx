import './ButtonDropdown.css';

export type ButtonDropdownVariant = 'primary' | 'secondary';
export type ButtonDropdownState = 'default' | 'active';

export interface ButtonDropdownProps {
  /** Visual style of the button. */
  variant?: ButtonDropdownVariant;
  /** Controls the chevron direction and active appearance. */
  state?: ButtonDropdownState;
  /** Renders the button in a disabled state. */
  disabled?: boolean;
  /** Text label displayed inside the button. */
  label?: string;
  /** Callback fired when the button is clicked. */
  onToggle?: () => void;
}

function ExpandMore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );
}

function ExpandLess() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 8 6 14l1.41 1.41L12 10.83l4.59 4.58L18 14 12 8z" />
    </svg>
  );
}

export function ButtonDropdown({
  variant = 'primary',
  state = 'default',
  disabled = false,
  label = 'Button',
  onToggle,
}: ButtonDropdownProps) {
  return (
    <button
      className="button-dropdown"
      data-variant={variant}
      data-state={state}
      disabled={disabled}
      onClick={onToggle}
      type="button"
    >
      <span className="button-dropdown-label">{label}</span>
      {state === 'active' ? <ExpandLess /> : <ExpandMore />}
    </button>
  );
}
