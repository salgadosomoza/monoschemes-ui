import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormTime } from '.';

const meta = { title: 'Forms/Time', component: FormTime, tags: ['autodocs'], parameters: { layout: 'centered', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2504-904' } } } satisfies Meta<typeof FormTime>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Time', min: '09:00', max: '17:00', helperText: 'Choose a time between 9:00 and 17:00' } };
export const Open: Story = { args: { label: 'Time', value: '10:30', defaultOpen: true, minuteStep: 5 } };
export const Error: Story = { args: { label: 'Time', error: true, helperText: 'Enter a valid time' } };
export const DefaultDark: Story = { ...Default, globals: { theme: 'dark' } };
