import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSearch } from './FormSearch';

const meta = {
  title: 'Components/Form/Search',
  component: FormSearch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Default: Story = {
  args: { placeholder: 'Search' },
  parameters: figma('20-518'),
};

export const Interactive: Story = {
  parameters: figma('20-518'),
  render: () => {
    const [value, setValue] = useState('');
    const [lastSearch, setLastSearch] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <FormSearch
          value={value}
          placeholder="Type and press Enter…"
          onChange={setValue}
          onSearch={setLastSearch}
        />
        {lastSearch && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', margin: 0 }}>
            Last search: <strong>{lastSearch}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { placeholder: 'Search', disabled: true },
  parameters: figma('20-518'),
};
