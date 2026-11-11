import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import type { ChipType } from './Chip';

const TYPES: ChipType[] = ['default', 'drag'];

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Chip layout variant.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the chip.',
    },
    showClose: { control: 'boolean', description: 'Shows or hides the remove control.' },
    selected: { control: 'boolean', description: 'Applies the selected state.' },
    draggable: {
      control: 'boolean',
      description: 'Makes the chip HTML5 draggable. Auto-enabled when type="drag".',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';

const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Individual variants ────────────────────────────

export const Default: Story = {
  args: { type: 'default', label: 'Chip name' },
  parameters: figma('10-469'),
};

export const Drag: Story = {
  args: { type: 'drag', label: 'Chip name' },
  parameters: figma('10-447'),
};

export const WithoutClose: Story = {
  args: { type: 'default', label: 'Chip name', showClose: false },
  parameters: figma('10-468'),
};

export const Selected: Story = {
  args: { type: 'default', label: 'Selected chip', selected: true },
  parameters: figma('10-468'),
};

export const SelectedWithoutClose: Story = {
  args: { type: 'default', label: 'Selected chip', selected: true, showClose: false },
  parameters: figma('10-468'),
};

function FilterGroupDemo() {
  const [selected, setSelected] = useState(() => new Set(['Design']));
  const filters = ['Design', 'Typography', 'Spacing', 'Components'];

  const toggleFilter = (filter: string, nextSelected: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      if (nextSelected) next.add(filter);
      else next.delete(filter);
      return next;
    });
  };

  return (
    <div role="group" aria-label="Filter by category" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          showClose={false}
          selected={selected.has(filter)}
          onSelectedChange={(nextSelected) => toggleFilter(filter, nextSelected)}
        />
      ))}
    </div>
  );
}

export const FilterGroup: Story = {
  parameters: figma('10-468'),
  render: () => <FilterGroupDemo />,
};

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('10-468'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {TYPES.map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              width: 56,
            }}
          >
            {type}
          </span>
          <Chip type={type} label="Chip name" />
        </div>
      ))}
    </div>
  ),
};

// ─── Interactive ────────────────────────────────────

const INITIAL_CHIPS = [
  { id: 1, label: 'Design system' },
  { id: 2, label: 'Typography' },
  { id: 3, label: 'Spacing' },
  { id: 4, label: 'Components' },
];

function InteractiveDemo() {
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [dragId, setDragId] = useState<number | null>(null);

  const handleClose = (id: number) => {
    setChips((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDragStart = (id: number) => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent, overId: number) => {
    e.preventDefault();
    if (dragId === null || dragId === overId) return;
    setChips((prev) => {
      const from = prev.findIndex((c) => c.id === dragId);
      const to = prev.findIndex((c) => c.id === overId);
      const next = [...prev];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
  };

  const handleDragEnd = () => setDragId(null);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: 24,
        border: '1px dashed var(--color-border-disabled)',
        borderRadius: 'var(--radius-none)',
        minWidth: 320,
      }}
    >
      {chips.map((chip) => (
        <div
          key={chip.id}
          draggable
          onDragStart={() => handleDragStart(chip.id)}
          onDragOver={(e) => handleDragOver(e, chip.id)}
          onDragEnd={handleDragEnd}
          style={{ opacity: dragId === chip.id ? 0.4 : 1, transition: 'opacity 0.15s' }}
        >
          <Chip
            type="drag"
            label={chip.label}
            onClose={() => handleClose(chip.id)}
          />
        </div>
      ))}
      {chips.length === 0 && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-placeholder)' }}>
          All chips removed — refresh to reset.
        </span>
      )}
    </div>
  );
}

export const Interactive: Story = {
  parameters: figma('10-468'),
  render: () => <InteractiveDemo />,
};
