import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { IconName } from '../src/components/Icon';
import { IconTile } from '../src/components/IconTile';

const ICONS: Array<{ icon: IconName; label: string }> = [
  { icon: 'search', label: 'search' },
  { icon: 'palette', label: 'palette' },
  { icon: 'copy', label: 'copy' },
  { icon: 'check', label: 'check' },
  { icon: 'arrow-right', label: 'arrow-right' },
  { icon: 'keyboard', label: 'keyboard' },
];
const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2334-1599';

const meta = {
  title: 'Components/IconTile',
  component: IconTile,
  args: { icon: 'search', label: 'search' },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: 'A selectable cell for an icon library grid. Selected items expose aria-pressed when onClick is provided.',
      },
    },
  },
  argTypes: {
    icon: { control: 'select', options: ICONS.map((item) => item.icon) },
    label: { control: 'text' },
    selected: { control: 'boolean' },
    onClick: { action: 'tile selected' },
  },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

function IconGrid() {
  const [selected, setSelected] = useState('search');
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 112px)', gap: 16, padding: 24, background: 'var(--color-bg-page)' }}
    >
      {ICONS.map((item) => (
        <IconTile
          key={item.label}
          icon={item.icon}
          label={item.label}
          selected={selected === item.label}
          onClick={() => setSelected(item.label)}
        />
      ))}
    </div>
  );
}

export const Default: Story = { args: { icon: 'search', label: 'search' } };
export const Selected: Story = { args: { icon: 'search', label: 'search', selected: true, onClick: () => {} } };
export const IconLibraryGrid: Story = { render: () => <IconGrid /> };
export const Dark: Story = { globals: { theme: 'dark' }, render: () => <IconGrid /> };
