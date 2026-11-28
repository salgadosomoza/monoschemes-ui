import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Text } from '../Text';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2701-3632' },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Container><Text style="h4">Centered content</Text></Container>,
};

export const Full: Story = {
  render: () => (
    <Container size="full" data-theme="inverse" style={{ background: 'var(--color-bg-page)', paddingBlock: 'var(--spacing-xl)' }}>
      <Container><Text style="h4">Full-width band with centered content</Text></Container>
    </Container>
  ),
};
