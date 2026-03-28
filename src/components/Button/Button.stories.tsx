import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonVariant } from './Button';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary'];

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
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual variants ────────────────────────────

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

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

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('3-76'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 16 }}>
      <thead>
        <tr>
          <th />
          <th
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#40444A',
              textAlign: 'center',
              paddingBottom: 8,
            }}
          >
            enabled
          </th>
          <th
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#40444A',
              textAlign: 'center',
              paddingBottom: 8,
            }}
          >
            disabled
          </th>
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: '#40444A',
                paddingRight: 16,
              }}
            >
              {variant}
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} disabled={false} label="Button" />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button variant={variant} disabled={true} label="Button" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
