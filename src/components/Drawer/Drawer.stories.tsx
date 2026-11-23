import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import { Drawer, type DrawerSide, type DrawerSize } from './Drawer';

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  args: { title: 'Edit profile', description: 'Update your account details.', side: 'right', size: 'md' },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2737-539' },
    docs: { description: { component: 'A modal side panel for focused tasks. It traps and restores focus, closes on Escape or backdrop click, and locks page scroll. For unsaved changes, intercept onOpenChange(false) in the product and confirm before closing.' } },
  },
  argTypes: { open: { control: false }, defaultOpen: { control: false }, children: { control: false }, actions: { control: false }, side: { control: 'inline-radio', options: ['right', 'left', 'bottom'] }, size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

function Example({ side = 'right', size = 'md', inverse = false }: { side?: DrawerSide; size?: DrawerSize; inverse?: boolean }) {
  const [open, setOpen] = useState(false);
  return <div data-theme={inverse ? 'inverse' : undefined} style={{ minHeight: '90vh', padding: 32, background: 'var(--color-bg-page)' }}>
    <Button label={`Open ${side} drawer`} variant="secondary" onClick={() => setOpen(true)} />
    <Drawer open={open} onOpenChange={setOpen} side={side} size={size} title="Edit profile" description="Update your account details.">
      <Text style="body-1" as="p">Change the information shown on your profile.</Text>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--color-text-primary)' }}>Display name<input defaultValue="Demo account" /></label>
    </Drawer>
  </div>;
}

export const Right: Story = { render: () => <Example /> };
export const Left: Story = { render: () => <Example side="left" /> };
export const Bottom: Story = { render: () => <Example side="bottom" /> };
export const Small: Story = { render: () => <Example size="sm" /> };
export const Large: Story = { render: () => <Example size="lg" /> };
export const Dark: Story = { globals: { theme: 'dark' }, render: () => <Example /> };
export const Inverse: Story = { render: () => <Example inverse /> };
export const MobileBottom: Story = { render: () => <Example side="bottom" />, parameters: { viewport: { defaultViewport: 'mobile1' } } };
