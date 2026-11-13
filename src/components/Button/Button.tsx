import './Button.css';
import type { CSSProperties } from 'react';
import { Icon, type IconName } from '../Icon';
import { Spinner } from '../Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
/** @deprecated Use `iconLeft`, `iconRight`, and `iconOnly`. */
export type ButtonIconPosition = 'none' | 'left' | 'right' | 'only';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconOnly?: boolean;
  /** @deprecated Use `iconLeft` or `iconRight`. */
  iconName?: IconName;
  /** @deprecated Use `iconLeft`, `iconRight`, or `iconOnly`. */
  iconPosition?: ButtonIconPosition;
  onClick?: () => void;
  /** Marks the current page when the button represents the active pagination item. */
  'aria-current'?: 'page';
}

export type ButtonProps = ButtonBaseProps &
  ({ iconOnly: true; label: string } | { iconOnly?: false; label?: string });

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  label = 'Button',
  iconLeft,
  iconRight,
  iconOnly = false,
  iconName,
  iconPosition = 'none',
  className,
  style,
  onClick,
  'aria-current': ariaCurrent,
}: ButtonProps) {
  const resolvedIconOnly = iconOnly || iconPosition === 'only';
  const resolvedLeft = iconLeft ?? (iconPosition === 'left' ? iconName : undefined) ?? (iconPosition === 'only' ? iconName : undefined);
  const resolvedRight = iconRight ?? (iconPosition === 'right' ? iconName : undefined);
  const onlyIcon = resolvedLeft;
  const effectiveDisabled = disabled || loading;
  const icon = (name: IconName) => (
    <span className="button__icon" aria-hidden="true">
      <Icon name={name} size={size === 'sm' ? 16 : 24} />
    </span>
  );

  return (
    <button
      className={className ? `button ${className}` : 'button'}
      style={style}
      data-variant={variant}
      data-size={size}
      data-icon-only={resolvedIconOnly ? '' : undefined}
      data-loading={loading ? '' : undefined}
      disabled={effectiveDisabled}
      onClick={onClick}
      type="button"
      aria-label={resolvedIconOnly ? label : undefined}
      aria-current={ariaCurrent}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner aria-hidden="true" className="button__spinner" type="grid" size="small" showLabel={false} />}
      <span className="button__content">
        {!resolvedIconOnly && resolvedLeft && icon(resolvedLeft)}
        <span className="button-label">{label}</span>
        {!resolvedIconOnly && resolvedRight && icon(resolvedRight)}
        {resolvedIconOnly && onlyIcon && icon(onlyIcon)}
      </span>
    </button>
  );
}
