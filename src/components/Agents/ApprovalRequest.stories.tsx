import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApprovalRequest } from './ApprovalRequest';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2792-287';
const meta = {
  title: 'Agents/Approval Request',
  component: ApprovalRequest,
  args: { title: 'Send this message to the owner?', description: 'The agent wants to use Email · Send. Nothing is sent until you allow it.', preview: <><small>To: owner of Carrer de Verdi, 12</small><span>Hi, I’m interested in the flat. Is it still available for a visit this week?</span></> },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
  tags: ['autodocs'],
} satisfies Meta<typeof ApprovalRequest>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Pending: Story = {};
export const Allowed: Story = { args: { state: 'allowed' } };
export const Denied: Story = { args: { state: 'denied' } };
export const Dark: Story = { globals: { theme: 'dark' } };
