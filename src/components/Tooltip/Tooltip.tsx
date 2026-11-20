import { useCallback, useId, useLayoutEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Kbd } from '../Kbd';
import { readCssDuration, usePresence } from '../../utils/usePresence';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Brief, supplementary text. Do not place essential information or controls in a tooltip. */
  content: string;
  /** Optional keyboard shortcut rendered after the content. */
  shortcut?: string;
  /** Preferred side of the trigger. Flips to the opposite side when it will not fit. Defaults to top. */
  placement?: TooltipPlacement;
  /** A single focusable element, such as a Button or link. */
  children: ReactElement;
}

interface TooltipPosition {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

const oppositePlacement: Record<TooltipPlacement, TooltipPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

let recentlyClosedAt = 0;

function getFocusableElement(root: HTMLElement | null) {
  return root?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? null;
}

function focusIsVisible(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  try {
    return target.matches(':focus-visible');
  } catch {
    return false;
  }
}

export function Tooltip({ content, shortcut, placement = 'top', children }: TooltipProps) {
  const id = useId();
  const triggerRootRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpenRef = useRef(false);
  const ignoreHoverRef = useRef(false);
  const childLabel = children.props as { iconOnly?: boolean; label?: string; 'aria-label'?: string };
  const [open, setOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const presence = usePresence(open, readCssDuration('--duration-instant', 80));
  const childIconOnly = childLabel.iconOnly;
  const childLabelText = childLabel.label;
  const childAriaLabel = childLabel['aria-label'];

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
  }, []);

  const showImmediately = useCallback(() => {
    clearHoverTimer();
    ignoreHoverRef.current = false;
    isOpenRef.current = true;
    setOpen(true);
  }, [clearHoverTimer]);

  const closeTooltip = useCallback(() => {
    clearHoverTimer();
    if (isOpenRef.current) recentlyClosedAt = Date.now();
    isOpenRef.current = false;
    setOpen(false);
  }, [clearHoverTimer]);

  const handleMouseEnter = useCallback(() => {
    if (ignoreHoverRef.current) return;
    clearHoverTimer();
    const openImmediately = Date.now() - recentlyClosedAt < 500;
    if (openImmediately) {
      showImmediately();
      return;
    }
    hoverTimerRef.current = setTimeout(showImmediately, 400);
  }, [clearHoverTimer, showImmediately]);

  const handleMouseLeave = useCallback(() => {
    ignoreHoverRef.current = false;
    closeTooltip();
  }, [closeTooltip]);

  const handleFocus = useCallback((event: FocusEvent<HTMLSpanElement>) => {
    if (focusIsVisible(event.target)) showImmediately();
  }, [showImmediately]);

  const handleBlur = useCallback(() => {
    closeTooltip();
  }, [closeTooltip]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      ignoreHoverRef.current = true;
      closeTooltip();
    }
  }, [closeTooltip]);

  useLayoutEffect(() => {
    const host = document.createElement('div');
    host.className = 'tooltip-portal';
    document.body.appendChild(host);
    setPortalContainer(host);
    return () => host.remove();
  }, []);

  useLayoutEffect(() => {
    if (!portalContainer) return;
    const themeSource = triggerRootRef.current?.closest<HTMLElement>('[data-theme]');
    const syncTheme = () => {
      if (themeSource && themeSource !== document.documentElement && themeSource.dataset.theme) {
        portalContainer.dataset.theme = themeSource.dataset.theme;
      } else {
        delete portalContainer.dataset.theme;
      }
    };
    syncTheme();
    if (!themeSource || themeSource === document.documentElement) return;
    const observer = new MutationObserver(syncTheme);
    observer.observe(themeSource, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [portalContainer]);

  useLayoutEffect(() => {
    const trigger = getFocusableElement(triggerRootRef.current);
    if (!trigger) return;
    const shouldSupplyLabel = childIconOnly && !childLabelText && !childAriaLabel;
    const previousLabel = shouldSupplyLabel ? trigger.getAttribute('aria-label') : null;
    if (shouldSupplyLabel) trigger.setAttribute('aria-label', content);

    return () => {
      if (shouldSupplyLabel) {
        if (previousLabel === null) trigger.removeAttribute('aria-label');
        else trigger.setAttribute('aria-label', previousLabel);
      }
    };
  }, [childAriaLabel, childIconOnly, childLabelText, content]);

  useLayoutEffect(() => {
    const trigger = getFocusableElement(triggerRootRef.current);
    if (!trigger || !presence.mounted || !portalContainer) return;

    const previousDescription = trigger.getAttribute('aria-describedby');
    const descriptions = new Set((previousDescription ?? '').split(/\s+/).filter(Boolean));
    descriptions.add(id);
    trigger.setAttribute('aria-describedby', [...descriptions].join(' '));

    return () => {
      const currentDescription = (trigger.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean).filter(value => value !== id);
      if (currentDescription.length) trigger.setAttribute('aria-describedby', currentDescription.join(' '));
      else trigger.removeAttribute('aria-describedby');
    };
  }, [id, portalContainer, presence.mounted]);

  useLayoutEffect(() => {
    const trigger = getFocusableElement(triggerRootRef.current);
    const tooltip = tooltipRef.current;
    if (!open || !trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(tooltip);
    const gap = Number.parseFloat(computedStyle.getPropertyValue('--tooltip-gap')) || 4;
    const edge = Number.parseFloat(computedStyle.getPropertyValue('--tooltip-edge')) || 8;
    const width = tooltipRect.width;
    const height = tooltipRect.height;
    const fits = (side: TooltipPlacement) => {
      if (side === 'top') return triggerRect.top - gap - height >= 0;
      if (side === 'bottom') return triggerRect.bottom + gap + height <= window.innerHeight;
      if (side === 'left') return triggerRect.left - gap - width >= 0;
      return triggerRect.right + gap + width <= window.innerWidth;
    };

    const actualPlacement = fits(placement) ? placement : oppositePlacement[placement];
    let top: number;
    let left: number;
    if (actualPlacement === 'top') {
      top = triggerRect.top - gap - height;
      left = triggerRect.left + (triggerRect.width - width) / 2;
      left = Math.max(edge, Math.min(left, window.innerWidth - width - edge));
    } else if (actualPlacement === 'bottom') {
      top = triggerRect.bottom + gap;
      left = triggerRect.left + (triggerRect.width - width) / 2;
      left = Math.max(edge, Math.min(left, window.innerWidth - width - edge));
    } else if (actualPlacement === 'left') {
      top = triggerRect.top + (triggerRect.height - height) / 2;
      left = triggerRect.left - gap - width;
      top = Math.max(edge, Math.min(top, window.innerHeight - height - edge));
    } else {
      top = triggerRect.top + (triggerRect.height - height) / 2;
      left = triggerRect.right + gap;
      top = Math.max(edge, Math.min(top, window.innerHeight - height - edge));
    }

    setPosition({ top, left, placement: actualPlacement });
  }, [content, open, placement, portalContainer, shortcut]);

  useLayoutEffect(() => () => clearHoverTimer(), [clearHoverTimer]);

  const tooltip = presence.mounted && portalContainer ? createPortal(
    <div
      ref={tooltipRef}
      id={id}
      className="tooltip"
      role="tooltip"
      data-state={presence.state}
      data-placement={position?.placement ?? placement}
      onTransitionEnd={presence.onTransitionEnd}
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        visibility: position ? 'visible' : 'hidden',
      }}
    >
      <span className="tooltip__content">{content}</span>
      {shortcut && <Kbd size="sm">{shortcut}</Kbd>}
    </div>,
    portalContainer,
  ) : null;

  return (
    <>
      <span
        ref={triggerRootRef}
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {children}
      </span>
      {tooltip}
    </>
  );
}
