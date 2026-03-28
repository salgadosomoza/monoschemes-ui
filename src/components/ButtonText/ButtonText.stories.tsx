import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonText } from './ButtonText';
import type { ButtonTextState } from './ButtonText';

const STATES: ButtonTextState[] = ['default', 'disabled'];

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
      description: 'Visual/interactive state of the button.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the button.',
    },
  },
} satisfies Meta<typeof ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Default: Story = {
  args: { state: 'default', label: 'Button' },
  parameters: figma('76-809'),
};

export const Disabled: Story = {
  args: { state: 'disabled', label: 'Button' },
  parameters: figma('76-813'),
};

export const AllCombinations: Story = {
  parameters: figma('76-808'),
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {STATES.map((state) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ButtonText state={state} label="Button" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A' }}>
            {state}
          </span>
        </div>
      ))}
    </div>
  ),
};
