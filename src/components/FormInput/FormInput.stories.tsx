import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './FormInput';
import type { FormInputType } from './FormInput';

const TYPES: FormInputType[] = [
  'simple',
  'trailing-icon',
  'leading-select',
  'prefix',
  'leading-and-trailing-icon',
];

const meta = {
  title: 'Components/Form/Input',
  component: FormInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Simple: Story = {
  args: { type: 'simple', placeholder: 'Placeholder', label: 'Label', helperText: 'Helper text' },
  parameters: figma('444-3191'),
};

export const TrailingIcon: Story = {
  args: { type: 'trailing-icon', placeholder: 'Search…', label: 'Search' },
  parameters: figma('444-3191'),
};

export const LeadingSelect: Story = {
  args: { type: 'leading-select', placeholder: 'example.com', label: 'URL' },
  parameters: figma('444-3191'),
};

export const Prefix: Story = {
  args: { type: 'prefix', placeholder: '0.00', label: 'Amount' },
  parameters: figma('444-3191'),
};

export const LeadingAndTrailingIcon: Story = {
  args: { type: 'leading-and-trailing-icon', placeholder: 'Search…', label: 'Search' },
  parameters: figma('444-3191'),
};

export const WithError: Story = {
  args: { type: 'simple', label: 'Email', placeholder: 'you@example.com', error: true, helperText: 'Invalid email address' },
  parameters: figma('444-3191'),
};

export const Disabled: Story = {
  args: { type: 'simple', label: 'Label', placeholder: 'Placeholder', disabled: true },
  parameters: figma('444-3191'),
};

export const AllCombinations: Story = {
  parameters: figma('444-3191'),
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {TYPES.map((type) => (
        <FormInput key={type} type={type} label={type} placeholder="Placeholder" />
      ))}
    </div>
  ),
};
