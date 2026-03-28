import type { Meta, StoryObj } from '@storybook/react';
import { FormDate } from './FormDate';

const meta = {
  title: 'Components/Form/Date',
  component: FormDate,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Format: DD/MM/YYYY' },
    min: { control: 'text' },
    max: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FormDate>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Default: Story = {
  args: { label: 'Date' },
  parameters: figma('22-560'),
};

export const WithValue: Story = {
  args: { label: 'Date', value: '28/03/2026' },
  parameters: figma('22-560'),
};

export const Disabled: Story = {
  args: { label: 'Date', disabled: true },
  parameters: figma('22-560'),
};
