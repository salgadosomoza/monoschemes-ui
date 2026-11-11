import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2163-354' },
  },
  tags: ['autodocs'],
  args: { icon: 'file-text', title: 'Feature title', description: 'Short description of the feature, two or three lines long, explaining the benefit.' },
  argTypes: { icon: { control: 'select', options: ['info-circle', 'file-text', 'star', 'chart-bar'] } },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <div style={{ width: 384 }}><FeatureCard {...args} /></div>,
};

export const Grid: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, padding: 24 }}>
      {['Feature one', 'Feature two', 'Feature three'].map((title) => (
        <FeatureCard key={title} icon="file-text" title={title} description="A short description of this feature." />
      ))}
    </div>
  ),
};
