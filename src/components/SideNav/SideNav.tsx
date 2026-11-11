import { Children, type ReactNode } from 'react';
import { Text } from '../Text';
import './SideNav.css';

export interface SideNavItemProps {
  label: string;
  count?: string | number;
  showCount?: boolean;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface SideNavProps {
  heading?: string;
  showHeading?: boolean;
  children: ReactNode;
}

export function SideNavItem({
  label,
  count,
  showCount = true,
  selected = false,
  href,
  onClick,
}: SideNavItemProps) {
  const content = (
    <>
      <span className="side-nav-item__label">{label}</span>
      {showCount && count !== undefined && <span className="side-nav-item__count">{count}</span>}
    </>
  );

  if (href) {
    return (
      <a className="side-nav-item" data-selected={selected ? 'true' : undefined} href={href} aria-current={selected ? 'page' : undefined} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className="side-nav-item" data-selected={selected ? 'true' : undefined} type="button" aria-current={selected ? 'page' : undefined} onClick={onClick}>
      {content}
    </button>
  );
}

export function SideNav({ heading = 'Section', showHeading = true, children }: SideNavProps) {
  const items = Children.toArray(children);
  return (
    <nav className="side-nav" aria-label={heading || 'Side navigation'}>
      {showHeading && <Text className="side-nav__heading" style="h6" as="h2">{heading}</Text>}
      <ul className="side-nav__items">
        {items.map((item, index) => <li className="side-nav__list-item" key={index}>{item}</li>)}
      </ul>
    </nav>
  );
}
