import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormPassword } from '../src/components/FormPassword';

const meta = { title: 'Components/Form/Password', component: FormPassword, tags: ['autodocs'], parameters: { layout: 'centered', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2502-814' } } } satisfies Meta<typeof FormPassword>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Password', placeholder: 'Enter password', helperText: 'Use at least 8 characters' } };
export const WithValue: Story = { args: { label: 'Password', value: 'mono-schemes', placeholder: 'Password' } };
export const Visible: Story = { args: { label: 'Password', value: 'mono-schemes', visible: true } };
export const Error: Story = { args: { label: 'Password', value: 'short', error: true, helperText: 'Password is too short' } };
export const DefaultDark: Story = { ...Default, globals: { theme: 'dark' } };
