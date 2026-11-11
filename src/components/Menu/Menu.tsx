import { useLayoutEffect, useRef, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react';
import './Menu.css';
import { Icon, type IconName } from '../Icon';

export interface MenuProps {
  /** Menu actions and separators. */
  children: ReactNode;
  /** Accessible name for the action list. */
  'aria-label': string;
  /** Width of the menu. Defaults to 240px. */
  width?: number | string;
  /** Called when Escape is pressed so the trigger can close the menu. */
  onClose?: () => void;
}

export interface MenuItemProps {
  label: string;
  /** Tabler icon name, matching the Figma Icon/<name> component. */
  icon?: IconName;
  shortcut?: string;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  onSelect?: () => void;
}

export function Menu({ children, 'aria-label': ariaLabel, width = 240, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const style = typeof width === 'number' ? { width: `${width}px` } : { width };

  useLayoutEffect(() => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(':scope > [role="menuitem"]') ?? []);
    const firstEnabled = items.find((item) => item.getAttribute('aria-disabled') !== 'true');
    items.forEach((item) => { item.tabIndex = item === firstEnabled ? 0 : -1; });
  }, [children]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(':scope > [role="menuitem"]') ?? []);
    const enabledItems = items.filter((item) => item.getAttribute('aria-disabled') !== 'true');
    if (!enabledItems.length) {
      if (event.key === 'Escape') onClose?.();
      return;
    }

    const currentIndex = enabledItems.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex: number | undefined;
    if (event.key === 'ArrowDown') nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % enabledItems.length;
    if (event.key === 'ArrowUp') nextIndex = currentIndex < 0 ? enabledItems.length - 1 : (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = enabledItems.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      items.forEach((item) => { item.tabIndex = -1; });
      const nextItem = enabledItems[nextIndex];
      nextItem.tabIndex = 0;
      nextItem.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose?.();
    }
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement) || target.getAttribute('role') !== 'menuitem') return;
    menuRef.current?.querySelectorAll<HTMLButtonElement>(':scope > [role="menuitem"]').forEach((item) => {
      item.tabIndex = item === target && target.getAttribute('aria-disabled') !== 'true' ? 0 : -1;
    });
  }

  return (
    <div
      ref={menuRef}
      className="menu"
      role="menu"
      aria-label={ariaLabel}
      style={style}
      onKeyDown={handleKeyDown}
      onFocusCapture={handleFocus}
    >
      {children}
    </div>
  );
}

export function MenuItem({ label, icon, shortcut, variant = 'default', disabled = false, onSelect }: MenuItemProps) {
  return (
    <button
      className="menu-item"
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      data-variant={variant}
      data-disabled={disabled || undefined}
      tabIndex={-1}
      onClick={() => { if (!disabled) onSelect?.(); }}
    >
      {icon && <Icon className="menu-item__icon" name={icon} size={16} />}
      <span className="menu-item__label">{label}</span>
      {shortcut && <span className="menu-item__shortcut">{shortcut}</span>}
    </button>
  );
}

export function MenuDivider() {
  return <div className="menu-divider" role="separator" aria-orientation="horizontal" />;
}
