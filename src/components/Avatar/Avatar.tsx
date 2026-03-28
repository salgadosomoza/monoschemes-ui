import type { ReactNode } from 'react';
import './Avatar.css';

export type AvatarType = 'icon' | 'initials' | 'image';
export type AvatarVariant = 'round' | 'rounded' | 'square';

export interface AvatarProps {
  /** Determines the avatar content: icon placeholder, initials text, or an image. */
  type?: AvatarType;
  /** Controls the border-radius shape. Maps from Figma "style" prop. */
  variant?: AvatarVariant;
  /** Initials to display when type="initials". */
  initials?: string;
  /** Image URL when type="image". Falls back to an image placeholder when omitted. */
  src?: string;
  /** Alt text for the image (type="image"). */
  alt?: string;
}

function IconPlaceholder() {
  return (
    <svg
      width="38.4"
      height="38.4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function ImagePlaceholder() {
  return (
    <svg
      width="38.4"
      height="38.4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

export function Avatar({
  type = 'icon',
  variant = 'round',
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
      <ImagePlaceholder />
    );
  } else {
    content = <IconPlaceholder />;
  }

  return (
    <div className="avatar" data-type={type} data-variant={variant}>
      {content}
    </div>
  );
}
