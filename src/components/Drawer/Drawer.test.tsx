import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Drawer } from './Drawer';

afterEach(cleanup);

function DrawerHarness({ onOpenChange = vi.fn() }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Open drawer</button><Drawer open={open} onOpenChange={value => { onOpenChange(value); setOpen(value); }} title="Edit profile" description="Update account details"><label>Name<input /></label><button>Save</button></Drawer></>;
}

describe('Drawer', () => {
  it('opens a modal dialog, locks page scroll and returns focus on Escape', async () => {
    const onOpenChange = vi.fn();
    render(<DrawerHarness onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Open drawer' });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toBe(document.activeElement));
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when the backdrop is pressed', async () => {
    render(<DrawerHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
    fireEvent.mouseDown(dialog.parentElement!);
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Edit profile' })).toBeNull());
  });

  it('traps keyboard focus inside the panel', async () => {
    render(<DrawerHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    await screen.findByRole('dialog', { name: 'Edit profile' });
    const close = screen.getByRole('button', { name: 'Close' });
    const save = screen.getByRole('button', { name: 'Save' });
    save.focus();
    fireEvent.keyDown(save, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(save);
  });

  it('supports a controlled open state and describes the dialog', () => {
    const onOpenChange = vi.fn();
    render(<Drawer open onOpenChange={onOpenChange} title="Filters" description="Choose the results to show" />);
    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog.getAttribute('aria-describedby')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
