import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav } from './Nav';
import { NavItem } from '../NavItem';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Nav',
  component: Nav,
  parameters: { layout: 'centered', ...figma('673-2323') },
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomItems: Story = {
  render: () => (
    <Nav aria-label="Project navigation">
      <NavItem label="Overview" href="#overview" status="active" />
      <NavItem label="Components" href="#components" />
      <NavItem label="Tokens" href="#tokens" />
      <NavItem label="Documentation" href="#documentation" />
      <NavItem label="Changelog" href="#changelog" />
    </Nav>
  ),
};
