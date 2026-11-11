import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormColorField } from './FormColorField';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/Form/ColorField',
  component: FormColorField,
  args: { label: 'Ink', value: '#262626', onChange: () => {} },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_BASE + '2260-1161' },
    docs: {
      description: {
        component: 'A compact color selector. The swatch uses the user-supplied color as data; the surrounding control uses semantic theme tokens.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'color' },
    onChange: { action: 'color changed' },
  },
} satisfies Meta<typeof FormColorField>;

export default meta;
type Story = StoryObj<typeof meta>;

function ColorFieldExample({ dark = false }: { dark?: boolean }) {
  const [value, setValue] = useState('#262626');
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ padding: 24, background: 'var(--color-bg-page)' }}>
      <FormColorField label="Ink" value={value} onChange={setValue} />
    </div>
  );
}

export const Default: Story = { render: () => <ColorFieldExample /> };
export const Dark: Story = { render: () => <ColorFieldExample dark /> };
