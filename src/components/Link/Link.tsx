import type { ReactNode } from 'react';
import { Text } from '../Text/Text';
import type { TextStyle } from '../Text/Text';
import './Link.css';

export type LinkType = 'default' | 'icon';
export type LinkSize = 'small' | 'medium' | 'large';

export interface LinkProps {
  /** Shows an icon after the label when type="icon". */
  type?: LinkType;
  /** Controls font size. */
  size?: LinkSize;
  /** Text label displayed inside the link. */
  label?: string;
  /** URL the link points to. */
  href?: string;
  /** Icon rendered after the label when type="icon". */
  icon?: ReactNode;
  /** Callback fired when the link is clicked. */
  onClick?: () => void;
  /** Whether the link opens in a new tab. */
  target?: '_blank' | '_self';
}

const SIZE_TO_TEXT_STYLE: Record<LinkSize, TextStyle> = {
  small:  'caption',
  medium: 'body-2',
  large:  'body-1',
};

function DefaultIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="link-icon"
    >
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

export function Link({
  type = 'default',
  size = 'medium',
  label = 'Link',
  href,
  icon,
  onClick,
  target = '_self',
}: LinkProps) {
  return (
    <a
      className="link"
      data-type={type}
      data-size={size}
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      <Text style={SIZE_TO_TEXT_STYLE[size]} as="span">
        {label}
      </Text>
      {type === 'icon' && (icon ?? <DefaultIcon />)}
    </a>
  );
}
