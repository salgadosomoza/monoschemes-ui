import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

// ─── Figma helpers ───────────────────────────────────

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const PANEL_CONTENT = (
  <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
    This is the accordion panel content. It can contain any React nodes —
    text, images, forms, or nested components.
  </p>
);

// ════════════════════════════════════════════════════
// AccordionHeader stories
// ════════════════════════════════════════════════════

const headerMeta = {
  title: 'Components/Accordion/AccordionHeader',
  component: AccordionHeader,
  parameters: { layout: 'padded', ...figma('86-368') },
  tags: ['autodocs'],
  args: {
    children: 'Section title',
    expanded: false,
    disabled: false,
  },
  argTypes: {
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof AccordionHeader>;

export default headerMeta;
type HeaderStory = StoryObj<typeof headerMeta>;

// Wrap header in accordion-item so CSS context is correct
function HeaderWrapper(props: React.ComponentProps<typeof AccordionHeader>) {
  return (
    <div className="accordion-item" style={{ maxWidth: 480 }}>
      <AccordionHeader {...props} />
    </div>
  );
}

export const Default: HeaderStory = {
  args: { expanded: false, disabled: false, children: 'Section title' },
  render: (args) => <HeaderWrapper {...args} />,
};

export const Expanded: HeaderStory = {
  args: { expanded: true, disabled: false, children: 'Section title' },
  render: (args) => <HeaderWrapper {...args} />,
};

export const Disabled: HeaderStory = {
  args: { expanded: false, disabled: true, children: 'Section title' },
  render: (args) => (
    <div className="accordion-item" data-disabled="" style={{ maxWidth: 480 }}>
      <AccordionHeader {...args} />
    </div>
  ),
};

export const AllHeaderStates: HeaderStory = {
  args: { children: 'Section title' },
  render: () => (
    <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div className="accordion-item">
        <AccordionHeader expanded={false}>Default (collapsed)</AccordionHeader>
      </div>
      <div className="accordion-item">
        <AccordionHeader expanded={true}>Default (expanded)</AccordionHeader>
      </div>
      <div className="accordion-item" data-disabled="">
        <AccordionHeader expanded={false} disabled>Disabled</AccordionHeader>
      </div>
    </div>
  ),
};

// ════════════════════════════════════════════════════
// AccordionPanel stories
// ════════════════════════════════════════════════════

export const PanelCollapsed: StoryObj = {
  name: 'Panel — Collapsed',
  parameters: figma('86-367'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionPanel expanded={false}>{PANEL_CONTENT}</AccordionPanel>
    </div>
  ),
};

export const PanelExpanded: StoryObj = {
  name: 'Panel — Expanded',
  parameters: figma('86-369'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionPanel expanded={true}>{PANEL_CONTENT}</AccordionPanel>
    </div>
  ),
};

// ════════════════════════════════════════════════════
// AccordionItem stories
// ════════════════════════════════════════════════════

export const ItemCollapsed: StoryObj = {
  name: 'Item — Collapsed',
  parameters: figma('86-367'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionItem title="Section title" defaultExpanded={false}>
        {PANEL_CONTENT}
      </AccordionItem>
    </div>
  ),
};

export const ItemExpanded: StoryObj = {
  name: 'Item — Expanded',
  parameters: figma('86-369'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionItem title="Section title" defaultExpanded={true}>
        {PANEL_CONTENT}
      </AccordionItem>
    </div>
  ),
};

export const ItemDisabled: StoryObj = {
  name: 'Item — Disabled',
  parameters: figma('86-368'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionItem title="Section title" disabled>
        {PANEL_CONTENT}
      </AccordionItem>
    </div>
  ),
};

export const ItemInteractive: StoryObj = {
  name: 'Item — Interactive',
  parameters: figma('86-368'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AccordionItem title="Click to toggle">{PANEL_CONTENT}</AccordionItem>
    </div>
  ),
};

// ════════════════════════════════════════════════════
// Accordion (container) stories
// ════════════════════════════════════════════════════

export const SingleItem: StoryObj = {
  name: 'Accordion — Single item',
  parameters: figma('86-368'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion>
        <AccordionItem title="Section title">{PANEL_CONTENT}</AccordionItem>
      </Accordion>
    </div>
  ),
};

export const MultipleItems: StoryObj = {
  name: 'Accordion — Multiple items',
  parameters: figma('86-368'),
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion>
        <AccordionItem title="What is MonoSchemes?" defaultExpanded={true}>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            MonoSchemes is a design system built for clarity and consistency across products.
          </p>
        </AccordionItem>
        <AccordionItem title="How do I install it?">
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            Run <code>npm install @monoschemes/ui</code> and import the tokens CSS.
          </p>
        </AccordionItem>
        <AccordionItem title="Can I customize the theme?">
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            Yes — override the CSS custom properties in your own stylesheet.
          </p>
        </AccordionItem>
        <AccordionItem title="Disabled item" disabled>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            This content is not reachable.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const ExclusiveGroup: StoryObj = {
  name: 'Accordion — Exclusive group (one open at a time)',
  parameters: figma('86-368'),
  render: () => {
    const items = [
      { title: 'What is MonoSchemes?', content: 'MonoSchemes is a design system built for clarity and consistency across products.' },
      { title: 'How do I install it?', content: 'Run npm install @monoschemes/ui and import the tokens CSS in your app entry point.' },
      { title: 'Can I customize the theme?', content: 'Yes — override the CSS custom properties in your own stylesheet to match your brand.' },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
      <div style={{ maxWidth: 480 }}>
        <Accordion>
          {items.map((item, i) => (
            <AccordionItem
              key={item.title}
              title={item.title}
              expanded={openIndex === i}
              onToggle={(next) => setOpenIndex(next ? i : null)}
            >
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
                {item.content}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};
