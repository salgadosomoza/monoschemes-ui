import { useState } from 'react';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { Avatar } from '../Avatar';
import type { AvatarType, AvatarVariant } from '../Avatar';
import '../../styles/icons.css';
import './AppHeader.css';

export interface AppHeaderNavItem {
  label: string;
  href?: string;
  status?: 'default' | 'hover' | 'active';
}

export interface AppHeaderLogoProps {
  type: 'text' | 'image';
  label?: string;
  src?: string;
}

export interface AppHeaderAvatarProps {
  type: AvatarType;
  variant?: AvatarVariant;
}

export interface AppHeaderProps {
  logo?: AppHeaderLogoProps;
  siteTitle?: string;
  tagline?: string;
  navItems?: AppHeaderNavItem[];
  showAvatar?: boolean;
  avatarProps?: AppHeaderAvatarProps;
  showActions?: boolean;
  onMenuClick?: () => void;
}

export function AppHeader({
  logo,
  siteTitle,
  tagline,
  navItems = [],
  showAvatar = false,
  avatarProps,
}: AppHeaderProps) {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="app-header">
      <div className="app-header-top">
        <div className="app-header-left">
          {logo && <Logo type={logo.type} label={logo.label} src={logo.src} />}
          {siteTitle && <span className="app-header-site-title">{siteTitle}</span>}
          {tagline && <span className="app-header-tagline">{tagline}</span>}
        </div>

        {navItems.length > 0 && (
          <nav className="app-header-nav" aria-label="Main navigation">
            {navItems.map(item => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                status={activeNav === item.label ? 'active' : (item.status ?? 'default')}
                onClick={() => setActiveNav(item.label)}
              />
            ))}
          </nav>
        )}

        <div className="app-header-right">
          {showAvatar && avatarProps && (
            <Avatar type={avatarProps.type} variant={avatarProps.variant} />
          )}
          {navItems.length > 0 && (
            <button
              className="app-header-hamburger"
              aria-label="Toggle navigation"
              aria-expanded={showMobileMenu}
              onClick={() => setShowMobileMenu(v => !v)}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
        </div>
      </div>

      {showMobileMenu && navItems.length > 0 && (
        <nav className="app-header-mobile-nav" aria-label="Mobile navigation">
          {navItems.map(item => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              status={activeNav === item.label ? 'active' : (item.status ?? 'default')}
              onClick={() => { setActiveNav(item.label); setShowMobileMenu(false); }}
            />
          ))}
        </nav>
      )}
    </header>
  );
}
