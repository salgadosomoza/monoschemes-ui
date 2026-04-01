import '../../styles/icons.css';
import './ButtonIcon.css';

export type ButtonIconVariant = 'primary' | 'secondary';
export type ButtonIconState = 'enabled' | 'hover' | 'disabled';

export interface ButtonIconProps {
  variant?: ButtonIconVariant;
  state?: ButtonIconState;
  /** Material Symbols icon name (e.g. "deployed_code", "close", "search"). */
  iconName?: string;
  onClick?: () => void;
}

export function ButtonIcon({
  variant = 'primary',
  state = 'enabled',
  iconName = 'deployed_code',
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
      aria-label={iconName}
    >
      <span className="material-symbols-outlined">{iconName}</span>
    </button>
  );
}
