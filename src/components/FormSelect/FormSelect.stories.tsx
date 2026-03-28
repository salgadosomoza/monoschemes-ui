import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from './FormSelect';

const meta = {
  title: 'Components/Form/Select',
  component: FormSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const SAMPLE_OPTIONS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
];

export const Default: Story = {
  args: { placeholder: 'Select' },
  parameters: figma('2-15'),
};

export const WithOptions: Story = {
  args: { options: SAMPLE_OPTIONS, placeholder: 'Select a team', label: 'Team' },
  parameters: figma('2-15'),
};

export const WithValue: Story = {
  args: { options: SAMPLE_OPTIONS, value: 'engineering', label: 'Team' },
  parameters: figma('2-15'),
};

export const Disabled: Story = {
  args: { options: SAMPLE_OPTIONS, placeholder: 'Select a team', label: 'Team', disabled: true },
  parameters: figma('2-15'),
};

export const WithError: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    placeholder: 'Select a team',
    label: 'Team',
    error: true,
    helperText: 'This field is required',
  },
  parameters: figma('2-15'),
};
