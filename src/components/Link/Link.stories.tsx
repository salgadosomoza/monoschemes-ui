import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import type { LinkType, LinkSize } from './Link';

const TYPES: LinkType[] = ['default', 'icon'];
const SIZES: LinkSize[] = ['small', 'medium', 'large'];

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Shows an icon after the label when type="icon".',
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'Controls font size.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the link.',
    },
    href: {
      control: 'text',
      description: 'URL the link points to.',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank'],
      description: 'Whether the link opens in a new tab.',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Default type ───────────────────────────────────

export const DefaultSmall: Story = {
  args: { type: 'default', size: 'small', label: 'Link' },
  parameters: figma('100-536'),
};

export const DefaultMedium: Story = {
  args: { type: 'default', size: 'medium', label: 'Link' },
  parameters: figma('100-531'),
};

export const DefaultLarge: Story = {
  args: { type: 'default', size: 'large', label: 'Link' },
  parameters: figma('100-526'),
};

// ─── Icon type ──────────────────────────────────────

export const IconSmall: Story = {
  args: { type: 'icon', size: 'small', label: 'Link' },
  parameters: figma('86-503'),
};

export const IconMedium: Story = {
  args: { type: 'icon', size: 'medium', label: 'Link' },
  parameters: figma('86-534'),
};

export const IconLarge: Story = {
  args: { type: 'icon', size: 'large', label: 'Link' },
  parameters: figma('86-552'),
};

// ─── All combinations ───────────────────────────────

export const AllCombinations: Story = {
  parameters: figma('86-502'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 24 }}>
      <thead>
        <tr>
          <th />
          {SIZES.map((size) => (
            <th
              key={size}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                color: '#40444A',
                textAlign: 'center',
                paddingBottom: 8,
              }}
            >
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TYPES.map((type) => (
          <tr key={type}>
            <td
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#40444A',
                paddingRight: 16,
              }}
            >
              {type}
            </td>
            {SIZES.map((size) => (
              <td key={size} style={{ textAlign: 'center' }}>
                <Link type={type} size={size} label="Link" href="#" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
