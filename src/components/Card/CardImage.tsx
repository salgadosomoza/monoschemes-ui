import type { ReactNode } from 'react';
import { Image, type ImageType } from '../Image';
import './CardImage.css';
import './CardImage.css';

export interface CardImageProps {
  /** URL of the card image. */
  src: string;
  /** Alternative text for the image. Use an empty string when decorative. */
  alt: string;
  /** Aspect ratio of the image. Defaults to 4:3. */
  ratio?: ImageType;
  /** Card content rendered below the image with the standard card padding. */
  children: ReactNode;
}

/** A full-width image card with a padded content slot. */
export function CardImage({ src, alt, ratio = '4:3', children }: CardImageProps) {
  return (
    <article className="card-image">
      <div className="card-image__media">
        <Image type={ratio} src={src} alt={alt} width="100%" showIcon={false} />
      </div>
      <div className="card-image__content">{children}</div>
    </article>
  );
}
