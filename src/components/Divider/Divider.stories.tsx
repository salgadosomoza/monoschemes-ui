import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded', design: { type: 'figma', url: `${FIGMA_BASE}2270-316` } },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    tone: { control: 'select', options: ['default', 'strong'] },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { orientation: 'horizontal', tone: 'default' } };

export const Tones: Story = {
  render: () => <div style={{ display: 'grid', gap: 'var(--gap-xl)', width: 320 }}>
    <Divider tone="default" />
    <Divider tone="strong" />
  </div>,
};

export const Vertical: Story = {
  render: () => <div style={{ display: 'flex', alignItems: 'stretch', height: 64, gap: 'var(--gap-md)' }}>
    <span>Leading</span><Divider orientation="vertical" /><span>Trailing</span>
  </div>,
};
