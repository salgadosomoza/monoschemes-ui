import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentStatus } from './AgentStatus';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2790-222';
const meta = {
  title: 'Agents/Agent Status',
  component: AgentStatus,
  args: { state: 'thinking', onStop: () => undefined },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
} satisfies Meta<typeof AgentStatus>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Thinking: Story = { args: { state: 'thinking', label: 'Thinking…' } };
export const States: Story = {
  render: () => <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
    <AgentStatus state="thinking" onStop={() => undefined} />
    <AgentStatus state="tool" label="Using Search the web…" onStop={() => undefined} />
    <AgentStatus state="approval" label="Waiting for your approval" />
    <AgentStatus state="streaming" label="Writing…" onStop={() => undefined} />
    <AgentStatus state="stopped" />
    <AgentStatus state="error" />
  </div>,
};
export const Dark: Story = { globals: { theme: 'dark' } };
