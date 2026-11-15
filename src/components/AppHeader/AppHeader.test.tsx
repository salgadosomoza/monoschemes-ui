import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppHeader } from './AppHeader';
import { Nav } from '../Nav';
import { NavItem } from '../NavItem';
import { MegaMenu } from '../MegaMenu';

describe('AppHeader compact navigation', () => {
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.useRealTimers(); });

  function setDesktopWidth() {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 1200, height: 56, top: 0, left: 0, right: 1200, bottom: 56, x: 0, y: 0, toJSON: () => ({}) });
  }

  function renderHeader(props: ComponentProps<typeof AppHeader> = {}) {
    return render(<AppHeader {...props} logo={{ type: 'text', label: 'MonoSchemes' }} nav={
      <Nav><NavItem label="Home" href="#home" status="active" /><NavItem label="About" href="#about" /></Nav>
    } />);
  }

  it('opens with focus on the first link and Escape returns focus to the menu button', () => {
    const { container } = renderHeader();
    const trigger = container.querySelector<HTMLButtonElement>('.app-header-mobile-menu');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger!);
    expect(trigger!.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Home' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger!.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('closes after choosing a navigation link', () => {
    const { container } = renderHeader();
    const trigger = container.querySelector<HTMLButtonElement>('.app-header-mobile-menu')!;
    fireEvent.click(trigger);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link.classList.contains('nav-item')).toBe(true);
    fireEvent.click(link);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('reports changes to a controlled menu state', () => {
    const onMenuOpenChange = vi.fn();
    const { container } = renderHeader({ menuOpen: false, onMenuOpenChange });
    fireEvent.click(container.querySelector('.app-header-mobile-menu')!);
    expect(onMenuOpenChange).toHaveBeenCalledWith(true);
  });

  it('closes the panel when the container reaches 1024px', () => {
    let resize: ResizeObserverCallback | undefined;
    class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) { resize = callback; }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    const { container } = renderHeader({ defaultMenuOpen: true });
    const trigger = container.querySelector<HTMLButtonElement>('.app-header-mobile-menu')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    act(() => resize?.([{ contentRect: { width: 1024 } } as ResizeObserverEntry], {} as ResizeObserver));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not render its menu button when navigation is disabled', () => {
    const { container } = render(<AppHeader hasNav={false} logo={{ type: 'text', label: 'MonoSchemes' }} />);
    expect(container.querySelector('.app-header-mobile-menu')).toBeNull();
  });

  it('does not render example links when no nav is supplied', () => {
    render(<AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('opens a mega menu by click, closes with Escape, and restores trigger focus', () => {
    setDesktopWidth();
    const { container } = render(<AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /></Nav>} megaMenu={<MegaMenu id="products" groups={[{ heading: 'Build', items: [{ label: 'Components', href: '#components' }] }]} />} />);
    const trigger = screen.getByRole('button', { name: /Products/ });
    fireEvent.click(trigger);
    expect(screen.getByRole('navigation', { name: 'Mega menu' })).toBeTruthy();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    expect(container.querySelector('.mega-menu')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('opens on hover after 150 ms and closes 200 ms after leaving', () => {
    vi.useFakeTimers();
    setDesktopWidth();
    render(<AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /></Nav>} megaMenu={<MegaMenu id="products" groups={[{ heading: 'Build', items: [{ label: 'Components', href: '#components' }] }]} />} />);
    const trigger = screen.getByRole('button', { name: /Products/ });
    fireEvent.pointerEnter(trigger);
    act(() => vi.advanceTimersByTime(149));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    act(() => vi.advanceTimersByTime(1));
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(199));
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    act(() => vi.advanceTimersByTime(1));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the mega menu after selecting one of its links', () => {
    setDesktopWidth();
    render(<AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /></Nav>} megaMenu={<MegaMenu id="products" groups={[{ heading: 'Build', items: [{ label: 'Components', href: '#components' }] }]} />} />);
    fireEvent.click(screen.getByRole('button', { name: /Products/ }));
    fireEvent.click(screen.getByRole('link', { name: 'Components' }));
    expect(screen.getByRole('button', { name: /Products/ }).getAttribute('aria-expanded')).toBe('false');
  });

  it('shows mega menu groups as sections in the compact navigation panel', () => {
    render(<AppHeader defaultMenuOpen logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /></Nav>} megaMenu={<MegaMenu id="products" groups={[{ heading: 'Build', items: [{ label: 'Components', href: '#components' }] }, { heading: 'Learn', items: [{ label: 'Guides', href: '#guides' }] }]} />} />);
    expect(screen.getByRole('heading', { name: 'Build' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Learn' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Components' })).toBeTruthy();
  });

  it('switches panels directly when another menu trigger is opened', () => {
    setDesktopWidth();
    render(<AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /><NavItem label="Resources" hasMenu menuId="resources" /></Nav>} megaMenu={<><MegaMenu id="products" groups={[{ heading: 'Build', items: [{ label: 'Components', href: '#components' }] }]} /><MegaMenu id="resources" groups={[{ heading: 'Learn', items: [{ label: 'Guides', href: '#guides' }] }]} /></>} />);
    fireEvent.click(screen.getByRole('button', { name: /Products/ }));
    expect(screen.getByRole('link', { name: 'Components' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Resources/ }));
    expect(screen.getByRole('link', { name: 'Guides' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Components' })).toBeNull();
    expect(screen.getByRole('button', { name: /Resources/ }).getAttribute('aria-expanded')).toBe('true');
  });
});
