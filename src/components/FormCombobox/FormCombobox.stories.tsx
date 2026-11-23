import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormCombobox } from './FormCombobox';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Forms/Combobox',
  component: FormCombobox,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'A searchable single-select field. It accepts only values from its options; use FormMultiSelect for multiple values. Filtering matches the start of any word, ignoring case and accents.' } },
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    query: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof FormCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'example-studio', label: 'Example Studio' },
  { value: 'cafe-norte', label: 'Café Norte' },
  { value: 'design-system', label: 'Design System Team' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'disabled', label: 'Disabled option', disabled: true },
  { value: 'research', label: 'Research' },
];

export const Default: Story = { args: { options, label: 'Team', placeholder: 'Search', helperText: 'Choose one team' }, parameters: figma('2741-1637') };
export const WithValue: Story = { args: { options, label: 'Team', defaultValue: 'mar-sala' }, parameters: figma('2741-1637') };
export const Disabled: Story = { args: { options, label: 'Team', disabled: true }, parameters: figma('2741-1637') };
export const Error: Story = { args: { options, label: 'Team', error: true, helperText: 'Choose a valid team' }, parameters: figma('2741-1637') };
export const Open: Story = {
  args: { options, label: 'Team', placeholder: 'Search' },
  parameters: figma('2741-1682'),
  play: async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole('combobox')); },
};
export const NoMatches: Story = {
  args: { options, label: 'Team', query: 'unknown', loading: false },
  parameters: figma('2741-1682'),
  render: (args) => <FormCombobox {...args} />,
  play: async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole('combobox')); },
};
export const Loading: Story = {
  args: { options: [], label: 'Team', query: 'mar', loading: true },
  parameters: figma('2741-1682'),
  play: async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole('combobox')); },
};
export const Dark: Story = { args: { options, label: 'Team', placeholder: 'Search' }, globals: { theme: 'dark' }, parameters: figma('2741-1705') };
export const Inverse: Story = {
  args: { options, label: 'Team', placeholder: 'Search' },
  render: (args) => <div data-theme="inverse" style={{ padding: 'var(--spacing-xl)' }}><FormCombobox {...args} /></div>,
};
export const WithFieldLabelAndHelper: Story = {
  args: { options, label: 'Assignee', helperText: 'Select one person from the list.' },
  parameters: { docs: { description: { story: 'Form/Field is a Figma-only mapping. FormCombobox exposes the matching label, helperText, and error props directly; no extra React wrapper is needed.' } } },
};
