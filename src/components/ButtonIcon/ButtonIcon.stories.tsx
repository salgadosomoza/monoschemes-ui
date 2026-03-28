import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonIcon } from './ButtonIcon';
import type { ButtonIconVariant, ButtonIconState } from './ButtonIcon';

const VARIANTS: ButtonIconVariant[] = ['primary', 'secondary'];
const STATES: ButtonIconState[] = ['enabled', 'hover', 'disabled'];

const meta = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
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
      description: 'Interactive state of the button.',
    },
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const PrimaryEnabled: Story = {
  args: { variant: 'primary', state: 'enabled' },
  parameters: figma('22-520'),
};

export const PrimaryHover: Story = {
  args: { variant: 'primary', state: 'hover' },
  parameters: figma('1253-1116'),
};

export const SecondaryEnabled: Story = {
  args: { variant: 'secondary', state: 'enabled' },
  parameters: figma('22-524'),
};

export const SecondaryHover: Story = {
  args: { variant: 'secondary', state: 'hover' },
  parameters: figma('1253-1124'),
};

export const PrimaryDisabled: Story = {
  args: { variant: 'primary', state: 'disabled' },
  parameters: figma('22-522'),
};

export const AllCombinations: Story = {
  parameters: figma('22-519'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 16 }}>
      <thead>
        <tr>
          <th />
          {STATES.map((s) => (
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
                {!(variant === 'secondary' && state === 'disabled') && (
                  <ButtonIcon variant={variant} state={state} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
