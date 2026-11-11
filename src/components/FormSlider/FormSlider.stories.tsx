import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormSlider } from './FormSlider';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/Form/Slider',
  component: FormSlider,
  args: {
    value: 1.8,
    min: 1,
    max: 2.5,
    step: 0.1,
    ticks: [1, 1.5, 2, 2.5],
    'aria-label': 'Icon stroke width',
    onChange: () => {},
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_BASE + '2324-1636' },
    docs: {
      description: {
        component: 'A controlled range input with an optional set of visible tick labels.',
      },
    },
  },
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    ticks: { control: 'object' },
    showTicks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    onChange: { action: 'value changed' },
  },
} satisfies Meta<typeof FormSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

function SliderExample({ dark = false, disabled = false }: { dark?: boolean; disabled?: boolean }) {
  const [value, setValue] = useState(1.8);
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ width: 320, padding: 24, background: 'var(--color-bg-page)' }}>
      <FormSlider
        value={value}
        min={1}
        max={2.5}
        step={0.1}
        ticks={[1, 1.5, 2, 2.5]}
        disabled={disabled}
        aria-label="Icon stroke width"
        onChange={setValue}
      />
    </div>
  );
}

export const Default: Story = { render: () => <SliderExample /> };
export const Disabled: Story = { render: () => <SliderExample disabled /> };
export const Dark: Story = { render: () => <SliderExample dark /> };
