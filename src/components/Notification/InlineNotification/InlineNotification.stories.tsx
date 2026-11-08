import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineNotification } from './InlineNotification';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Notification/InlineNotification',
  component: InlineNotification,
  parameters: { layout: 'padded', ...figma('492-2172') },
  tags: ['autodocs'],
  args: { message: 'Volutpat felis mattis risus mauris id aenean nascetur aliquam.' },
  argTypes: { message: { control: 'text' } },
} satisfies Meta<typeof InlineNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongMessage: Story = {
  args: { message: 'This message stays visible beside the form while the user works. It can wrap across multiple lines without obscuring the controls.' },
};
