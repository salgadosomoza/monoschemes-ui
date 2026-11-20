import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { Tag } from '../src/components/Tag';
import { Table } from '../src/components/Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });
const columns = [
  { key: 'name', label: 'Name', width: '360px', sortable: true },
  { key: 'email', label: 'Email', width: '280px', sortable: true },
  { key: 'role', label: 'Role', width: '200px', sortable: true },
  { key: 'status', label: 'Status', width: '192px' },
];
const people = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer', status: <Tag label="Active" type="subtle" /> },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', status: <Tag label="Active" type="subtle" /> },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Product Manager', status: <Tag label="On leave" /> },
  { id: '4', name: 'David Lee', email: 'david@example.com', role: 'Developer', status: <Tag label="Active" type="subtle" /> },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', role: 'Designer', status: <Tag label="Inactive" /> },
  { id: '6', name: 'Frank Green', email: 'frank@example.com', role: 'Analyst', status: <Tag label="Active" type="subtle" /> },
  { id: '7', name: 'Grace Kim', email: 'grace@example.com', role: 'Designer', status: <Tag label="Active" type="subtle" /> },
  { id: '8', name: 'Hugo Martin', email: 'hugo@example.com', role: 'Developer', status: <Tag label="On leave" /> },
  { id: '9', name: 'Inez Lopez', email: 'inez@example.com', role: 'Analyst', status: <Tag label="Active" type="subtle" /> },
  { id: '10', name: 'Jon Bell', email: 'jon@example.com', role: 'Designer', status: <Tag label="Inactive" /> },
  { id: '11', name: 'Kai Chen', email: 'kai@example.com', role: 'Developer', status: <Tag label="Active" type="subtle" /> },
  { id: '12', name: 'Luz Silva', email: 'luz@example.com', role: 'Product Manager', status: <Tag label="Active" type="subtle" /> },
];
const common = { columns, data: people, getRowKey: (row: Record<string, ReactNode>) => String(row.id) };

export const Default: Story = { args: common, parameters: figma('2659-835') };
export const Sortable: Story = {
  args: { ...common, columns: columns.map((column) => ({ ...column, sortable: true })) },
  parameters: figma('2657-384'),
};
export const SelectablePartial: Story = {
  render: function SelectablePartialStory() {
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    return <Table {...common} selectable selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} selectionActions={<Button variant="secondary" size="sm" label="Archive" />} />;
  },
  parameters: figma('2657-408'),
};
export const WithSearch: Story = { args: { ...common, searchable: true, searchPlaceholder: 'Search people' }, parameters: figma('2657-552') };
export const Paginated: Story = { args: { ...common, pageSize: 5, pageSizeOptions: [5, 10, 25] }, parameters: figma('2657-553') };
export const NoResults: Story = {
  render: function NoResultsStory() {
    const [search, setSearch] = useState('not found');
    return <Table {...common} searchable searchValue={search} onSearchChange={setSearch} />;
  },
  parameters: figma('2659-835'),
};
export const Loading: Story = { args: { ...common, loading: true }, parameters: figma('2659-835') };

export const InverseZone: Story = {
  render: () => <div data-theme="inverse" style={{ padding: 'var(--spacing-xl)' }}><Table {...common} selectable searchable pageSize={5} /></div>,
  parameters: figma('2659-835'),
};

export const ControlledSort: Story = {
  render: function ControlledSortStory() {
    const [sort, setSort] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
    return <Table {...common} sort={sort} onSortChange={setSort} />;
  },
  parameters: figma('2657-384'),
};
