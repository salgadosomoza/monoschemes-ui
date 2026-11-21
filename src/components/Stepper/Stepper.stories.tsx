import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '.';

const steps = [{ label: 'Account', description: 'Create your profile' }, { label: 'Details', description: 'Add your information' }, { label: 'Review', description: 'Check everything' }, { label: 'Complete' }];
const meta = { title: 'Navigation/Stepper', component: Stepper, tags: ['autodocs'], parameters: { layout: 'padded', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2505-345' } } } satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: { steps, current: 1 } };
export const Vertical: Story = { args: { steps, current: 2, orientation: 'vertical' }, parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2505-281' } } };
export const WithError: Story = { args: { steps: [...steps.slice(0, 2), { label: 'Review', description: 'Needs attention', state: 'error' as const }, steps[3]], current: 1 } };
export const HorizontalDark: Story = { ...Horizontal, globals: { theme: 'dark' } };
