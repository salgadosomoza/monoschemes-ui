import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { usePresence, readCssDuration } from '../../utils/usePresence';
import './Drawer.css';

export type DrawerSide = 'right' | 'left' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  closeLabel?: string;
}

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({ open: controlledOpen, defaultOpen = false, onOpenChange, side = 'right', size = 'md', title, description, children, actions, closeLabel = 'Close' }: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const open = controlledOpen ?? internalOpen;
  const presence = usePresence(open, readCssDuration('--duration-fast', 120));

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    const host = document.createElement('div');
    host.className = 'drawer-portal';
    document.body.append(host);
    setPortalHost(host);
    return () => host.remove();
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const currentPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !presence.mounted || !portalHost) return;
    const themeSource = returnFocusRef.current?.closest<HTMLElement>('[data-theme]');
    if (themeSource && themeSource !== document.documentElement && themeSource.dataset.theme) portalHost.dataset.theme = themeSource.dataset.theme;
    else delete portalHost.dataset.theme;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(focusableSelector);
    (firstFocusable ?? panelRef.current)?.focus();
  }, [open, presence.mounted, portalHost]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(element => getComputedStyle(element).display !== 'none');
    if (!focusable.length) { event.preventDefault(); panel.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
  };

  if (!presence.mounted || !portalHost) return null;
  return createPortal(
    <div className="drawer-overlay" data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <section ref={panelRef} className="drawer" data-state={presence.state} data-side={side} data-size={size} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1} onKeyDown={handleKeyDown}>
        <header className="drawer__header">
          <div className="drawer__heading">
            <h2 id={titleId} className="drawer__title">{title}</h2>
            {description && <p id={descriptionId} className="drawer__description">{description}</p>}
          </div>
          <Button variant="tertiary" size="sm" iconOnly iconLeft="x" label={closeLabel} onClick={close} />
        </header>
        <Divider />
        <div className="drawer__body">{children}</div>
        {actions && <><Divider /><footer className="drawer__footer">{actions}</footer></>}
      </section>
    </div>,
    portalHost,
  );
}
