import type { Meta, StoryObj } from '@storybook/react-vite';
import { Message } from './Message';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2791-202';
const meta = {
  title: 'Agents/Message',
  component: Message,
  args: { role: 'agent', children: 'I found 12 flats for rent in Gràcia under €1,400. The three cheapest are near Fontana. Do you want me to compare them?', time: '09:15' },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
} satisfies Meta<typeof Message>;
export default meta;
type Story = StoryObj<typeof meta>;
export const AgentTurn: Story = { args: { className: 'agents-story__message' } };
export const Conversation: Story = {
  render: () => <div className="agents-story__conversation">
    <Message role="agent" author="Agent" time="09:15" showActions><span>Here are three options. Do you want to compare them?</span></Message>
    <Message role="user" time="09:16" showActions><span>Which one has a balcony?</span></Message>
    <Message role="system">Conversation started · Today, 09:14</Message>
  </div>,
};
export const Dark: Story = { globals: { theme: 'dark' } };
