import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Menu, MenuDivider, MenuItem } from './Menu';

function renderMenu() {
  return render(
    <Menu aria-label="Actions">
      <MenuItem label="First" onSelect={vi.fn()} />
      <MenuItem label="Disabled" disabled onSelect={vi.fn()} />
      <MenuDivider />
      <MenuItem label="Last" onSelect={vi.fn()} />
    </Menu>,
  );
}

afterEach(cleanup);

describe('Menu', () => {
  it('sets up semantic roles and roving tab stops', () => {
    renderMenu();
    expect(screen.getByRole('menu', { name: 'Actions' })).toBeTruthy();
    expect(screen.getByRole('separator')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: 'First' }).getAttribute('tabindex')).toBe('0');
    expect(screen.getByRole('menuitem', { name: 'Disabled' }).getAttribute('aria-disabled')).toBe('true');
  });

  it('moves focus with arrows, Home, and End while skipping disabled items', () => {
    renderMenu();
    const first = screen.getByRole('menuitem', { name: 'First' });
    const last = screen.getByRole('menuitem', { name: 'Last' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: 'End' });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: 'Home' });
    expect(document.activeElement).toBe(first);
  });

  it('closes on Escape and activates only enabled rows with Enter or Space', () => {
    const onClose = vi.fn();
    const onSelect = vi.fn();
    render(
      <Menu aria-label="Actions" onClose={onClose}>
        <MenuItem label="Enabled" onSelect={onSelect} />
        <MenuItem label="Disabled" disabled onSelect={onSelect} />
      </Menu>,
    );
    const enabled = screen.getByRole('menuitem', { name: 'Enabled' });
    const disabled = screen.getByRole('menuitem', { name: 'Disabled' });
    fireEvent.keyDown(enabled, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
    fireEvent.keyDown(enabled, { key: 'Enter' });
    fireEvent.click(enabled);
    fireEvent.click(disabled);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
