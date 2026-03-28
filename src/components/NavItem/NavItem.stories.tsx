import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';
import type { NavItemStatus } from './NavItem';

const STATUSES: NavItemStatus[] = ['default', 'hover', 'active'];

const meta = {
  title: 'Components/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: STATUSES,
      description: 'Visual/interactive status of the nav item.',
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the nav item.',
    },
    href: {
      control: 'text',
      description: 'When provided, renders an <a> tag instead of a <button>.',
    },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Individual variants ────────────────────────────

export const Default: Story = {
  args: { status: 'default', label: 'About' },
  parameters: figma('673-2099'),
};

export const Hover: Story = {
  args: { status: 'hover', label: 'About' },
  parameters: figma('673-2103'),
};

export const Active: Story = {
  args: { status: 'active', label: 'About' },
  parameters: figma('1387-250'),
};

// ─── All combinations overview ──────────────────────

export const AllCombinations: Story = {
  parameters: figma('673-2102'),
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
      {STATUSES.map((status) => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <NavItem status={status} label="About" />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              color: '#40444A',
            }}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─── Interactive nav bar ────────────────────────────

const NAV_LINKS = ['Home', 'About', 'Services', 'Contact'];

function InteractiveDemo() {
  const [active, setActive] = useState('About');

  return (
    <nav
      style={{
        display: 'flex',
        gap: 24,
        padding: '12px 24px',
        borderBottom: '1px solid #E2E5E9',
      }}
    >
      {NAV_LINKS.map((label) => (
        <NavItem
          key={label}
          label={label}
          status={active === label ? 'active' : 'default'}
          onClick={() => setActive(label)}
        />
      ))}
    </nav>
  );
}

export const Interactive: Story = {
  parameters: figma('673-2102'),
  render: () => <InteractiveDemo />,
};
