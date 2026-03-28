import './Image.css';

export type ImageType =
  | '1:1' | '16:9' | '9:16'
  | '5:4' | '4:5'
  | '4:3' | '3:4'
  | '3:2' | '2:3';

export interface ImageProps {
  /** Aspect ratio of the image frame. */
  type?: ImageType;
  /** Image URL. When omitted, renders a placeholder. */
  src?: string;
  /** Alt text for the image element. */
  alt?: string;
  /** Show the photo placeholder icon when no src is provided. */
  showIcon?: boolean;
  /** Width of the image frame. Height derives from the aspect ratio. */
  width?: string;
}

function PhotoIcon() {
  return (
    <svg
      className="image-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

export function Image({
  type = '16:9',
  src,
  alt = '',
  showIcon = true,
  width = '360px',
}: ImageProps) {
  if (src) {
    return (
      <div
        className="image"
        data-type={type}
        style={{ width }}
      >
        <img className="image-img" src={src} alt={alt} />
      </div>
    );
  }

  return (
    <div
      className="image image--placeholder"
      data-type={type}
      style={{ width }}
      role="img"
      aria-label={alt || 'Image placeholder'}
    >
      {showIcon && <PhotoIcon />}
    </div>
  );
}
