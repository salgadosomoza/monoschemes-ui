import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import type { AvatarType, AvatarVariant } from './Avatar';

const TYPES: AvatarType[] = ['icon', 'initials', 'image'];
const VARIANTS: AvatarVariant[] = ['round', 'rounded', 'square'];
const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Determines the avatar content.',
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Controls the border-radius shape (maps from Figma "style").',
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

// ─── Individual variants ────────────────────────────

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const IconRound: Story = {
  args: { type: 'icon', variant: 'round', size: 'lg' },
  parameters: figma('2-34'),
};

export const IconRounded: Story = {
  args: { type: 'icon', variant: 'rounded', size: 'lg' },
  parameters: figma('206-1479'),
};

export const IconSquare: Story = {
  args: { type: 'icon', variant: 'square', size: 'lg' },
  parameters: figma('206-1489'),
};

export const InitialsRound: Story = {
  args: { type: 'initials', variant: 'round', size: 'lg', initials: 'WM' },
  parameters: figma('2-33'),
};

export const InitialsRounded: Story = {
  args: { type: 'initials', variant: 'rounded', size: 'lg', initials: 'WM' },
  parameters: figma('206-1483'),
};

export const InitialsSquare: Story = {
  args: { type: 'initials', variant: 'square', size: 'lg', initials: 'WM' },
  parameters: figma('206-1493'),
};

export const ImageRound: Story = {
  args: { type: 'image', variant: 'round', size: 'lg' },
  parameters: figma('4-217'),
};

export const ImageRounded: Story = {
  args: { type: 'image', variant: 'rounded', size: 'lg' },
  parameters: figma('206-1485'),
};

export const ImageSquare: Story = {
  args: { type: 'image', variant: 'square', size: 'lg' },
  parameters: figma('206-1495'),
};

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('2-35'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 24 }}>
      <thead>
        <tr>
          <th />
          {SIZES.flatMap((size) => VARIANTS.map((variant) => (
            <th
              key={`${size}-${variant}`}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                paddingBottom: 8,
              }}
            >
              {size} · {variant}
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
            {SIZES.flatMap((size) => VARIANTS.map((variant) => (
              <td key={`${size}-${variant}`} style={{ textAlign: 'center' }}>
                <Avatar type={type} variant={variant} size={size} />
              </td>
            )))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
