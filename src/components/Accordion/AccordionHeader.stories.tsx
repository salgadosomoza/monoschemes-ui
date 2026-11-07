import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { AccordionHeader } from './AccordionHeader';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/Accordion/AccordionHeader',
  component: AccordionHeader,
  parameters: { layout: 'padded', ...figma('1684-482') },
  tags: ['autodocs'],
  args: { children: 'Section title', expanded: false, disabled: false },
  argTypes: {
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof AccordionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

function HeaderWrapper(props: ComponentProps<typeof AccordionHeader>) {
  return (
    <div className="accordion-item" style={{ maxWidth: 480 }}>
      <AccordionHeader {...props} />
    </div>
  );
}

export const Default: Story = {
  parameters: figma('1684-457'),
  args: { expanded: false, disabled: false, children: 'Section title' },
  render: (args) => <HeaderWrapper {...args} />,
};

export const Expanded: Story = {
  parameters: figma('1684-467'),
  args: { expanded: true, disabled: false, children: 'Section title' },
  render: (args) => <HeaderWrapper {...args} />,
};

export const Disabled: Story = {
  parameters: figma('1684-477'),
  args: { expanded: false, disabled: true, children: 'Section title' },
  render: (args) => (
    <div className="accordion-item" data-disabled="" style={{ maxWidth: 480 }}>
      <AccordionHeader {...args} />
    </div>
  ),
};

export const AllHeaderStates: Story = {
  render: () => (
    <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <HeaderWrapper expanded={false}>Default (collapsed)</HeaderWrapper>
      <HeaderWrapper expanded>Default (expanded)</HeaderWrapper>
      <div className="accordion-item" data-disabled="">
        <AccordionHeader expanded={false} disabled>Disabled</AccordionHeader>
      </div>
    </div>
  ),
};
