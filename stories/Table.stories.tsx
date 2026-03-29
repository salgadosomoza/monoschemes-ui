import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../src/components/Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

const columns = [
  { key: 'name', label: 'Name', width: '200px' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

const data = [
  { name: 'Alice Johnson', role: 'Designer', status: 'Active', date: '2024-01-15' },
  { name: 'Bob Smith', role: 'Developer', status: 'Active', date: '2024-01-16' },
  { name: 'Carol White', role: 'Product Manager', status: 'On leave', date: '2024-01-10' },
  { name: 'David Lee', role: 'Developer', status: 'Active', date: '2024-01-17' },
  { name: 'Eva Martinez', role: 'Designer', status: 'Inactive', date: '2023-12-20' },
];

export const Default: Story = {
  args: { columns, data },
  parameters: figma('8-401'),
};

export const Striped: Story = {
  args: { columns, data, striped: true },
  parameters: figma('8-401'),
};

export const WithManyColumns: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', width: '60px' },
      { key: 'name', label: 'Name', width: '160px' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'dept', label: 'Department' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Joined' },
    ],
    data: [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer', dept: 'Product', status: 'Active', date: '2024-01-15' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', dept: 'Engineering', status: 'Active', date: '2024-01-16' },
      { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'PM', dept: 'Product', status: 'On leave', date: '2024-01-10' },
    ],
  },
  parameters: figma('8-401'),
};

export const ClickableRows: Story = {
  args: {
    columns,
    data,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
  parameters: figma('8-401'),
};
