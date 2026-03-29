import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../src/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    showPrevNext: { control: 'boolean' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

export const Default: Story = {
  args: { totalPages: 5 },
  parameters: figma('8-335'),
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />;
  },
  parameters: figma('8-335'),
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 5 },
  parameters: figma('8-335'),
};

export const LastPage: Story = {
  args: { currentPage: 5, totalPages: 5 },
  parameters: figma('8-335'),
};

export const ManyPages: Story = {
  args: { currentPage: 6, totalPages: 12 },
  parameters: figma('8-335'),
};
