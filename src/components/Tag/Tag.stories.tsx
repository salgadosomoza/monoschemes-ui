import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import type { TagType } from './Tag';

const TYPES: TagType[] = ['default'];

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Tag variant type.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the tag.',
    },
    color: {
      control: 'color',
      description: 'Custom background color override.',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Default ────────────────────────────────────────

export const Default: Story = {
  args: { type: 'default', label: 'Tag name' },
  parameters: figma('20-489'),
};

// ─── All combinations ────────────────────────────────

export const AllCombinations: Story = {
  parameters: figma('285-4420'),
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {TYPES.map((type) => (
        <Tag key={type} type={type} label="Tag name" />
      ))}
    </div>
  ),
};

// ─── Colors ──────────────────────────────────────────

const SAMPLE_COLORS = [
  { label: 'Ash Fade (default)', color: undefined },
  { label: 'Rain Blue', color: '#5A6D7E' },
  { label: 'Fog Green', color: '#8DA59D' },
  { label: 'Rust Highlight', color: '#B15C4A' },
  { label: 'Golden Smoke', color: '#D1B475' },
];

export const Colors: Story = {
  parameters: figma('285-4420'),
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SAMPLE_COLORS.map(({ label, color }) => (
        <Tag key={label} label={label} color={color} />
      ))}
    </div>
  ),
};
