import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast } from '../../src/components/Notification/Toast';

const meta = {
  title: 'Components/Notification/Toast',
  component: Toast,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'success', 'error', 'warning'] },
    duration: { control: 'number' },
    isVisible: { control: 'boolean' },
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
