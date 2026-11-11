import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const OPTIONS = [
  { value: 'outline', label: 'Outline' },
  { value: 'filled', label: 'Filled' },
  { value: 'minimal', label: 'Minimal' },
];
const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: { options: OPTIONS, value: 'outline', onChange: () => {}, 'aria-label': 'View style' },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_BASE + '2260-1145' },
    docs: {
      description: {
        component: 'A controlled, single-selection radio group. Use arrow keys to move between options.',
      },
    },
  },
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'selection changed' },
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

function SegmentedExample() {
  const [value, setValue] = useState('outline');
  return (
    <div style={{ padding: 24, background: 'var(--color-bg-page)' }}>
      <SegmentedControl options={OPTIONS} value={value} onChange={setValue} aria-label="View style" />
    </div>
  );
}

export const Default: Story = { render: () => <SegmentedExample /> };
export const Dark: Story = { globals: { theme: 'dark' }, render: () => <SegmentedExample /> };
