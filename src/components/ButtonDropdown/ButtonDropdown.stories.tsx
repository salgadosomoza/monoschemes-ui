import type { Meta, StoryObj } from '@storybook/react';
import { ButtonDropdown } from './ButtonDropdown';
import type { ButtonDropdownVariant, ButtonDropdownState } from './ButtonDropdown';

const VARIANTS: ButtonDropdownVariant[] = ['primary', 'secondary'];
const STATES: ButtonDropdownState[] = ['default', 'active'];

const meta = {
  title: 'Components/ButtonDropdown',
  component: ButtonDropdown,
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
    state: {
      control: 'select',
      options: STATES,
      description: 'Controls chevron direction and active appearance.',
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
} satisfies Meta<typeof ButtonDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const PrimaryDefault: Story = {
  args: { variant: 'primary', state: 'default', disabled: false, label: 'Button' },
  parameters: figma('251-1385'),
};

export const PrimaryActive: Story = {
  args: { variant: 'primary', state: 'active', disabled: false, label: 'Button' },
  parameters: figma('251-1445'),
};

export const SecondaryDefault: Story = {
  args: { variant: 'secondary', state: 'default', disabled: false, label: 'Button' },
  parameters: figma('251-1389'),
};

export const SecondaryActive: Story = {
  args: { variant: 'secondary', state: 'active', disabled: false, label: 'Button' },
  parameters: figma('251-1469'),
};

export const PrimaryDisabled: Story = {
  args: { variant: 'primary', state: 'default', disabled: true, label: 'Button' },
  parameters: figma('251-1387'),
};

export const AllCombinations: Story = {
  parameters: figma('251-1384'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 16 }}>
      <thead>
        <tr>
          <th />
          {[...STATES, 'disabled'].map((s) => (
            <th
              key={s}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#40444A', textAlign: 'center', paddingBottom: 8 }}
            >
              {s}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', paddingRight: 16 }}>
              {variant}
            </td>
            {STATES.map((state) => (
              <td key={state} style={{ textAlign: 'center' }}>
                <ButtonDropdown variant={variant} state={state} label="Button" />
              </td>
            ))}
            <td style={{ textAlign: 'center' }}>
              <ButtonDropdown variant={variant} disabled label="Button" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
