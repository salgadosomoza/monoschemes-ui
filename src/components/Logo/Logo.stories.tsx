import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';
import type { LogoType } from './Logo';

const TYPES: LogoType[] = ['text', 'image'];

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Determines the logo content: text label or image.',
    },
    label: {
      control: 'text',
      description: 'Text label shown when type="text".',
      if: { arg: 'type', eq: 'text' },
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
    href: {
      control: 'text',
      description: 'When provided, wraps the logo in an <a> tag.',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const LogoText: Story = {
  args: { type: 'text', label: 'Logo' },
  parameters: figma('669-1081'),
};

export const LogoImage: Story = {
  args: { type: 'image', alt: 'Logo' },
  parameters: figma('727-2496'),
};

export const AllCombinations: Story = {
  parameters: figma('727-2495'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 24 }}>
      <thead>
        <tr>
          {TYPES.map((t) => (
            <th
              key={t}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                color: '#40444A',
                textAlign: 'center',
                paddingBottom: 8,
              }}
            >
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center' }}>
            <Logo type="text" label="Logo" />
          </td>
          <td style={{ textAlign: 'center' }}>
            <Logo type="image" />
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              color: '#737373',
              textAlign: 'center',
              paddingTop: 8,
            }}
          >
            with href
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>
            <Logo type="text" label="Logo" href="#" />
          </td>
          <td style={{ textAlign: 'center' }}>
            <Logo type="image" href="#" />
          </td>
        </tr>
      </tbody>
    </table>
  ),
};
