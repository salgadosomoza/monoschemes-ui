import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentMark } from './AgentMark';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2790-123';
const meta = {
  title: 'Agents/Agent Mark',
  component: AgentMark,
  args: { state: 'idle', size: 'sm', level: 0.6 },
  parameters: { layout: 'centered', design: { type: 'figma', url: FIGMA }, docs: { description: { component: 'Monochrome agent identity mark. Thinking rotates slowly; listening and speaking bars follow the supplied audio level. Reduced motion disables the rotation.' } } },
  tags: ['autodocs'],
} satisfies Meta<typeof AgentMark>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const States: Story = {
  render: () => <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
    <AgentMark state="idle" />
    <AgentMark state="thinking" />
    <AgentMark state="listening" level={0.65} />
    <AgentMark state="speaking" size="md" level={0.9} />
    <AgentMark state="idle" size="lg" />
  </div>,
};
export const Dark: Story = { globals: { theme: 'dark' } };
