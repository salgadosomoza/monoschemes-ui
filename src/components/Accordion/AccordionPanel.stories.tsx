import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionPanel } from './AccordionPanel';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/Accordion/AccordionPanel',
  component: AccordionPanel,
  parameters: { layout: 'padded', ...figma('1687-461') },
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
    This is the accordion panel content. It can contain text, images, forms, or nested components.
  </p>
);

export const Collapsed: Story = {
  args: { expanded: false, children: content },
};

export const Expanded: Story = {
  args: { expanded: true, children: content },
};
