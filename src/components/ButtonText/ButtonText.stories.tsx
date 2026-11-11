import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ButtonText } from './ButtonText';
import type { ButtonTextState } from './ButtonText';

const STATES: ButtonTextState[] = ['default', 'disabled'];

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/ButtonText',
  component: ButtonText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: STATES,
      description: 'Visual/interactive state of the button. Hover, active and focus-visible states are handled natively by CSS.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the button.',
    },
  },
} satisfies Meta<typeof ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { state: 'default', label: 'Button' },
  parameters: figma('76-809'),
};

export const Disabled: Story = {
  args: { state: 'disabled', label: 'Button' },
  parameters: figma('76-813'),
};

export const FocusVisible: Story = {
  args: { state: 'default', label: 'Button' },
  parameters: figma('76-809'),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

// Visual overview of all CSS-native states via simulated inline styles.
// Hover and active colors use semantic tokens so the overview follows the selected theme.
export const AllStates: Story = {
  parameters: figma('76-808'),
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {(
        [
          { label: 'default', style: {} },
          { label: 'hover', style: { color: 'var(--color-text-secondary)', borderBottomColor: 'var(--color-text-secondary)' } },
          { label: 'active', style: { color: 'var(--color-text-primary)', borderBottomColor: 'var(--color-text-primary)' } },
          {
            label: 'focus-visible',
            style: {
              outline: 'none',
              boxShadow: '0 0 0 3px var(--color-border-focused)',
              borderRadius: 'var(--radius-none)',
            },
          },
          { label: 'disabled', disabled: true },
        ] as Array<{ label: string; style?: React.CSSProperties; disabled?: boolean }>
      ).map(({ label, style, disabled }) => (
        <div
          key={label}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <ButtonText
            state={disabled ? 'disabled' : 'default'}
            label="Button"
            style={style}
          />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllCombinations: Story = {
  parameters: figma('76-808'),
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {STATES.map((state) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ButtonText state={state} label="Button" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)' }}>
            {state}
          </span>
        </div>
      ))}
    </div>
  ),
};
