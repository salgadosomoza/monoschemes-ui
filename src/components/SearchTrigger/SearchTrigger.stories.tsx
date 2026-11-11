import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchTrigger } from './SearchTrigger';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/SearchTrigger',
  component: SearchTrigger,
  args: { placeholder: 'Search icons', onClick: () => {} },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: `${FIGMA_BASE}2284-1900` },
    docs: {
      description: {
        component: 'A button that opens a search palette or dialog. It is not an input; provide `onClick` to open the search experience. The displayed shortcut is informational and does not register a global key handler.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Search prompt shown in the trigger.' },
    shortcut: { control: 'text', description: 'Shortcut displayed in Kbd. Defaults to /.' },
    showShortcut: { control: 'boolean', description: 'Shows or hides the shortcut badge. Defaults to true.' },
    onClick: { action: 'open search', description: 'Called when the button is activated.' },
  },
} satisfies Meta<typeof SearchTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchTriggerExample({ dark = false, showShortcut = true }: { dark?: boolean; showShortcut?: boolean }) {
  const [opened, setOpened] = useState(false);
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ padding: 24, background: 'var(--color-bg-page)' }}>
      <SearchTrigger placeholder="Search icons" showShortcut={showShortcut} onClick={() => setOpened(true)} />
      {opened && <p role="status" style={{ color: 'var(--color-text-secondary)' }}>Search opened.</p>}
    </div>
  );
}

export const Default: Story = { args: { placeholder: 'Search icons', onClick: () => {} } };
export const WithoutShortcut: Story = { render: () => <SearchTriggerExample showShortcut={false} /> };
export const Dark: Story = { render: () => <SearchTriggerExample dark /> };
