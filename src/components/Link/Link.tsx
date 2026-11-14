import type { ReactNode } from 'react';
import { Text } from '../Text/Text';
import type { TextStyle } from '../Text/Text';
import { Icon } from '../Icon';
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
      {type === 'icon' && (icon ?? <Icon name="download" size={16} />)}
    </a>
  );
}
