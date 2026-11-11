import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideNav, SideNavItem } from '../src/components/SideNav';

const CATEGORIES = [
  ['All icons', '5,203'],
  ['Arrows', '312'],
  ['Brands', '481'],
  ['Files', '126'],
  ['Media', '284'],
  ['Music', '98'],
  ['Navigation', '207'],
  ['Status', '156'],
  ['User', '74'],
  ['Weather', '42'],
] as const;
const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2334-1613';

const meta = {
  title: 'Components/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: 'A labeled side navigation containing SideNavItem links or actions.',
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    showHeading: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

function CategoriesExample({ dark = false }: { dark?: boolean }) {
  const [selected, setSelected] = useState('All icons');
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ padding: 24, background: 'var(--color-bg-page)' }}>
      <SideNav heading="Categories">
        {CATEGORIES.map(([label, count]) => (
          <SideNavItem
            key={label}
            label={label}
            count={count}
            selected={selected === label}
            onClick={() => setSelected(label)}
          />
        ))}
      </SideNav>
    </div>
  );
}

export const TenCategories: Story = { render: () => <CategoriesExample /> };
export const Dark: Story = { render: () => <CategoriesExample dark /> };
