import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormDate } from './FormDate';

const meta = {
  title: 'Components/Form/Date', component: FormDate, parameters: { layout: 'centered' }, tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Format: DD/MM/YYYY' }, min: { control: 'text' }, max: { control: 'text' },
    disabled: { control: 'boolean' }, label: { control: 'text' }, open: { control: 'boolean' }, defaultOpen: { control: 'boolean' },
    locale: { control: 'text' }, error: { control: 'boolean' },
  },
} satisfies Meta<typeof FormDate>;
export default meta;
type Story = StoryObj<typeof meta>;
const figma = { design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=1441-422' } };

export const Empty: Story = { args: { label: 'Date' }, parameters: figma };
export const Filled: Story = { args: { label: 'Date', value: '28/03/2026' }, parameters: figma };
export const Focused: Story = {
  args: { label: 'Date' }, parameters: figma,
  play: async ({ canvasElement }) => { canvasElement.querySelector<HTMLInputElement>('.form-date-input')?.focus(); },
};
export const Open: Story = { args: { label: 'Date', defaultOpen: true }, parameters: figma };
export const Disabled: Story = { args: { label: 'Date', disabled: true }, parameters: figma };
export const Error: Story = { args: { label: 'Date', value: '31/02/2026', error: true }, parameters: figma };

export const EmptyDark: Story = { ...Empty, globals: { theme: 'dark' } };
export const FilledDark: Story = { ...Filled, globals: { theme: 'dark' } };
export const FocusedDark: Story = { ...Focused, globals: { theme: 'dark' } };
export const OpenDark: Story = { ...Open, globals: { theme: 'dark' } };
export const DisabledDark: Story = { ...Disabled, globals: { theme: 'dark' } };
export const ErrorDark: Story = { ...Error, globals: { theme: 'dark' } };
