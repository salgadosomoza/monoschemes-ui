import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: `${FIGMA_BASE}2260-1170` },
    docs: {
      description: {
        component: 'Presents source code without syntax highlighting. Use `filename` to identify the file, `language` to annotate the code element, and `showCopy` to provide a clipboard action. Copy success or failure is announced through a polite live region.',
      },
    },
  },
  argTypes: {
    filename: { control: 'text', description: 'Optional file name shown in the header.' },
    code: { control: 'text', description: 'Source text rendered inside pre/code with horizontal scrolling.' },
    language: { control: 'text', description: 'Optional language class for future highlighting integrations; no syntax highlighting is applied.' },
    showCopy: { control: 'boolean', description: 'Shows the Copy control. Defaults to true.' },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const example = `npm install @monoschemes/ui\n\nimport { Button } from '@monoschemes/ui';\n\n<Button label="Save" />`;

export const Default: Story = { args: { filename: 'App.tsx', code: example, language: 'tsx' } };
export const WithoutCopy: Story = { args: { filename: 'tokens.css', code: ':root {\n  --color-bg-page: #fff;\n}', language: 'css', showCopy: false } };
export const Dark: Story = {
  args: { filename: 'App.tsx', code: example, language: 'tsx' },
  render: (args) => <div data-theme="dark" style={{ padding: 24, background: 'var(--color-bg-page)' }}><CodeBlock {...args} /></div>,
};
