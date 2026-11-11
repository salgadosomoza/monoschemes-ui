import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast } from '../../src/components/Notification/Toast';

const meta = {
  title: 'Components/Notification/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A short-lived confirmation such as “Changes saved”. It appears briefly and dismisses itself; do not put required actions or long-form content in a toast. The surface uses semantic page, text, border and shadow tokens, so it adapts to the active theme.\n\n`message` is the Figma text property. The React API adds `type`, `duration`, `isVisible` and `onClose`; setting `duration` to 0 disables automatic dismissal. The current Figma component documents the default appearance; `type` is an implementation extension and does not change the visual treatment yet.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Short notification copy, matching the Figma message property.' },
    type: { control: 'select', options: ['default', 'success', 'error', 'warning'], description: 'React extension. Currently does not alter the visual token treatment.' },
    duration: { control: 'number', description: 'Auto-dismiss delay in milliseconds. Defaults to 3000; 0 keeps the toast visible until closed.' },
    isVisible: { control: 'boolean', description: 'Shows the toast. Defaults to false.' },
    onClose: { action: 'closed', description: 'Called when the toast closes automatically or through its close control.' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

export const Default: Story = {
  args: { message: 'This is a notification message.', isVisible: true, duration: 0 },
  parameters: figma('10-479'),
};

export const AutoDismiss: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div>
        <button onClick={() => setVisible(true)} style={{ margin: 16 }}>Show Toast</button>
        <Toast message="Auto-dismisses in 3 seconds" isVisible={visible} duration={3000} onClose={() => setVisible(false)} />
      </div>
    );
  },
  parameters: figma('10-479'),
};

export const Persistent: Story = {
  args: { message: 'This toast will not auto-dismiss.', isVisible: true, duration: 0 },
  parameters: figma('10-479'),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      {(['default', 'success', 'error', 'warning'] as const).map(type => (
        <Toast key={type} message={`Toast type: ${type}`} type={type} isVisible duration={0} />
      ))}
    </div>
  ),
  parameters: { layout: 'centered', ...figma('10-479') },
};
