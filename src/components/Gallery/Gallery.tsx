import { useRef, useState } from 'react';
import { Button } from '../Button';
import { Tag } from '../Tag';
import { GalleryViewer } from './GalleryViewer';
import type { GalleryImage } from './types';
import './Gallery.css';

export type GalleryLayout = 'featured' | 'grid';

export interface GalleryProps {
  /** Images in display order. Each image needs meaningful alternative text. */
  images: GalleryImage[];
  /** Desktop layout; screens below 768 px use the mobile presentation automatically. */
  layout?: GalleryLayout;
  /** Show the action that opens the full gallery. */
  showAll?: boolean;
}

function openLabel(image: GalleryImage, index: number, total: number) {
  return `Open photo ${index + 1} of ${total}: ${image.alt}`;
}

export function Gallery({ images, layout = 'featured', showAll = true }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const visibleImages = images.slice(0, 3);
  const currentMobileImage = images[mobileIndex % Math.max(images.length, 1)];

  const openViewer = (index: number) => {
    if (!images.length) return;
    setOpenIndex(index);
  };

  const shiftMobile = (direction: -1 | 1) => {
    if (images.length < 2) return;
    setMobileIndex((current) => (current + direction + images.length) % images.length);
  };

  const touchStartX = useRef<number | null>(null);

  return (
    <>
      <div className="gallery" data-layout={layout} data-count={visibleImages.length} data-empty={images.length === 0 || undefined}>
        <div className="gallery__desktop">
          {visibleImages.map((image, index) => (
            <button
              className="gallery__photo"
              type="button"
              key={`${image.src}-${index}`}
              aria-label={openLabel(image, index, images.length)}
              onClick={() => openViewer(index)}
              data-position={index === 0 ? 'featured' : 'secondary'}
            >
              <img src={image.src} alt={image.alt} />
            </button>
          ))}
          {showAll && images.length > 0 && (
            <Button className="gallery__show-all" variant="secondary" size="sm" label={`View all ${images.length} photos`} onClick={() => openViewer(0)} />
          )}
        </div>

        {currentMobileImage && (
          <div
            className="gallery__mobile"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              if (startX !== null && startX !== undefined && endX !== undefined && Math.abs(endX - startX) > 40) shiftMobile(endX < startX ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            <button
              className="gallery__photo gallery__photo--mobile"
              type="button"
              aria-label={openLabel(currentMobileImage, mobileIndex, images.length)}
              onClick={() => openViewer(mobileIndex)}
            >
              <img src={currentMobileImage.src} alt={currentMobileImage.alt} />
            </button>
            <span className="gallery__count"><Tag type="inverse" size="sm" label={`${mobileIndex + 1} / ${images.length}`} /></span>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <GalleryViewer
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
