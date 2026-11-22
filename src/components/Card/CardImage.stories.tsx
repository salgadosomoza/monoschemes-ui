import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardImage } from './CardImage';
import { Text } from '../Text';

const meta = {
  title: 'Layout/Card/Image',
  component: CardImage,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2773-1361' },
  },
  tags: ['autodocs'],
  args: {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960',
    alt: 'Modern home surrounded by greenery',
    children: <><Text style="subtitle-1">Casa Olivar</Text><Text style="body-2" color="var(--color-text-secondary)">Santa Maria del Camí, Mallorca</Text></>,
  },
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ width: 360 }}><CardImage {...args} /></div> };

export const Ratio16x9: Story = {
  args: { ratio: '16:9' },
  render: (args) => <div style={{ width: 360 }}><CardImage {...args} /></div>,
};
