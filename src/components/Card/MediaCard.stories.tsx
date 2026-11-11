import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCard } from './MediaCard';

const meta = {
  title: 'Components/MediaCard',
  component: MediaCard,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2163-296' },
  },
  tags: ['autodocs'],
  args: {
    title: 'Voice name',
    meta: 'Narrator · English',
    avatar: { type: 'icon', variant: 'round', size: 'lg' },
  },
  argTypes: {
    title: { control: 'text' },
    meta: { control: 'text' },
    showAction: { control: 'boolean' },
    selected: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { showAction: true },
  render: (args) => <div style={{ width: 200 }}><MediaCard {...args} /></div>,
};
export const Selected: Story = {
  args: { selected: true, showAction: true },
  render: (args) => <div style={{ width: 200 }}><MediaCard {...args} /></div>,
};
export const WithoutAction: Story = {
  args: { showAction: false },
  render: (args) => <div style={{ width: 200 }}><MediaCard {...args} /></div>,
};

function InteractiveMediaCardDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <MediaCard
      title="Voice name"
      meta="Narrator · English"
      avatar={{ type: 'icon', variant: 'round', size: 'lg' }}
      selected={selected}
      interactive
      onSelect={setSelected}
      action={{ label: 'Use this voice', onClick: () => {} }}
    />
  );
}

export const Interactive: Story = {
  render: () => <div style={{ width: 200 }}><InteractiveMediaCardDemo /></div>,
};

export const Grid: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 16, padding: 24 }}>
      {['Voice one', 'Voice two', 'Voice three', 'Voice four', 'Voice five'].map((title) => (
        <MediaCard
          key={title}
          title={title}
          meta="Narrator · English"
          avatar={{ type: 'icon', variant: 'round', size: 'lg' }}
        />
      ))}
    </div>
  ),
};
