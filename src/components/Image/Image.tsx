import './Image.css';
import { Icon } from '../Icon';

export type ImageRatio =
  | '1:1' | '16:9' | '9:16'
  | '5:4' | '4:5'
  | '4:3' | '3:4'
  | '3:2' | '2:3';

/** @deprecated Use ImageRatio instead. */
export type ImageType = ImageRatio;

export interface ImageProps {
  /** Aspect ratio of the image frame. */
  ratio?: ImageRatio;
  /** @deprecated Use ratio instead. */
  type?: ImageRatio;
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
  return <Icon className="image-icon" name="photo" size={24} />;
}

// Library builds preserve NODE_ENV for the consuming app's bundler.
declare const process: { env: { NODE_ENV?: string } } | undefined;

let warnedAboutTypeAlias = false;

export function Image({
  ratio,
  type,
  src,
  alt = '',
  showIcon = true,
  width = '360px',
}: ImageProps) {
  if (type !== undefined && !warnedAboutTypeAlias && (
    import.meta.env?.DEV ||
    (typeof process !== 'undefined' && process.env.NODE_ENV === 'development')
  )) {
    warnedAboutTypeAlias = true;
    // eslint-disable-next-line no-console
    console.warn('Image prop "type" is deprecated; use "ratio" instead.');
  }

  const aspectRatio = ratio ?? type ?? '16:9';

  if (src) {
    return (
      <div
        className="image"
        data-ratio={aspectRatio}
        style={{ width }}
      >
        <img className="image-img" src={src} alt={alt} />
      </div>
    );
  }

  return (
    <div
      className="image image--placeholder"
      data-ratio={aspectRatio}
      style={{ width }}
      role="img"
      aria-label={alt || 'Image placeholder'}
    >
      {showIcon && <PhotoIcon />}
    </div>
  );
}
