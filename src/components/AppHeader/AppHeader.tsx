import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Logo } from '../Logo';
import type { LogoType } from '../Logo';
import type { IconName } from '../Icon';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Nav } from '../Nav';
import { usePresence } from '../../utils/usePresence';
import { MegaMenuContext } from '../MegaMenu/MegaMenuContext';
import './AppHeader.css';

export interface AppHeaderLogoProps {
  type: LogoType;
  label?: string;
  src?: string;
  alt?: string;
  mark?: IconName;
}

export interface AppHeaderProps {
  /** Logo component settings; supports swapping between a text or image mark. */
  logo?: AppHeaderLogoProps;
  /** Shows or hides the logo. Defaults to true. */
  hasLogo?: boolean;
  /** Shows or hides the site title. Defaults to true on desktop. */
  hasSiteTitle?: boolean;
  /** Shows or hides the tagline. Defaults to true on desktop. */
  hasTagline?: boolean;
  /** Shows or hides the navigation slot. Defaults to true on desktop. */
  hasNav?: boolean;
  /** Shows or hides the actions slot. Defaults to true. */
  hasActions?: boolean;
  siteTitle?: string;
  tagline?: string;
  /** Navigation content, commonly a Nav containing any number of NavItems. */
  nav?: ReactNode;
  /** Action content such as Buttons, an Avatar, or a Menu trigger. */
  actions?: ReactNode;
  /** Controls the compact navigation panel. */
  menuOpen?: boolean;
  /** Initial state for the compact navigation panel. */
  defaultMenuOpen?: boolean;
  /** Called when the compact navigation panel requests a state change. */
  onMenuOpenChange?: (open: boolean) => void;
  /** Mega menu panel rendered below the navigation. Trigger it with NavItem hasMenu. */
  megaMenu?: ReactNode;
  megaMenuOpen?: boolean;
  defaultMegaMenuOpen?: boolean;
  onMegaMenuOpenChange?: (open: boolean) => void;
}

export function AppHeader({
  logo = { type: 'image' },
  hasLogo = true,
  hasSiteTitle = true,
  hasTagline = true,
  hasNav = true,
  hasActions = true,
  siteTitle = 'Site title',
  tagline = 'Tagline',
  nav,
  actions,
  menuOpen: controlledMenuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  megaMenu,
  megaMenuOpen: controlledMegaMenuOpen,
  defaultMegaMenuOpen = false,
  onMegaMenuOpenChange,
}: AppHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navId = useId();
  const megaMenuId = useId();
  const [internalMenuOpen, setInternalMenuOpen] = useState(defaultMenuOpen);
  const [internalMegaMenuOpen, setInternalMegaMenuOpen] = useState(defaultMegaMenuOpen);
  const [activeMenuId, setActiveMenuId] = useState<string | undefined>();
  const [isCompact, setIsCompact] = useState(false);
  const megaTriggerRef = useRef<HTMLElement | null>(null);
  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMenuOpen = hasNav && (controlledMenuOpen ?? internalMenuOpen);
  const isMegaMenuOpen = hasNav && megaMenu !== undefined && (controlledMegaMenuOpen ?? internalMegaMenuOpen);
  const menuPresence = usePresence(isMenuOpen, 120);
  const mobileState = isMenuOpen ? 'open' : menuPresence.state;
  const navContent = nav ?? <Nav />;

  const setMenuOpen = useCallback((next: boolean) => {
    if (controlledMenuOpen === undefined) setInternalMenuOpen(next);
    onMenuOpenChange?.(next);
  }, [controlledMenuOpen, onMenuOpenChange]);

  const setMegaMenuOpen = useCallback((next: boolean, menuId?: string) => {
    if (controlledMegaMenuOpen === undefined) setInternalMegaMenuOpen(next);
    if (next && menuId !== undefined) setActiveMenuId(menuId);
    onMegaMenuOpenChange?.(next);
  }, [controlledMegaMenuOpen, onMegaMenuOpenChange]);
  const toggleMegaMenu = useCallback((trigger: HTMLElement, menuId?: string) => {
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverOpenTimer.current = null;
    hoverCloseTimer.current = null;
    const sameTrigger = megaTriggerRef.current === trigger;
    megaTriggerRef.current = trigger;
    if (isMegaMenuOpen && (sameTrigger || activeMenuId === undefined)) setMegaMenuOpen(false);
    else setMegaMenuOpen(true, menuId);
  }, [activeMenuId, isMegaMenuOpen, setMegaMenuOpen]);
  const cancelMegaClose = useCallback(() => {
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = null;
  }, []);
  const megaMenuContext = useMemo(() => ({
    open: isMegaMenuOpen,
    compactOpen: isCompact && isMenuOpen,
    panelId: megaMenuId,
    activeMenuId,
    setOpen: setMegaMenuOpen,
    toggle: toggleMegaMenu,
    setTrigger: (trigger: HTMLElement | null) => { megaTriggerRef.current = trigger; },
    scheduleOpen: (trigger: HTMLElement, menuId?: string) => {
      megaTriggerRef.current = trigger;
      cancelMegaClose();
      if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = setTimeout(() => setMegaMenuOpen(true, menuId), 150);
    },
    scheduleClose: () => {
      if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = null;
      cancelMegaClose();
      hoverCloseTimer.current = setTimeout(() => setMegaMenuOpen(false), 200);
    },
    cancelClose: cancelMegaClose,
  }), [isMegaMenuOpen, isCompact, isMenuOpen, activeMenuId, megaMenuId, setMegaMenuOpen, toggleMegaMenu, cancelMegaClose]);

  useEffect(() => () => {
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
  }, []);

  useEffect(() => {
    if (!isMegaMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setMegaMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaMenuOpen(false);
        megaTriggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMegaMenuOpen, setMegaMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    navRef.current?.querySelector<HTMLElement>('a[href], button:not(:disabled), [role="link"], [tabindex="0"]')?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, setMenuOpen]);


  useEffect(() => {
    navRef.current?.toggleAttribute('inert', isCompact && !isMenuOpen);
  }, [isCompact, isMenuOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    function closeAtDesktopWidth(width: number) {
      setIsCompact(width < 1024);
      if (width >= 1024 && isMenuOpen) setMenuOpen(false);
      if (width < 1024 && isMegaMenuOpen) setMegaMenuOpen(false);
    }
    const onResize = () => closeAtDesktopWidth(container.getBoundingClientRect().width);
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver((entries) => closeAtDesktopWidth(entries[0]?.contentRect.width ?? 0))
      : null;
    if (observer) observer.observe(container);
    else window.addEventListener('resize', onResize);
    closeAtDesktopWidth(container.getBoundingClientRect().width);
    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen, isMegaMenuOpen, setMenuOpen, setMegaMenuOpen]);

  function handleNavClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest('a[href], [role="link"]')) setMenuOpen(false);
  }

  return (
    <MegaMenuContext.Provider value={megaMenuContext}>
    <div className="app-header-container" ref={containerRef}>
      <header className="app-header">
        <div className="app-header-top">
          <div className="app-header-left">
            {hasLogo && <Logo type={logo.type} label={logo.label} src={logo.src} alt={logo.alt} mark={logo.mark} />}
            {hasSiteTitle && <span className="app-header-site-title">{siteTitle}</span>}
            {hasTagline && <span className="app-header-tagline">{tagline}</span>}
          </div>

          {hasNav && (
            <div
              className="app-header-nav"
              id={navId}
              ref={navRef}
              data-mobile-open={isMenuOpen || undefined}
              data-mobile-state={mobileState}
              data-state={mobileState}
              data-mobile-mounted={menuPresence.mounted || undefined}
              aria-hidden={isCompact && !isMenuOpen || undefined}
              onTransitionEnd={menuPresence.onTransitionEnd}
              onClick={handleNavClick}
            >
              {navContent}
              {megaMenu}
            </div>
          )}

          {(hasActions || hasNav) && (
            <div className="app-header-actions" data-has-actions={hasActions || undefined}>
              {hasActions && actions !== undefined ? actions : hasActions ? (
                <>
                  <Avatar type="initials" size="sm" initials="WM" />
                  <Button className="app-header-desktop-menu" variant="tertiary" size="sm" iconOnly iconLeft="menu-2" label="Open menu" />
                </>
              ) : null}
              {hasNav && (
                <Button
                  ref={menuButtonRef}
                  className="app-header-mobile-menu"
                  variant="tertiary"
                  size="sm"
                  iconOnly
                  iconLeft={isMenuOpen ? 'x' : 'menu-2'}
                  label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                  aria-controls={navId}
                  onClick={() => setMenuOpen(!isMenuOpen)}
                />
              )}
            </div>
          )}
        </div>
      </header>
    </div>
    </MegaMenuContext.Provider>
  );
}
