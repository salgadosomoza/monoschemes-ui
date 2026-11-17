import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineNotification } from './InlineNotification';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Notification/InlineNotification',
  component: InlineNotification,
  tags: ['autodocs'],
  args: { message: 'Changes saved.' },
  parameters: {
    layout: 'padded',
    ...figma('492-2172'),
    docs: {
      description: {
        component: 'Visual check: Default and Error with one line should measure 56 px tall, with the first line centered against the 24 px icon. Verify the alignment and height in Light, Dark, and inside a data-theme="inverse" zone.',
      },
    },
  },
  argTypes: {
    message: { control: 'text' },
    type: { control: 'inline-radio', options: ['default', 'error'] },
  },
} satisfies Meta<typeof InlineNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultDark: Story = { ...Default, globals: { theme: 'dark' } };
export const DefaultInverse: Story = {
  ...Default,
  parameters: { ...figma('492-2172') },
  render: (args) => <div data-theme="inverse" style={{ padding: 24 }}><InlineNotification {...args} /></div>,
};

export const Error: Story = {
  args: { type: 'error' },
  parameters: { ...figma('2545-354') },
};
export const ErrorDark: Story = { ...Error, globals: { theme: 'dark' } };
export const ErrorInverse: Story = {
  ...Error,
  parameters: { ...figma('2545-354') },
  render: (args) => <div data-theme="inverse" style={{ padding: 24 }}><InlineNotification {...args} /></div>,
};

export const LongMessage: Story = {
  args: { message: 'This message stays visible beside the form while the user works. It can wrap across multiple lines without obscuring the controls.' },
};
