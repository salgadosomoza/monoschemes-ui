import type { ReactNode } from 'react';
import { Logo } from '../Logo';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Nav } from '../Nav';
import './AppHeader.css';

export interface AppHeaderLogoProps {
  type: 'text' | 'image';
  label?: string;
  src?: string;
  alt?: string;
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
}: AppHeaderProps) {
  return (
    <div className="app-header-container">
      <header className="app-header">
        <div className="app-header-top">
          <div className="app-header-left">
            {hasLogo && <Logo type={logo.type} label={logo.label} src={logo.src} alt={logo.alt} />}
            {hasSiteTitle && <span className="app-header-site-title">{siteTitle}</span>}
            {hasTagline && <span className="app-header-tagline">{tagline}</span>}
          </div>

          {hasNav && <div className="app-header-nav">{nav ?? <Nav />}</div>}

          {hasActions && (
            <div className="app-header-actions">
              {actions ?? (
                <>
                  <Avatar type="initials" size="sm" initials="WM" />
                  <Button variant="tertiary" size="sm" iconOnly iconLeft="menu-2" label="Open menu" />
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
