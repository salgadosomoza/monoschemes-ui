import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../Button';
import { Toast, type ToastType } from '.';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${id}` } });
const figmaNodeByType: Record<ToastType, string> = {
  default: '10-479',
  success: '2612-358',
  warning: '2612-366',
  error: '2612-374',
};

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { message: 'This is a notification message.', isVisible: true, duration: 0 },
  parameters: {
    layout: 'fullscreen',
    ...figma('2612-382'),
    docs: {
      description: {
        component: 'A short-lived notification for transient feedback. Default has no icon; success, warning and error use their designed icon and treatment. Default, success and warning announce politely as status messages; error is announced assertively. The semantic surface, text, border and shadow tokens adapt to Light, Dark and inverse zones. Do not use Toast for required actions or long-form content.',
      },
    },
  },
  argTypes: {
    message: { control: 'text', description: 'Short notification copy.' },
    type: { control: 'select', options: ['default', 'success', 'warning', 'error'], description: 'Visual and accessibility treatment. Defaults to default.' },
    duration: { control: 'number', description: 'Auto-dismiss delay in milliseconds. Defaults to 3000; 0 keeps the toast visible until closed.' },
    isVisible: { control: 'boolean', description: 'Shows the toast. Defaults to false.' },
    onClose: { action: 'closed', description: 'Called when the toast closes automatically or through its close control.' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function toastStory(type: ToastType, figmaNode: string, theme: 'light' | 'dark', inverse = false): Story {
  return {
    args: { type },
    globals: { theme },
    parameters: figma(figmaNode),
    render: (args) => {
      const toast = <Toast {...args} type={type} />;
      return inverse ? <div data-theme="inverse" style={{ minHeight: '100vh' }}>{toast}</div> : toast;
    },
  };
}

export const Default: Story = toastStory('default', figmaNodeByType.default, 'light');
export const DefaultDark: Story = toastStory('default', figmaNodeByType.default, 'dark');
export const DefaultInverse: Story = toastStory('default', figmaNodeByType.default, 'light', true);
export const DefaultInverseDark: Story = toastStory('default', figmaNodeByType.default, 'dark', true);

export const Success: Story = toastStory('success', figmaNodeByType.success, 'light');
export const SuccessDark: Story = toastStory('success', figmaNodeByType.success, 'dark');
export const SuccessInverse: Story = toastStory('success', figmaNodeByType.success, 'light', true);
export const SuccessInverseDark: Story = toastStory('success', figmaNodeByType.success, 'dark', true);

export const Warning: Story = toastStory('warning', figmaNodeByType.warning, 'light');
export const WarningDark: Story = toastStory('warning', figmaNodeByType.warning, 'dark');
export const WarningInverse: Story = toastStory('warning', figmaNodeByType.warning, 'light', true);
export const WarningInverseDark: Story = toastStory('warning', figmaNodeByType.warning, 'dark', true);

export const Error: Story = toastStory('error', figmaNodeByType.error, 'light');
export const ErrorDark: Story = toastStory('error', figmaNodeByType.error, 'dark');
export const ErrorInverse: Story = toastStory('error', figmaNodeByType.error, 'light', true);
export const ErrorInverseDark: Story = toastStory('error', figmaNodeByType.error, 'dark', true);

function AutoDismissExample() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ minHeight: '100vh', padding: 16 }}>
      <Button label="Show Toast" onClick={() => setVisible(true)} />
      <Toast message="Auto-dismisses in 3 seconds" isVisible={visible} duration={3000} onClose={() => setVisible(false)} />
    </div>
  );
}

export const AutoDismiss: Story = {
  args: { message: 'Auto-dismisses in 3 seconds', duration: 3000 },
  render: () => <AutoDismissExample />,
  parameters: figma('2612-382'),
};

export const Persistent: Story = {
  args: { message: 'This toast will not auto-dismiss.', duration: 0 },
  parameters: figma('2612-382'),
};
