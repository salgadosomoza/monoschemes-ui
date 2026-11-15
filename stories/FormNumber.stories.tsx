import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormNumber } from '../src/components/FormNumber';

const meta = { title: 'Components/Form/Number', component: FormNumber, tags: ['autodocs'], parameters: { layout: 'centered', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2502-854' } } } satisfies Meta<typeof FormNumber>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Quantity', defaultValue: 3, min: 0, max: 10, step: 1 } };
export const WithBoundsAndStep: Story = { args: { label: 'Amount', defaultValue: 2.5, min: 0, max: 10, step: 0.5 } };
export const Error: Story = { args: { label: 'Quantity', defaultValue: 1, error: true, helperText: 'Choose a valid quantity' } };
export const DefaultDark: Story = { ...Default, globals: { theme: 'dark' } };
