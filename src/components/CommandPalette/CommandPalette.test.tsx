import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { CommandPalette, CommandPaletteGroup, CommandPaletteItem } from './CommandPalette';

afterEach(cleanup);

function Palette(props: Partial<React.ComponentProps<typeof CommandPalette>> = {}) {
  return <CommandPalette open {...props}>
    <CommandPaletteGroup label="Pages">
      <CommandPaletteItem label="Dashboard" keywords={['home']} onSelect={props.onOpenChange as (() => void) | undefined} />
      <CommandPaletteItem label="Settings" disabled />
    </CommandPaletteGroup>
    <CommandPaletteGroup label="Actions">
      <CommandPaletteItem label="Open profile" keywords={['café']} />
    </CommandPaletteGroup>
  </CommandPalette>;
}

describe('CommandPalette', () => {
  it('filters labels and keywords without accents or case sensitivity', () => {
    render(<Palette />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CAFE' } });
    expect(screen.getByRole('option', { name: /Open profile/ })).toBeTruthy();
    expect(screen.queryByRole('group', { name: 'Pages' })).toBeNull();
  });

  it('moves the active option with arrows, Home, End and skips disabled options', () => {
    render(<Palette />);
    const input = screen.getByRole('combobox');
    expect(input.getAttribute('aria-activedescendant')).toContain('item-0-0');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toContain('item-1-0');
    fireEvent.keyDown(input, { key: 'Home' });
    expect(input.getAttribute('aria-activedescendant')).toContain('item-0-0');
    fireEvent.keyDown(input, { key: 'End' });
    expect(input.getAttribute('aria-activedescendant')).toContain('item-1-0');
  });

  it('activates a result with Enter, closes with Escape and restores focus', async () => {
    const selected = vi.fn();
    function Harness() {
      const [open, setOpen] = useState(false);
      return <><button onClick={() => setOpen(true)}>Open</button><CommandPalette open={open} onOpenChange={setOpen}><CommandPaletteGroup label="Pages"><CommandPaletteItem label="Dashboard" onSelect={selected} /></CommandPaletteGroup></CommandPalette></>;
    }
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();
    fireEvent.click(trigger);
    const input = await screen.findByRole('combobox');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(selected).toHaveBeenCalled();
    fireEvent.click(trigger);
    const reopenedInput = await screen.findByRole('combobox');
    fireEvent.keyDown(reopenedInput, { key: 'Escape' });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it('opens on the configured shortcut and ignores contenteditable targets', async () => {
    render(<><div contentEditable data-testid="editor" /><CommandPalette shortcut="mod+k"><CommandPaletteGroup label="Pages"><CommandPaletteItem label="Dashboard" /></CommandPaletteGroup></CommandPalette></>);
    const editor = screen.getByTestId('editor');
    fireEvent.keyDown(editor, { key: 'k', ctrlKey: true });
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(await screen.findByRole('dialog')).toBeTruthy();
  });
});
