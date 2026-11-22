import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { SearchTrigger } from '../SearchTrigger';
import { CommandPalette, CommandPaletteGroup, CommandPaletteItem } from './CommandPalette';

const meta = {
  title: 'Navigation/Command palette',
  component: CommandPalette,
  args: { children: <CommandPaletteGroup label="Pages"><CommandPaletteItem label="Dashboard" /></CommandPaletteGroup> },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2727-850' },
    docs: { description: { component: 'Use a command palette for local command discovery and navigation. Search matches labels and keywords without case or accent sensitivity. The shortcut is registered only while this component is mounted.' } },
  },
  argTypes: { open: { control: false }, defaultOpen: { control: false }, children: { control: false }, query: { control: false } },
} satisfies Meta<typeof CommandPalette>;
export default meta;
type Story = StoryObj<typeof meta>;

function Example({ mode = 'default' }: { mode?: 'default' | 'empty' | 'loading' | 'inverse' }) {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState(mode === 'empty' ? 'no-match' : '');
  const inverse = mode === 'inverse';
  return <div data-theme={inverse ? 'inverse' : undefined} style={{ minHeight: '80vh', padding: 32, background: 'var(--color-bg-page)' }}>
    <SearchTrigger placeholder="Search commands" shortcut="⌘K" onClick={() => setOpen(true)} />
    <div style={{ marginTop: 24 }}><Button label="Open palette" variant="secondary" onClick={() => setOpen(true)} /></div>
    {inverse && <p style={{ marginTop: 24, padding: 24 }}>The palette inherits the trigger theme.</p>}
    <CommandPalette open={open} onOpenChange={setOpen} query={query} onQueryChange={setQuery} loading={mode === 'loading'}>
      <CommandPaletteGroup label="Pages">
        <CommandPaletteItem label="Dashboard" description="Overview of your workspace" icon="chart-bar" shortcut="⌘1" keywords={['home', 'overview']} />
        <CommandPaletteItem label="Settings" description="Manage preferences" icon="adjustments" shortcut="⌘," />
      </CommandPaletteGroup>
      <CommandPaletteGroup label="Actions">
        <CommandPaletteItem label="Create project" icon="plus" shortcut="⌘N" />
        <CommandPaletteItem label="Export report" icon="download" disabled />
      </CommandPaletteGroup>
    </CommandPalette>
  </div>;
}

export const Default: Story = { render: () => <Example /> };
export const Empty: Story = { render: () => <Example mode="empty" /> };
export const Loading: Story = { render: () => <Example mode="loading" /> };
export const Dark: Story = { globals: { theme: 'dark' }, render: () => <Example /> };
export const Inverse: Story = { render: () => <Example mode="inverse" /> };
export const Mobile: Story = { render: () => <Example />, parameters: { viewport: { defaultViewport: 'mobile1' } } };
