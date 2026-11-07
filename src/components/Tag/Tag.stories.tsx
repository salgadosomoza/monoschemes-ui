import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
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
  { label: 'Ash Fade (default)', color: undefined, textColor: undefined },
  { label: 'Rain Blue', color: '#5A6D7E', textColor: '#FFFFFF' },
  { label: 'Fog Green', color: '#8DA59D', textColor: '#000000' },
  { label: 'Rust Highlight', color: '#B15C4A', textColor: '#FFFFFF' },
  { label: 'Golden Smoke', color: '#D1B475', textColor: '#000000' },
];

export const Colors: Story = {
  parameters: figma('285-4420'),
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SAMPLE_COLORS.map(({ label, color, textColor }) => (
        <span
          key={label}
          style={textColor ? ({ '--tag-label-color': textColor } as CSSProperties) : undefined}
        >
          <Tag label={label} color={color} />
        </span>
      ))}
    </div>
  ),
};
