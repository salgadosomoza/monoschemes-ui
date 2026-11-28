import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';
import type { ImageRatio } from './Image';

const RATIOS: ImageRatio[] = ['1:1', '16:9', '9:16', '5:4', '4:5', '4:3', '3:4', '3:2', '2:3'];

const NODE_ID: Record<ImageRatio, string> = {
  '1:1':  '86-216',
  '16:9': '86-218',
  '9:16': '86-222',
  '5:4':  '86-226',
  '4:5':  '86-230',
  '4:3':  '86-234',
  '3:4':  '86-238',
  '3:2':  '86-242',
  '2:3':  '86-246',
};

const meta = {
  title: 'Data display/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { table: { disable: true } },
    ratio: {
      control: 'select',
      options: RATIOS,
      description: 'Aspect ratio of the image frame.',
    },
    src: {
      control: 'text',
      description: 'Image URL. When omitted, renders a placeholder.',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image element.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the photo placeholder icon when no src is provided.',
    },
    width: {
      control: 'text',
      description: 'Width of the image frame.',
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Individual ratio stories ───────────────────────

export const Ratio1x1: Story = {
  args: { ratio: '1:1', width: '200px' },
  parameters: figma(NODE_ID['1:1']),
};

export const Ratio16x9: Story = {
  args: { ratio: '16:9', width: '360px' },
  parameters: figma(NODE_ID['16:9']),
};

export const Ratio9x16: Story = {
  args: { ratio: '9:16', width: '180px' },
  parameters: figma(NODE_ID['9:16']),
};

export const Ratio5x4: Story = {
  args: { ratio: '5:4', width: '200px' },
  parameters: figma(NODE_ID['5:4']),
};

export const Ratio4x5: Story = {
  args: { ratio: '4:5', width: '200px' },
  parameters: figma(NODE_ID['4:5']),
};

export const Ratio4x3: Story = {
  args: { ratio: '4:3', width: '200px' },
  parameters: figma(NODE_ID['4:3']),
};

export const Ratio3x4: Story = {
  args: { ratio: '3:4', width: '180px' },
  parameters: figma(NODE_ID['3:4']),
};

export const Ratio3x2: Story = {
  args: { ratio: '3:2', width: '200px' },
  parameters: figma(NODE_ID['3:2']),
};

export const Ratio2x3: Story = {
  args: { ratio: '2:3', width: '180px' },
  parameters: figma(NODE_ID['2:3']),
};

// ─── All ratios overview ────────────────────────────

export const AllRatios: Story = {
  parameters: figma('86-217'),
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, maxWidth: 720, alignItems: 'flex-end' }}>
      {RATIOS.map((ratio) => (
        <div key={ratio} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Image ratio={ratio} width="100px" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)' }}>
            {ratio}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─── With real image ────────────────────────────────

export const WithImage: Story = {
  parameters: figma('86-218'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['16:9', '1:1', '4:3'] as ImageRatio[]).map((ratio) => (
        <div key={ratio} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Image
            ratio={ratio}
            width="320px"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640"
            alt="Mountain landscape"
          />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)' }}>
            {ratio} · with src
          </span>
        </div>
      ))}
    </div>
  ),
};
