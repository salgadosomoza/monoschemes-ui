import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link';
import { Tag } from '../Tag';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Data display/Description list',
  component: DescriptionList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;
const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2652-1126';
const design = { design: { type: 'figma', url: FIGMA } };
const items = [
  { term: 'Client', description: <Link label="Example Studio" href="#client" /> },
  { term: 'Status', description: <Tag label="Active" type="subtle" size="sm" /> },
  { term: 'Owner', description: 'Demo account' },
  { term: 'Website', description: <Link label="Visit site" href="#website" type="icon" /> },
];

export const Default: Story = { args: { items }, parameters: design };
export const Dark: Story = { args: { items }, globals: { theme: 'dark' }, parameters: design };
export const Inverse: Story = {
  args: { items },
  render: (args) => <div data-theme="inverse" style={{ padding: 'var(--spacing-xl)' }}><DescriptionList {...args} /></div>,
  parameters: design,
};
export const InverseOnDark: Story = {
  args: { items },
  globals: { theme: 'dark' },
  render: (args) => <div data-theme="inverse" style={{ padding: 'var(--spacing-xl)' }}><DescriptionList {...args} /></div>,
  parameters: design,
};
