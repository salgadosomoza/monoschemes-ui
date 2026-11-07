import type { Meta, StoryObj } from '@storybook/react-vite';
import { Item } from './Item';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/Accordion/Item',
  component: Item,
  parameters: { layout: 'padded', ...figma('1690-480') },
  tags: ['autodocs'],
  args: { title: 'Section title', children: 'Accordion panel content.', defaultExpanded: false, disabled: false },
  argTypes: {
    defaultExpanded: { control: 'boolean' },
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  parameters: figma('1690-464'),
  args: { defaultExpanded: false },
};

export const Expanded: Story = {
  parameters: figma('1690-470'),
  args: { defaultExpanded: true },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Figma exposes disabled on Accordion/Item, but the property is not connected to visible layers yet. This story demonstrates the React behavior.',
      },
    },
  },
  args: { disabled: true },
};

export const Interactive: Story = {
  args: { title: 'Click to toggle' },
};
