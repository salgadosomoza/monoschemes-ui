import type { ReactNode } from 'react';
import './Avatar.css';
import { Icon } from '../Icon';

export type AvatarType = 'icon' | 'initials' | 'image';
export type AvatarVariant = 'round' | 'rounded' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** Determines the avatar content: icon placeholder, initials text, or an image. */
  type?: AvatarType;
  /** Controls the border-radius shape. */
  variant?: AvatarVariant;
  /** Avatar diameter: 32, 48, or 64 pixels. */
  size?: AvatarSize;
  /** Initials to display when type="initials". */
  initials?: string;
  /** Image URL when type="image". Falls back to an image placeholder when omitted. */
  src?: string;
  /** Alt text for the image (type="image"). */
  alt?: string;
}

const ICON_SIZE: Record<AvatarSize, number> = { sm: 20, md: 28, lg: 38 };

export function Avatar({
  type = 'icon',
  variant = 'round',
  size = 'lg',
  initials = 'WM',
  src,
  alt = '',
}: AvatarProps) {
  let content: ReactNode;

  if (type === 'initials') {
    content = <span className="avatar-initials">{initials}</span>;
  } else if (type === 'image') {
    content = src ? (
      <img src={src} alt={alt} className="avatar-image" />
    ) : (
      <Icon name="photo" size={ICON_SIZE[size]} />
    );
  } else {
    content = <Icon name="user-circle" size={ICON_SIZE[size]} />;
  }

  return (
    <div className="avatar" data-type={type} data-variant={variant} data-size={size}>
      {content}
    </div>
  );
}
