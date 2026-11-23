import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Composer } from './Composer';
import { Message } from './Message';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2792-514';
const meta = {
  title: 'Agents/Composer',
  component: Composer,
  args: { showHint: true },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
  tags: ['autodocs'],
} satisfies Meta<typeof Composer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Focused: Story = { render: () => <FocusedComposer /> };
export const Filled: Story = { args: { defaultValue: 'Which of these flats has a balcony?', attachments: [{ id: 'a', name: 'floor-plan.pdf' }] } };
export const Busy: Story = { args: { busy: true } };
function VoiceExample() {
  const [active, setActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sent, setSent] = useState('');
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setTranscript('and also check if any of them has a balcony'), 900);
    return () => window.clearTimeout(timer);
  }, [active]);
  const endVoice = () => {
    if (transcript) setSent(transcript);
    setTranscript('');
    setActive(false);
  };
  return <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
    {sent && <Message role="user">{sent}</Message>}
    <Composer voiceActive={active} transcript={transcript} level={0.7} onVoiceStart={() => { setTranscript(''); setActive(true); }} onVoiceEnd={endVoice} onSend={(message) => setSent(message)} />
  </div>;
}
export const Voice: Story = { render: () => <VoiceExample /> };
export const Dark: Story = { globals: { theme: 'dark' }, args: { defaultValue: 'Which of these flats has a balcony?' } };

function FocusedComposer() {
  useEffect(() => {
    document.querySelector<HTMLTextAreaElement>('.agents-story__focused textarea')?.focus();
  }, []);
  return <Composer className="agents-story__focused" />;
}
