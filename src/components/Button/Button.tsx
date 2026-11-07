import '../../styles/icons.css';
import './Button.css';
import type { CSSProperties } from 'react';

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
  iconLeft?: string;
  iconRight?: string;
  iconOnly?: boolean;
  /** @deprecated Use `iconLeft` or `iconRight`. */
  iconName?: string;
  /** @deprecated Use `iconLeft`, `iconRight`, or `iconOnly`. */
  iconPosition?: ButtonIconPosition;
  onClick?: () => void;
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
}: ButtonProps) {
  const resolvedIconOnly = iconOnly || iconPosition === 'only';
  const resolvedLeft = iconLeft ?? (iconPosition === 'left' ? iconName : undefined) ?? (iconPosition === 'only' ? iconName : undefined);
  const resolvedRight = iconRight ?? (iconPosition === 'right' ? iconName : undefined);
  const onlyIcon = resolvedLeft;
  const effectiveDisabled = disabled || loading;
  const icon = (name: string) => (
    <span className="button__icon" aria-hidden="true">
      <span className="material-symbols-outlined">{name}</span>
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
      aria-busy={loading || undefined}
    >
      {loading && <span className="button__spinner" aria-hidden="true" />}
      <span className="button__content">
        {!resolvedIconOnly && resolvedLeft && icon(resolvedLeft)}
        <span className="button-label">{label}</span>
        {!resolvedIconOnly && resolvedRight && icon(resolvedRight)}
        {resolvedIconOnly && onlyIcon && icon(onlyIcon)}
      </span>
    </button>
  );
}
