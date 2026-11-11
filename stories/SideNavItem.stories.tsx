import type { Meta, StoryObj } from '@storybook/react';
import { SideNavItem } from '../src/components/SideNav';

const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2260-1195';

const meta = {
  title: 'Components/SideNav/Item',
  component: SideNavItem,
  args: { label: 'All icons', count: '5,203', showCount: true },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    label: { control: 'text' },
    count: { control: 'text' },
    showCount: { control: 'boolean' },
    selected: { control: 'boolean' },
    href: { control: 'text' },
    onClick: { action: 'item activated' },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { label: 'All icons', count: '5,203', selected: true } };
export const Dark: Story = {
  render: () => (
    <div data-theme="dark" style={{ width: 256, padding: 24, background: 'var(--color-bg-page)' }}>
      <SideNavItem label="All icons" count="5,203" selected />
    </div>
  ),
};
