import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Text } from '../Text';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2163-253' },
  },
  tags: ['autodocs'],
  argTypes: { selected: { control: 'boolean' } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <Text>Card content</Text> },
  render: (args) => <div style={{ width: 320 }}><Card {...args} /></div>,
};

export const Selected: Story = {
  args: { children: <Text>Card content</Text>, selected: true },
  render: (args) => <div style={{ width: 320 }}><Card {...args} /></div>,
};

function InteractiveCardDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <Card selected={selected} onClick={() => setSelected((current) => !current)}>
      <Text>Click or press Enter/Space to toggle selection</Text>
    </Card>
  );
}

export const Interactive: Story = {
  args: { children: <Text>Click or press Enter/Space to toggle selection</Text> },
  render: () => <div style={{ width: 320 }}><InteractiveCardDemo /></div>,
};
