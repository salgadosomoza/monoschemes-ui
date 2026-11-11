import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import type { TagSize, TagType } from './Tag';

const TYPES: TagType[] = ['default', 'subtle', 'inverse'];
const SIZES: TagSize[] = ['md', 'sm'];
const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered', ...figma('285-4420') },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    size: { control: 'select', options: SIZES },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { type: 'default', size: 'md', label: 'Tag name' } };

/** All six type/size combinations are shown together; use the Theme toolbar for Light and Dark. */
export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 'var(--gap-md)', alignItems: 'center' }}>
      {SIZES.map((size) => TYPES.map((type) => (
        <Tag key={`${type}-${size}`} type={type} size={size} label={`${type} · ${size}`} />
      )))}
    </div>
  ),
};
