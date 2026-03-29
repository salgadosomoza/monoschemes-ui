import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from '../src/components/AppHeader';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    siteTitle: { control: 'text' },
    tagline: { control: 'text' },
    showAvatar: { control: 'boolean' },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

const defaultNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Default: Story = {
  args: {
    logo: { type: 'text', label: 'MonoSchemes' },
    navItems: defaultNav,
  },
  parameters: figma('2-45'),
};

export const WithAvatar: Story = {
  args: {
    logo: { type: 'text', label: 'MonoSchemes' },
    navItems: defaultNav,
    showAvatar: true,
    avatarProps: { type: 'initials', variant: 'round' },
  },
  parameters: figma('2-45'),
};

export const WithActions: Story = {
  args: {
    logo: { type: 'text', label: 'MonoSchemes' },
    siteTitle: 'Design System',
    tagline: 'v1.0',
    navItems: defaultNav,
    showAvatar: true,
    avatarProps: { type: 'icon', variant: 'round' },
    showActions: true,
  },
  parameters: figma('2-45'),
};

export const Mobile: Story = {
  args: {
    logo: { type: 'text', label: 'MonoSchemes' },
    navItems: defaultNav,
    showAvatar: true,
    avatarProps: { type: 'icon', variant: 'round' },
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    ...figma('2-45'),
  },
};
