import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../src/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation for a long list or table. It shows previous/next controls and a button for every page, and highlights the current page. For short lists, prefer showing all items or a “load more” action. The previous/next controls follow Figma Button/WithIcon sizing: 40px high, 12px horizontal and 8px vertical padding, an 8px icon gap, and a 24px icon.\n\n`currentPage` makes the component controlled; omit it to use the built-in state (starts at page 1). `onPageChange` fires for page-number and previous/next actions. This implementation lists every page and does not collapse long ranges into an ellipsis.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number', description: 'Current page. When provided, the component is controlled by the parent.' },
    totalPages: { control: 'number', description: 'Number of pages to display. Defaults to 5.' },
    onPageChange: { action: 'page changed', description: 'Called with the selected page number.' },
    showPrevNext: { control: 'boolean', description: 'Shows or hides the Prev and Next buttons.' },
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
