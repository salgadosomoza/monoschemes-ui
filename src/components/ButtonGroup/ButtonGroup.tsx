import type { ReactNode } from 'react';
import './ButtonGroup.css';

export type ButtonGroupType = 'text' | 'icon';
export type ButtonGroupPosition = 'first' | 'middle' | 'last';
export type ButtonGroupVariant = 'default' | 'active';

export interface ButtonGroupProps {
  /** Determines whether the button shows a text label or an icon. */
  type?: ButtonGroupType;
  /** Controls which borders are rounded (first/last) or collapsed (middle). */
  position?: ButtonGroupPosition;
  /** Visual state of the segment — default or active/selected. */
  variant?: ButtonGroupVariant;
  /** Text label shown when type="text". */
  label?: string;
  /** Icon content shown when type="icon". */
  icon?: ReactNode;
  /** Callback fired when the segment is clicked. */
  onClick?: () => void;
}

function DefaultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export function ButtonGroup({
  type = 'text',
  position = 'middle',
  variant = 'default',
  label = 'Button',
  icon,
  onClick,
}: ButtonGroupProps) {
  return (
    <button
      className="button-group"
      data-type={type}
      data-position={position}
      data-variant={variant}
      onClick={onClick}
      type="button"
    >
      {type === 'icon' ? (icon ?? <DefaultIcon />) : label}
    </button>
  );
}
