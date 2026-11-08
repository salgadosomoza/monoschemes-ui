import type { ReactNode } from 'react';
import { NavItem } from '../NavItem';
import './Nav.css';

export interface NavProps {
  /** Any number of NavItem components or other navigation elements. */
  children?: ReactNode;
  'aria-label'?: string;
}

export function Nav({ children, 'aria-label': ariaLabel = 'Main navigation' }: NavProps) {
  return (
    <nav className="nav" aria-label={ariaLabel}>
      {children ?? (
        <>
          <NavItem label="Works" href="#works" />
          <NavItem label="About" href="#about" />
          <NavItem label="Other projects" href="#other-projects" />
        </>
      )}
    </nav>
  );
}
