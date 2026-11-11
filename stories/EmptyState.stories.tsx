import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { EmptyState } from '../src/components/EmptyState';

const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2334-1580';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'No results',
    description: 'Try another keyword or clear the filters.',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: 'A centered message for empty results, lists without data, or non-blocking errors. Actions are supplied by the consumer.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text', description: 'Icon name from the shared Icon map.' },
    showIcon: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    actions: { control: false },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

function ClearSearchExample({ dark = false }: { dark?: boolean }) {
  const [cleared, setCleared] = useState(false);
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ background: 'var(--color-bg-page)' }}>
      {cleared
        ? <p role="status" style={{ padding: 32, color: 'var(--color-text-secondary)' }}>Search cleared.</p>
        : (
          <EmptyState
            title="No results"
            description="Try another keyword or clear the filters."
            actions={<Button variant="secondary" label="Clear search" onClick={() => setCleared(true)} />}
          />
        )}
    </div>
  );
}

export const Default: Story = {
  args: {
    actions: <Button variant="secondary" label="Clear search" />,
  },
};
export const WithClearSearchAction: Story = { render: () => <ClearSearchExample /> };
export const WithoutIcon: Story = { args: { showIcon: false } };
export const Dark: Story = { render: () => <ClearSearchExample dark /> };
