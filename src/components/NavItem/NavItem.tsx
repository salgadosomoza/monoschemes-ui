import './NavItem.css';

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
}

export function NavItem({
  status = 'default',
  label = 'About',
  onClick,
  href,
}: NavItemProps) {
  if (href) {
    return (
      <a
        className="nav-item"
        data-status={status}
        href={href}
        onClick={onClick}
      >
        {label}
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
      {label}
    </button>
  );
}
