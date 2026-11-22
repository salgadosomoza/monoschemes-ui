import { useEffect, useId, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import type { GalleryImage } from './types';
import './Gallery.css';

export interface GalleryViewerProps {
  images: GalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Hide the image strip below the caption. */
  showThumbnails?: boolean;
}

const focusableSelector = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function GalleryViewer({ images, index, onIndexChange, onClose, showThumbnails = true }: GalleryViewerProps) {
  const captionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const current = images[index];

  const goTo = (nextIndex: number) => {
    if (!images.length) return;
    onIndexChange((nextIndex + images.length) % images.length);
  };

  useEffect(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeButton = dialogRef.current?.querySelector<HTMLElement>('.gallery-viewer__close');
    closeButton?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;
    for (const next of [index - 1, index + 1]) {
      const image = images[(next + images.length) % images.length];
      if (image) {
        const preloader = new window.Image();
        preloader.src = image.src;
      }
    }
  }, [images, index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(index - 1); return; }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(index + 1); return; }
    if (event.key === 'Home') { event.preventDefault(); goTo(0); return; }
    if (event.key === 'End') { event.preventDefault(); goTo(images.length - 1); return; }
    if (event.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
    if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  };

  if (!current || typeof document === 'undefined') return null;

  return createPortal(
    <div className="gallery-viewer-portal" data-theme="dark">
      <div className="gallery-viewer" role="dialog" aria-modal="true" aria-label="Photo gallery" aria-describedby={current.caption ? captionId : undefined} tabIndex={-1} ref={dialogRef} onKeyDown={onKeyDown}>
        <header className="gallery-viewer__topbar">
              <p className="gallery-viewer__counter" aria-live="polite">{index + 1} / {images.length}</p>
          <Button className="gallery-viewer__close" variant="tertiary" size="md" iconOnly iconLeft="x" label="Close gallery" onClick={onClose} />
        </header>

        <div className="gallery-viewer__stage">
          <Button variant="secondary" size="md" iconOnly iconLeft="chevron-left" label="Previous photo" onClick={() => goTo(index - 1)} />
          <div
            className="gallery-viewer__image-frame"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              if (startX !== null && startX !== undefined && endX !== undefined && Math.abs(endX - startX) > 40) goTo(index + (endX < startX ? 1 : -1));
              touchStartX.current = null;
            }}
          >
            <img key={`${index}-${current.src}`} className="gallery-viewer__image" src={current.src} alt={current.alt} />
          </div>
          <Button variant="secondary" size="md" iconOnly iconLeft="chevron-right" label="Next photo" onClick={() => goTo(index + 1)} />
        </div>

        <footer className="gallery-viewer__footer">
          {current.caption && <p className="gallery-viewer__caption" id={captionId}>{current.caption}</p>}
          {showThumbnails && (
            <div className="gallery-viewer__thumbnails" role="group" aria-label="Choose a photo">
              {images.map((image, thumbnailIndex) => (
                <button
                  key={`${image.src}-${thumbnailIndex}`}
                  type="button"
                  className="gallery-viewer__thumbnail"
                  aria-label={`Show photo ${thumbnailIndex + 1}: ${image.alt}`}
                  aria-current={thumbnailIndex === index ? 'true' : undefined}
                  data-current={thumbnailIndex === index || undefined}
                  onClick={() => goTo(thumbnailIndex)}
                >
                  <img src={image.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>,
    document.body,
  );
}
