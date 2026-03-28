import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title text.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (uncontrolled).',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const PANEL_CONTENT = (
  <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
    This is the accordion panel content. It can contain any React nodes —
    text, images, forms, or nested components.
  </p>
);

// ─── Collapsed ──────────────────────────────────────

export const Collapsed: Story = {
  args: { title: 'Section title', defaultOpen: false },
  parameters: figma('86-367'),
  render: (args) => <Accordion {...args}>{PANEL_CONTENT}</Accordion>,
};

// ─── Expanded ───────────────────────────────────────

export const Expanded: Story = {
  args: { title: 'Section title', defaultOpen: true },
  parameters: figma('86-369'),
  render: (args) => <Accordion {...args}>{PANEL_CONTENT}</Accordion>,
};

// ─── All combinations ────────────────────────────────

export const AllCombinations: Story = {
  parameters: figma('86-368'),
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion title="Collapsed" defaultOpen={false}>
        {PANEL_CONTENT}
      </Accordion>
      <Accordion title="Expanded" defaultOpen={true}>
        {PANEL_CONTENT}
      </Accordion>
    </div>
  ),
};

// ─── Interactive: accordion group (one open at a time) ─

export const AccordionGroup: Story = {
  parameters: figma('86-368'),
  render: () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const items = [
      {
        title: 'What is MonoSchemes?',
        content: 'MonoSchemes is a design system built for clarity and consistency across products.',
      },
      {
        title: 'How do I install it?',
        content: 'Run npm install @monoschemes/ui and import the tokens CSS in your app entry point.',
      },
      {
        title: 'Can I customize the theme?',
        content: 'Yes — override the CSS custom properties in your own stylesheet to match your brand.',
      },
    ];

    return (
      <div style={{ width: 480 }}>
        {items.map((item, i) => (
          <Accordion
            key={item.title}
            title={item.title}
            open={openIndex === i}
            onToggle={(next) => setOpenIndex(next ? i : null)}
          >
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
              {item.content}
            </p>
          </Accordion>
        ))}
      </div>
    );
  },
};
