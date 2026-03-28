import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import type { TextStyle } from './Text';

const STYLES: TextStyle[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle-1', 'subtitle-2',
  'body-1', 'body-2',
  'caption', 'overline',
];

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: STYLES,
      description: 'Typography style — maps to Figma style variants.',
    },
    color: {
      control: 'color',
      description: 'CSS color override.',
    },
    as: {
      control: 'text',
      description: 'HTML tag override (e.g. "div", "label").',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const SAMPLE = 'Above five feet square';

// ─── Individual style stories ───────────────────────

export const H1: Story = {
  args: { style: 'h1', children: SAMPLE },
  parameters: figma('130-1707'),
};

export const H2: Story = {
  args: { style: 'h2', children: SAMPLE },
  parameters: figma('130-1751'),
};

export const H3: Story = {
  args: { style: 'h3', children: SAMPLE },
  parameters: figma('130-1754'),
};

export const H4: Story = {
  args: { style: 'h4', children: SAMPLE },
  parameters: figma('130-1757'),
};

export const H5: Story = {
  args: { style: 'h5', children: SAMPLE },
  parameters: figma('130-1760'),
};

export const H6: Story = {
  args: { style: 'h6', children: SAMPLE },
  parameters: figma('130-1763'),
};

export const Subtitle1: Story = {
  args: { style: 'subtitle-1', children: SAMPLE },
  parameters: figma('130-1765'),
};

export const Subtitle2: Story = {
  args: { style: 'subtitle-2', children: SAMPLE },
  parameters: figma('130-1768'),
};

export const Body1: Story = {
  args: { style: 'body-1', children: SAMPLE },
  parameters: figma('130-1771'),
};

export const Body2: Story = {
  args: { style: 'body-2', children: SAMPLE },
  parameters: figma('130-1782'),
};

export const Caption: Story = {
  args: { style: 'caption', children: SAMPLE },
  parameters: figma('130-1784'),
};

export const Overline: Story = {
  args: { style: 'overline', children: SAMPLE },
  parameters: figma('130-1786'),
};

// ─── All styles overview ────────────────────────────

export const AllStyles: Story = {
  parameters: figma('130-1708'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      {STYLES.map((style) => (
        <div key={style} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              color: '#737373',
              minWidth: 80,
              flexShrink: 0,
            }}
          >
            {style}
          </span>
          <Text style={style}>{SAMPLE}</Text>
        </div>
      ))}
    </div>
  ),
};
