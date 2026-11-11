import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from '../CodeBlock';
import { Tab, TabPanel, Tabs } from './Tabs';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { value: 'react', onChange: () => {}, 'aria-label': 'Framework example', children: null },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: `${FIGMA_BASE}2284-1881` },
    docs: {
      description: {
        component: 'Controlled tab navigation. Render `Tab` and `TabPanel` children with matching values. The tablist follows the WAI-ARIA pattern: Left/Right Arrow, Home, and End move focus and activate the matching tab; Tab moves focus out to the selected panel or next control.',
      },
    },
  },
  argTypes: {
    value: { control: false, description: 'Value of the currently selected Tab.' },
    onChange: { action: 'tab changed', description: 'Called with the next selected tab value.' },
    'aria-label': { control: 'text', description: 'Accessible name for the tab list.' },
    children: { control: false, description: 'Matching Tab and TabPanel elements.' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function TabsExample({ dark = false }: { dark?: boolean }) {
  const [value, setValue] = useState('react');
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ width: 560, maxWidth: '100%', padding: 24, background: 'var(--color-bg-page)' }}>
      <Tabs value={value} onChange={setValue} aria-label="Framework example">
        <Tab value="react" label="React" />
        <Tab value="vue" label="Vue" />
        <Tab value="svelte" label="Svelte" />
        <TabPanel value="react"><CodeBlock filename="App.tsx" code={'import { Tabs } from \'@monoschemes/ui\';'} showCopy={false} /></TabPanel>
        <TabPanel value="vue"><p style={{ color: 'var(--color-text-primary)' }}>Vue tab panel.</p></TabPanel>
        <TabPanel value="svelte"><p style={{ color: 'var(--color-text-primary)' }}>Svelte tab panel.</p></TabPanel>
      </Tabs>
    </div>
  );
}

export const Default: Story = { render: () => <TabsExample /> };
export const Dark: Story = { render: () => <TabsExample dark /> };
