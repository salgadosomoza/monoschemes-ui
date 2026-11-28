import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageActions } from './MessageActions';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2791-144';
const meta = {
  title: 'Agents/Message Actions',
  component: MessageActions,
  args: { role: 'agent' },
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA } },
} satisfies Meta<typeof MessageActions>;
export default meta;
type Story = StoryObj<typeof meta>;
const visibleActions = { onCopy: () => undefined, onRetry: () => undefined, onGoodResponse: () => undefined, onBadResponse: () => undefined, onEdit: () => undefined };
export const Agent: Story = { args: { role: 'agent', className: 'message-actions--visible', ...visibleActions } };
export const User: Story = { args: { role: 'user', className: 'message-actions--visible', ...visibleActions } };
export const Dark: Story = { globals: { theme: 'dark' }, args: { className: 'message-actions--visible', ...visibleActions } };
