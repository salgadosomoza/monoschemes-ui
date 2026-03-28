import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithIcon } from './ButtonWithIcon';
import type { ButtonWithIconVariant, ButtonWithIconPosition } from './ButtonWithIcon';

const VARIANTS: ButtonWithIconVariant[] = ['primary', 'secondary'];
const POSITIONS: ButtonWithIconPosition[] = ['left', 'right'];

const meta = {
  title: 'Components/ButtonWithIcon',
  component: ButtonWithIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Visual style of the button.',
    },
    iconPosition: {
      control: 'select',
      options: POSITIONS,
      description: 'Side of the label where the icon is placed.',
    },
    disabled: {
      control: 'boolean',
      description: 'Renders the button in a disabled state.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the button.',
    },
  },
} satisfies Meta<typeof ButtonWithIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const PrimaryIconLeft: Story = {
  args: { variant: 'primary', iconPosition: 'left', disabled: false, label: 'Button' },
  parameters: figma('434-2519'),
};

export const PrimaryIconRight: Story = {
  args: { variant: 'primary', iconPosition: 'right', disabled: false, label: 'Button' },
  parameters: figma('434-2496'),
};

export const SecondaryIconLeft: Story = {
  args: { variant: 'secondary', iconPosition: 'left', disabled: false, label: 'Button' },
  parameters: figma('434-2610'),
};

export const SecondaryIconRight: Story = {
  args: { variant: 'secondary', iconPosition: 'right', disabled: false, label: 'Button' },
  parameters: figma('434-2498'),
};

export const DisabledIconLeft: Story = {
  args: { variant: 'primary', iconPosition: 'left', disabled: true, label: 'Button' },
  parameters: figma('434-2618'),
};

export const DisabledIconRight: Story = {
  args: { variant: 'primary', iconPosition: 'right', disabled: true, label: 'Button' },
  parameters: figma('434-2500'),
};

export const AllCombinations: Story = {
  parameters: figma('434-2495'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 16 }}>
      <thead>
        <tr>
          <th />
          {POSITIONS.map((pos) => (
            <th
              key={pos}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#40444A', textAlign: 'center', paddingBottom: 8 }}
            >
              icon {pos}
            </th>
          ))}
          <th style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#40444A', textAlign: 'center', paddingBottom: 8 }}>
            disabled
          </th>
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', paddingRight: 16 }}>
              {variant}
            </td>
            {POSITIONS.map((iconPosition) => (
              <td key={iconPosition} style={{ textAlign: 'center' }}>
                <ButtonWithIcon variant={variant} iconPosition={iconPosition} label="Button" />
              </td>
            ))}
            <td style={{ textAlign: 'center' }}>
              <ButtonWithIcon variant={variant} disabled label="Button" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
