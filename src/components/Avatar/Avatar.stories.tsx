import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import type { AvatarShape, AvatarType } from './Avatar';

const TYPES: AvatarType[] = ['icon', 'initials', 'image'];
const SHAPES: AvatarShape[] = ['round', 'square'];
const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Determines the avatar content.',
    },
    shape: {
      control: 'select',
      options: SHAPES,
      description: 'Round for a person avatar or square for an object or brand mark.',
    },
    size: { control: 'select', options: SIZES, description: 'Avatar diameter: 32, 48, or 64 pixels.' },
    initials: {
      control: 'text',
      description: 'Text shown when type="initials".',
      if: { arg: 'type', eq: 'initials' },
    },
    src: {
      control: 'text',
      description: 'Image URL when type="image".',
      if: { arg: 'type', eq: 'image' },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image.',
      if: { arg: 'type', eq: 'image' },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: FIGMA_BASE + nodeId },
});

export const IconRound: Story = {
  args: { type: 'icon', shape: 'round', size: 'lg' },
  parameters: figma('2-34'),
};

export const IconSquare: Story = {
  args: { type: 'icon', shape: 'square', size: 'lg' },
  parameters: figma('206-1489'),
};

export const InitialsRound: Story = {
  args: { type: 'initials', shape: 'round', size: 'lg', initials: 'WM' },
  parameters: figma('2-33'),
};

export const InitialsSquare: Story = {
  args: { type: 'initials', shape: 'square', size: 'lg', initials: 'WM' },
  parameters: figma('206-1493'),
};

export const ImageRound: Story = {
  args: { type: 'image', shape: 'round', size: 'lg' },
  parameters: figma('4-217'),
};

export const ImageSquare: Story = {
  args: { type: 'image', shape: 'square', size: 'lg' },
  parameters: figma('206-1495'),
};

export const AllCombinations: Story = {
  parameters: figma('2-35'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 24 }}>
      <thead>
        <tr>
          <th />
          {SIZES.flatMap((size) => SHAPES.map((shape) => (
            <th
              key={size + '-' + shape}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                paddingBottom: 8,
              }}
            >
              {size} · {shape}
            </th>
          )))}
        </tr>
      </thead>
      <tbody>
        {TYPES.map((type) => (
          <tr key={type}>
            <td
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                paddingRight: 16,
              }}
            >
              {type}
            </td>
            {SIZES.flatMap((size) => SHAPES.map((shape) => (
              <td key={size + '-' + shape} style={{ textAlign: 'center' }}>
                <Avatar type={type} shape={shape} size={size} />
              </td>
            )))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Dark: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 24, background: 'var(--color-bg-page)' }}>
      <Avatar type="initials" shape="round" initials="WM" />
      <Avatar type="initials" shape="square" initials="WM" />
    </div>
  ),
};
