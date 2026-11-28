import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolCall } from './ToolCall';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2791-350';
const meta = {
  title: 'Agents/Tool Call',
  component: ToolCall,
  args: { name: 'Search the web', summary: '“flats for rent Gràcia pets”', state: 'running' },
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA } },
} satisfies Meta<typeof ToolCall>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Running: Story = { args: { defaultExpanded: true, input: "{ 'query': 'flats for rent Gràcia pets', 'max_price': 1400 }", result: 'Waiting for results…' } };
export const Done: Story = { args: { state: 'done', summary: '“flats for rent Gràcia pets”', defaultExpanded: true, input: "{ 'query': 'flats for rent Gràcia pets', 'max_price': 1400 }", result: '12 results · 3 under €1,200' } };
export const Error: Story = { args: { state: 'error', summary: '“flats for rent Gràcia pets”', defaultExpanded: true, input: "{ 'query': 'flats for rent Gràcia pets', 'max_price': 1400 }", result: 'The search service did not answer. The agent will try another source.' } };
export const Dark: Story = { globals: { theme: 'dark' } };
