import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Icon } from '../../Icon';
import './Modal.css';
import { usePresence } from '../../../utils/usePresence';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Main dialog copy from the Figma body property. */
  body?: string;
  /** @deprecated Use body for plain text content. Kept for richer custom content. */
  children?: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  body,
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const presence = usePresence(isOpen, 120);
  useEffect(() => { dialogRef.current?.toggleAttribute('inert', !isOpen); }, [isOpen, presence.mounted]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!presence.mounted) return null;

  return (
    <div
      className="modal-overlay"
      data-state={presence.state}
      onTransitionEnd={presence.onTransitionEnd}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        ref={dialogRef}
        className="modal"
        data-state={presence.state}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && (
            <h2 id="modal-title" className="modal-title">{title}</h2>
          )}
          <button
            type="button"
            className="modal-close"
            aria-label="Close modal"
            onClick={onClose}
          >
            <Icon name="x" size={24} />
          </button>
        </div>
        <div className="modal-body">{body ?? children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
