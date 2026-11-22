import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagGroup } from './TagGroup';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const meta = {
  title: 'Data display/Tag group',
  component: TagGroup,
  parameters: { layout: 'padded', design: { type: 'figma', url: `${FIGMA_BASE}2665-412` } },
  tags: ['autodocs'],
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = [
  { label: 'Design' },
  { label: 'Research' },
  { label: 'Product' },
  { label: 'Strategy' },
  { label: 'Accessibility' },
  { label: 'Systems' },
  { label: 'Engineering' },
];

export const Default: Story = { args: { tags: tags.slice(0, 3) } };
export const Overflow: Story = { args: { tags, maxVisible: 4 } };
export const Expanded: Story = { args: { tags, maxVisible: 4, defaultExpanded: true } };
export const Small: Story = { args: { tags, maxVisible: 4, size: 'sm', type: 'subtle' } };
export const Inverse: Story = {
  args: { tags, maxVisible: 4 },
  render: () => <div data-theme="inverse" style={{ padding: 'var(--spacing-xl)', width: 480 }}><TagGroup tags={tags} maxVisible={4} /></div>,
};
