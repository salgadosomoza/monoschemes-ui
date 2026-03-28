import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupType, ButtonGroupPosition, ButtonGroupVariant } from './ButtonGroup';

const TYPES: ButtonGroupType[] = ['text', 'icon'];
const POSITIONS: ButtonGroupPosition[] = ['first', 'middle', 'last'];
const VARIANTS: ButtonGroupVariant[] = ['default', 'active'];

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Whether the segment shows a text label or an icon.',
    },
    position: {
      control: 'select',
      options: POSITIONS,
      description: 'Controls border-radius and border collapsing.',
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Default (idle) or active (selected) state.',
    },
    label: {
      control: 'text',
      description: 'Text shown when type="text".',
      if: { arg: 'type', eq: 'text' },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Individual variants ────────────────────────────

export const TextFirstDefault: Story = {
  args: { type: 'text', position: 'first', variant: 'default', label: 'Button' },
  parameters: figma('235-1207'),
};

export const TextMiddleDefault: Story = {
  args: { type: 'text', position: 'middle', variant: 'default', label: 'Button' },
  parameters: figma('37-140'),
};

export const TextLastDefault: Story = {
  args: { type: 'text', position: 'last', variant: 'default', label: 'Button' },
  parameters: figma('235-1209'),
};

export const IconFirstDefault: Story = {
  args: { type: 'icon', position: 'first', variant: 'default' },
  parameters: figma('235-1228'),
};

export const IconMiddleDefault: Story = {
  args: { type: 'icon', position: 'middle', variant: 'default' },
  parameters: figma('235-1232'),
};

export const IconLastDefault: Story = {
  args: { type: 'icon', position: 'last', variant: 'default' },
  parameters: figma('235-1236'),
};

export const TextFirstActive: Story = {
  args: { type: 'text', position: 'first', variant: 'active', label: 'Button' },
  parameters: figma('37-142'),
};

export const TextMiddleActive: Story = {
  args: { type: 'text', position: 'middle', variant: 'active', label: 'Button' },
  parameters: figma('235-1214'),
};

export const TextLastActive: Story = {
  args: { type: 'text', position: 'last', variant: 'active', label: 'Button' },
  parameters: figma('235-1216'),
};

export const IconFirstActive: Story = {
  args: { type: 'icon', position: 'first', variant: 'active' },
  parameters: figma('235-1240'),
};

export const IconMiddleActive: Story = {
  args: { type: 'icon', position: 'middle', variant: 'active' },
  parameters: figma('235-1244'),
};

export const IconLastActive: Story = {
  args: { type: 'icon', position: 'last', variant: 'active' },
  parameters: figma('235-1248'),
};

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('37-141'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {TYPES.map((type) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A' }}>{type}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {VARIANTS.map((variant) => (
              <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', width: 48 }}>{variant}</span>
                <div style={{ display: 'flex' }}>
                  {POSITIONS.map((position) => (
                    <ButtonGroup
                      key={position}
                      type={type}
                      position={position}
                      variant={variant}
                      label="Btn"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
