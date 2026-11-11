import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: `${FIGMA_BASE}2284-1878` },
    docs: {
      description: {
        component: 'Displays a keyboard key or shortcut. Use `sm` for compact shortcuts and `md` when the key needs more emphasis. Content is rendered with the semantic HTML `<kbd>` element.',
      },
    },
  },
  argTypes: {
    children: { control: 'text', description: 'Key or shortcut text, such as /, ⌘K, or ⌥ Space.' },
    size: { control: 'select', options: ['sm', 'md'], description: 'Presentation size. Defaults to sm.' },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { children: '/' } };
export const Medium: Story = { args: { children: '⌘K', size: 'md' } };
export const Dark: Story = {
  globals: { theme: 'dark' },
  args: { children: '⌥ Space', size: 'md' },
  render: (args) => <div style={{ padding: 24, background: 'var(--color-bg-page)' }}><Kbd {...args} /></div>,
};
