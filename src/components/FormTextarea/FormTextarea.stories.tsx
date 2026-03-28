import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormTextarea } from './FormTextarea';

const meta = {
  title: 'Components/Form/Textarea',
  component: FormTextarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Default: Story = {
  args: { placeholder: 'Text' },
  parameters: figma('76-801'),
};

export const WithLabel: Story = {
  args: { label: 'Description', placeholder: 'Enter a description…', helperText: 'Max 500 characters' },
  parameters: figma('76-801'),
};

export const Disabled: Story = {
  args: { label: 'Description', placeholder: 'Text', disabled: true },
  parameters: figma('76-801'),
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Text',
    error: true,
    helperText: 'This field is required',
  },
  parameters: figma('76-801'),
};
