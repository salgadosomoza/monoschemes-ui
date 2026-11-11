import type { Meta, StoryObj } from '@storybook/react';
import { PaginationItem } from '../src/components/Pagination';

const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2324-286';

const meta = {
  title: 'Components/Pagination/Item',
  component: PaginationItem,
  args: { label: '2', state: 'default' },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: 'A 40px page control. The ellipsis state is decorative and does not receive focus.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'current', 'ellipsis'] },
    onClick: { action: 'page selected' },
  },
} satisfies Meta<typeof PaginationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Current: Story = { args: { label: '2', state: 'current' } };
export const Ellipsis: Story = { args: { state: 'ellipsis' } };
export const Dark: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <div style={{ padding: 24, background: 'var(--color-bg-page)' }}>
      <PaginationItem label="2" state="current" />
    </div>
  ),
};
