import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { Item } from './Item/Item';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded', ...figma('1690-480') },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const PANEL_CONTENT = (
  <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
    This is the accordion panel content. It can contain any React nodes —
    text, images, forms, or nested components.
  </p>
);

export const SingleItem: Story = {
  name: 'Single item',
  args: { children: PANEL_CONTENT },
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion>
        <Item title="Section title">{PANEL_CONTENT}</Item>
      </Accordion>
    </div>
  ),
};

export const MultipleItems: Story = {
  name: 'Multiple items',
  args: { children: PANEL_CONTENT },
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion>
        <Item title="What is MonoSchemes?" defaultExpanded>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            MonoSchemes is a design system built for clarity and consistency across products.
          </p>
        </Item>
        <Item title="How do I install it?">
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            Run <code>npm install @monoschemes/ui</code> and import the tokens CSS.
          </p>
        </Item>
        <Item title="Can I customize the theme?">
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            Yes — override the CSS custom properties in your own stylesheet.
          </p>
        </Item>
        <Item title="Disabled item" disabled>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
            This content is not reachable.
          </p>
        </Item>
      </Accordion>
    </div>
  ),
};

export const ExclusiveGroup: Story = {
  name: 'Exclusive group (one open at a time)',
  args: { children: PANEL_CONTENT },
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
          {items.map((item, index) => (
            <Item
              key={item.title}
              title={item.title}
              expanded={openIndex === index}
              onToggle={(next) => setOpenIndex(next ? index : null)}
            >
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.5 }}>
                {item.content}
              </p>
            </Item>
          ))}
        </Accordion>
      </div>
    );
  },
};
