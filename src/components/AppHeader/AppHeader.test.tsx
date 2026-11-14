import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppHeader } from './AppHeader';
import { Nav } from '../Nav';
import { NavItem } from '../NavItem';

describe('AppHeader compact navigation', () => {
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

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
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
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
});
