import './ButtonText.css';

export type ButtonTextState = 'default' | 'disabled';

export interface ButtonTextProps {
  /** Visual/interactive state of the button. */
  state?: ButtonTextState;
  /** Text label displayed inside the button. */
  label?: string;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
}

export function ButtonText({
  state = 'default',
  label = 'Button',
  onClick,
}: ButtonTextProps) {
  return (
    <button
      className="button-text"
      data-state={state}
      disabled={state === 'disabled'}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
