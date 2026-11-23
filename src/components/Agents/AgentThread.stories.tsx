import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ApprovalRequest } from './ApprovalRequest';
import { AgentStatus } from './AgentStatus';
import { AgentThread } from './AgentThread';
import { Composer } from './Composer';
import { Message } from './Message';
import { ToolCall } from './ToolCall';
import { Suggestions } from './Suggestions';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const meta = {
  title: 'Agents/Thread Layout',
  component: AgentThread,
  args: { layout: 'dedicated', title: 'Assistant', children: <Message role="agent">How can I help?</Message> },
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: `${FIGMA}2793-350` } },
  tags: ['autodocs'],
} satisfies Meta<typeof AgentThread>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dedicated: Story = { render: () => <AgentThread layout="dedicated"><Message role="user" time="09:15">Which of these has a balcony?</Message><Message role="agent" time="09:15">I’m checking the listings now.</Message><ToolCall name="Search the web" summary="checking listings" state="running" /><AgentStatus state="tool" label="Using Search the web…" onStop={() => undefined} /><Composer /></AgentThread> };

export const CompleteTurn: Story = { render: () => <AgentThread layout="dedicated" title="Home assistant">
  <Message role="user" time="09:15">Find flats in Gràcia under €1,400 with a balcony.</Message>
  <AgentStatus state="thinking" onStop={() => undefined} />
  <ToolCall name="Search the web" summary="flats for rent Gràcia balcony" state="done" input="{ area: 'Gràcia', maxPrice: 1400, balcony: true }" result="12 listings found." />
  <ApprovalRequest title="Save these filters?" description="The agent wants to save this search to your account." preview={<span>Gràcia · under €1,400 · balcony</span>} state="allowed" />
  <Message role="agent" time="09:16">I found 12 flats. Three are under €1,200, and two have a terrace as well.</Message>
  <Suggestions suggestions={['Compare the 3 cheapest', 'Show them on a map']} onSelect={() => undefined} />
  <Composer />
</AgentThread> };

export const StopHalfway: Story = { render: () => <AgentThread layout="dedicated"><Message role="user">Compare the three cheapest.</Message><AgentStatus state="streaming" onStop={() => undefined} /><Composer busy onStop={() => undefined} /></AgentThread> };

export const ErrorRecovery: Story = { render: () => <AgentThread layout="dedicated"><Message role="user">Check current availability.</Message><ToolCall name="Search the web" summary="availability request" state="error" result="The search service did not answer." defaultExpanded /><AgentStatus state="error" /><Message role="agent">I couldn’t confirm live availability. You can retry or check the listing directly.</Message><Composer /></AgentThread> };

function PanelExample() {
  const [open, setOpen] = useState(true);
  return <div style={{ minHeight: '600px', background: 'var(--color-bg-surface)' }}>
    {open && <div style={{ padding: 'var(--spacing-md)' }}>Product page content remains interactive beside the assistant.</div>}
    <AgentThread layout="panel" open={open} onClose={() => setOpen(false)}>
      <Message role="user" time="09:15">Write to the owner of the Verdi flat and ask for a visit this week.</Message>
      <Message role="agent" time="09:15">Here is the message. I’ll send it as soon as you allow it.</Message>
      <ApprovalRequest title="Send this message to the owner?" description="The agent wants to use Email · Send. Nothing is sent until you allow it." preview={<span>Hi, I’m interested in the flat. Is it still available for a visit this week?</span>} />
      <AgentStatus state="approval" label="Waiting for your approval" />
      <Composer />
    </AgentThread>
  </div>;
}
export const SidePanel: Story = { render: () => <PanelExample />, parameters: { design: { type: 'figma', url: `${FIGMA}2793-567` } } };
export const MobilePanel375: Story = {
  render: () => <div className="agents-story__mobile-panel"><AgentThread layout="panel" onClose={() => undefined}><Message role="user">Find me a quiet flat near the park.</Message><Message role="agent">I can help with that. What is your budget?</Message><Composer /></AgentThread></div>,
  parameters: { ...SidePanel.parameters },
};
export const Dark: Story = { globals: { theme: 'dark' }, render: () => <AgentThread layout="dedicated"><Message role="agent">Your assistant is ready.</Message><Composer /></AgentThread> };
