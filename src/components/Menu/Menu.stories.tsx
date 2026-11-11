import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Menu, MenuDivider, MenuItem } from './Menu';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'padded', ...figma('2075-309') },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menu aria-label="Page actions">
      <MenuItem label="Edit" onSelect={() => {}} />
      <MenuItem label="Duplicate" onSelect={() => {}} />
      <MenuItem label="Share" onSelect={() => {}} />
      <MenuDivider />
      <MenuItem label="Delete" variant="danger" onSelect={() => {}} />
    </Menu>
  ),
};

export const WithIconsAndShortcuts: Story = {
  render: () => (
    <Menu aria-label="Editor actions">
      <MenuItem label="New file" icon="file-text" shortcut="⌘N" onSelect={() => {}} />
      <MenuItem label="Search" icon="search" shortcut="⌘K" onSelect={() => {}} />
      <MenuItem label="Share" icon="link" shortcut="⇧⌘S" onSelect={() => {}} />
      <MenuDivider />
      <MenuItem label="Delete" icon="x" shortcut="⌫" variant="danger" onSelect={() => {}} />
    </Menu>
  ),
  parameters: figma('2075-306'),
};

export const States: Story = {
  render: () => (
    <Menu aria-label="Menu item states">
      <MenuItem label="Hover state" />
      <MenuItem label="Focus state" />
      <MenuItem label="Disabled state" disabled shortcut="⌘D" />
      <MenuItem label="Danger state" variant="danger" />
    </Menu>
  ),
  parameters: {
    ...figma('2075-306'),
    pseudo: {
      hover: ['.menu-item:nth-child(1)'],
      focus: ['.menu-item:nth-child(2)'],
    },
  },
};

function InContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setIsOpen(false);
    wrapperRef.current?.querySelector<HTMLButtonElement>('button[aria-label="More actions"]')?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;
    const menu = wrapperRef.current?.querySelector<HTMLElement>('[role="menu"]');
    const firstEnabled = menu?.querySelector<HTMLButtonElement>('[role="menuitem"]:not([aria-disabled="true"])');
    firstEnabled?.focus();

    function handleOutsideClick(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) closeMenu();
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="menu-story-context" style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        label="More actions"
        variant="tertiary"
        iconOnly
        iconLeft="dots"
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen && (
        <div style={{ position: 'absolute', top: 'calc(100% + var(--spacing-2xs))', left: 0, zIndex: 1 }}>
          <Menu aria-label="More actions" onClose={closeMenu}>
            <MenuItem label="Edit" onSelect={closeMenu} />
            <MenuItem label="Duplicate" onSelect={closeMenu} />
            <MenuItem label="Share" onSelect={closeMenu} />
            <MenuDivider />
            <MenuItem label="Delete" variant="danger" onSelect={closeMenu} />
          </Menu>
        </div>
      )}
    </div>
  );
}

export const InContext: Story = {
  render: () => <InContextMenu />,
  parameters: figma('2075-309'),
};
