import type { Meta, StoryObj } from '@storybook/react-vite';
import { Suggestions } from './Suggestions';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2792-290';
const meta = {
  title: 'Agents/Suggestions',
  component: Suggestions,
  args: { suggestions: ['Compare the 3 cheapest', 'Show them on a map', 'Write to the owner'], onSelect: () => undefined },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
} satisfies Meta<typeof Suggestions>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const HiddenWhileTyping: Story = { args: { inputValue: 'Compare' } };
export const Dark: Story = { globals: { theme: 'dark' } };
