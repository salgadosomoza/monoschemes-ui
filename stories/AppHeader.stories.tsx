import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from '../src/components/AppHeader';
import { Avatar } from '../src/components/Avatar';
import { Button } from '../src/components/Button';
import { Nav } from '../src/components/Nav';
import { NavItem } from '../src/components/NavItem';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    hasLogo: { control: 'boolean' },
    hasSiteTitle: { control: 'boolean' },
    hasTagline: { control: 'boolean' },
    hasNav: { control: 'boolean' },
    hasActions: { control: 'boolean' },
    siteTitle: { control: 'text' },
    tagline: { control: 'text' },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

const nav = (
  <Nav>
    <NavItem label="Home" href="/" />
    <NavItem label="Products" href="/products" />
    <NavItem label="About" href="/about" />
    <NavItem label="Contact" href="/contact" />
  </Nav>
);
const actions = <><Avatar type="initials" size="sm" initials="WM" /><Button variant="tertiary" size="sm" iconOnly iconLeft="menu" label="Open menu" /></>;

export const Desktop: Story = {
  render: () => (
    <div style={{ width: 1440, maxWidth: '100%' }}>
      <AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} siteTitle="Design System" tagline="v1.0" nav={nav} actions={actions} />
    </div>
  ),
  parameters: figma('2-45'),
};

export const Tablet: Story = {
  render: () => (
    <div style={{ width: 768, maxWidth: '100%' }}>
      <AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} siteTitle="Design System" tagline="v1.0" nav={nav} actions={actions} />
    </div>
  ),
  parameters: figma('154-835'),
};

export const CustomSlots: Story = {
  render: () => (
    <div style={{ width: 1440, maxWidth: '100%' }}>
      <AppHeader
        logo={{ type: 'image', alt: 'Brand' }}
        siteTitle="Workspace"
        tagline="Team settings"
        nav={<Nav aria-label="Workspace navigation"><NavItem label="Overview" href="#overview" status="active" /><NavItem label="People" href="#people" /><NavItem label="Settings" href="#settings" /></Nav>}
        actions={<><Button variant="secondary" label="Share" /><Avatar type="initials" size="sm" initials="CS" /></>}
      />
    </div>
  ),
  parameters: figma('2-45'),
};

export const Mobile: Story = {
  render: () => (
    <div style={{ width: 360, maxWidth: '100%' }}>
      <AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={nav} actions={actions} />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile360' },
    ...figma('154-835'),
  },
};
