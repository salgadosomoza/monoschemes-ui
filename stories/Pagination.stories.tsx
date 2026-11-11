import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../src/components/Pagination';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: { page: 5, pageCount: 131, onPageChange: () => {} },
  parameters: {
    layout: 'padded',
    ...figma('8-335'),
    docs: {
      description: {
        component: 'Accessible pagination with compact page ranges and automatic ellipses. Page is one-based and controlled by the parent.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1 }, description: 'Current one-based page.' },
    pageCount: { control: { type: 'number', min: 1 }, description: 'Total number of pages.' },
    onPageChange: { action: 'page changed', description: 'Called with the selected page number.' },
    siblingCount: { control: { type: 'number', min: 0 } },
    showPrev: { control: 'boolean' },
    showNext: { control: 'boolean' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { page: 5, pageCount: 131 },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination page={page} pageCount={131} onPageChange={setPage} />;
  },
};

export const FirstPage: Story = {
  args: { page: 1, pageCount: 131 },
};

export const LastPage: Story = {
  args: { page: 131, pageCount: 131 },
};

export const ManyPages: Story = {
  args: { page: 6, pageCount: 131 },
};

export const Dark: Story = {
  globals: { theme: 'dark' },
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div style={{ padding: 24, background: 'var(--color-bg-page)' }}>
        <Pagination page={page} pageCount={131} onPageChange={setPage} />
      </div>
    );
  },
};
