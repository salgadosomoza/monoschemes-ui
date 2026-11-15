import type { PointerEvent as ReactPointerEvent } from 'react';
import './NavItem.css';
import { Icon } from '../Icon';
import { useMegaMenuContext } from '../MegaMenu/MegaMenuContext';

export type NavItemStatus = 'default' | 'hover' | 'active';

export interface NavItemProps {
  /** Visual/interactive status of the nav item. */
  status?: NavItemStatus;
  /** Text label displayed inside the nav item. */
  label?: string;
  /** Callback fired when the item is clicked. */
  onClick?: () => void;
  /** When provided, renders an <a> tag instead of a <button>. */
  href?: string;
  /** Renders this item as a MegaMenu trigger. */
  hasMenu?: boolean;
  expanded?: boolean;
  ariaControls?: string;
  menuId?: string;
  onExpandedChange?: (expanded: boolean) => void;
}

export function NavItem({
  status = 'default',
  label = 'About',
  onClick,
  href,
  hasMenu = false,
  expanded: controlledExpanded,
  ariaControls,
  menuId,
  onExpandedChange,
}: NavItemProps) {
  const megaMenu = useMegaMenuContext();
  const expanded = hasMenu ? ((megaMenu?.open && (menuId === undefined || megaMenu.activeMenuId === undefined || megaMenu.activeMenuId === menuId)) || megaMenu?.compactOpen || controlledExpanded || false) : false;
  const toggleMenu = (element: HTMLElement) => {
    if (megaMenu) {
      megaMenu.toggle(element, menuId);
    } else onExpandedChange?.(!expanded);
    onClick?.();
  };
  const menuProps = hasMenu ? {
    'aria-haspopup': 'true' as const,
    'aria-expanded': expanded,
    'aria-controls': megaMenu ? `${megaMenu.panelId}${menuId ? `-${menuId}` : ''}` : ariaControls,
    'data-has-menu': true,
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => megaMenu?.scheduleOpen(event.currentTarget, menuId),
    onPointerLeave: () => megaMenu?.scheduleClose(),
  } : {};
  const content = <><span className="nav-item__label">{label}</span>{hasMenu && <Icon className="nav-item__chevron" name="chevron-down" size={16} aria-hidden="true" />}</>;

  if (hasMenu) {
    return <button className="nav-item" data-status={status} type="button" {...menuProps} onClick={(event) => toggleMenu(event.currentTarget)}>{content}</button>;
  }
  if (href) {
    return (
      <a
        className="nav-item"
        data-status={status}
        href={href}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className="nav-item"
      data-status={status}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}
