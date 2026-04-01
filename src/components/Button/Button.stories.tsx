import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonVariant } from './Button';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary'];

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/Button',
  component: Button,
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
    disabled: {
      control: 'boolean',
      description: 'Renders the button in a disabled state.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the button.',
    },
    iconName: {
      control: 'text',
      description: 'Material Symbols icon name (e.g. "chevron_right", "arrow_forward", "download").',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the label.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic variants ─────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', disabled: false, label: 'Button' },
  parameters: figma('3-75'),
};

export const Secondary: Story = {
  args: { variant: 'secondary', disabled: false, label: 'Button' },
  parameters: figma('3-77'),
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, label: 'Button' },
  parameters: figma('6-288'),
};

// ─── Icon variants ──────────────────────────────────

export const PrimaryWithIconLeft: Story = {
  args: { variant: 'primary', label: 'Button', iconName: 'chevron_left', iconPosition: 'left' },
  parameters: figma('3-76'),
};

export const PrimaryWithIconRight: Story = {
  args: { variant: 'primary', label: 'Button', iconName: 'chevron_right', iconPosition: 'right' },
  parameters: figma('3-76'),
};

export const SecondaryWithIconLeft: Story = {
  args: { variant: 'secondary', label: 'Button', iconName: 'chevron_left', iconPosition: 'left' },
  parameters: figma('3-76'),
};

export const SecondaryWithIconRight: Story = {
  args: { variant: 'secondary', label: 'Button', iconName: 'chevron_right', iconPosition: 'right' },
  parameters: figma('3-76'),
};

export const DisabledWithIcon: Story = {
  args: { variant: 'primary', disabled: true, label: 'Button', iconName: 'chevron_right', iconPosition: 'right' },
  parameters: figma('3-76'),
};

export const WithDownloadIcon: Story = {
  args: { variant: 'secondary', label: 'Download', iconName: 'download', iconPosition: 'left' },
  parameters: figma('3-76'),
};

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('3-76'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 16 }}>
      <thead>
        <tr>
          <th />
          {(['no icon', 'icon left', 'icon right', 'disabled'] as const).map(col => (
            <th key={col} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#40444A', textAlign: 'center', paddingBottom: 8 }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#40444A', paddingRight: 16 }}>
              {variant}
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} label="Button" />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} label="Button" iconName="chevron_left" iconPosition="left" />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} label="Button" iconName="chevron_right" iconPosition="right" />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} disabled label="Button" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
