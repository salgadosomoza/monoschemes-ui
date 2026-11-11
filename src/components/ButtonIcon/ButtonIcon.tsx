import { Button } from '../Button/Button';
import type { IconName } from '../Icon';
import type { ButtonVariant } from '../Button/Button';

export type ButtonIconVariant = Exclude<ButtonVariant, 'link'>;
export type ButtonIconState = 'enabled' | 'hover' | 'disabled';

/** @deprecated Use `Button` with `iconOnly`. */
export interface ButtonIconProps {
  variant?: ButtonIconVariant;
  /** @deprecated Hover is now represented by the Button's actual hover state. */
  state?: ButtonIconState;
  /** Tabler icon name. Also used as the accessible label. */
  iconName?: IconName;
  onClick?: () => void;
}

/** @deprecated Use `Button` with `iconOnly`. */
export function ButtonIcon({
  variant = 'primary',
  state = 'enabled',
  iconName = 'box',
  onClick,
}: ButtonIconProps) {
  return (
    <Button
      variant={variant}
      disabled={state === 'disabled'}
      label={iconName}
      iconLeft={iconName}
      iconOnly
      className={state === 'hover' ? 'button--legacy-hover' : undefined}
      onClick={onClick}
    />
  );
}
