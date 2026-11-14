import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { tone: { control: 'select', options: ['default', 'muted'] } },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;
const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2429-762';
const design = { design: { type: 'figma', url: FIGMA } };

export const Default: Story = { args: { label: 'Downloads', value: '660', unit: 'Mbps' }, parameters: design };
export const DefaultDark: Story = { args: { label: 'Downloads', value: '660', unit: 'Mbps' }, globals: { theme: 'dark' }, parameters: design };
export const Muted: Story = { args: { label: 'Latency', value: '31', unit: 'ms', tone: 'muted' }, parameters: design };
export const MutedDark: Story = { args: { label: 'Latency', value: '31', unit: 'ms', tone: 'muted' }, globals: { theme: 'dark' }, parameters: design };
export const WithoutUnit: Story = { args: { label: 'Sessions', value: '128' }, parameters: design };
export const WithoutUnitDark: Story = { args: { label: 'Sessions', value: '128' }, globals: { theme: 'dark' }, parameters: design };
