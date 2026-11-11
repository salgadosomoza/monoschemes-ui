import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AnnouncementBar } from '../src/components/AnnouncementBar';

const FIGMA_URL = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2333-620';

const meta = {
  title: 'Components/Notification/AnnouncementBar',
  component: AnnouncementBar,
  args: {
    message: 'Announcement message goes here.',
    linkLabel: 'Learn more',
    href: '#learn-more',
    onClose: () => {},
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: 'A full-width announcement for information above the app header. Use Banner for status messages.',
      },
    },
  },
  argTypes: {
    message: { control: 'text' },
    linkLabel: { control: 'text' },
    href: { control: 'text' },
    showLink: { control: 'boolean' },
    showClose: { control: 'boolean' },
    onLinkClick: { action: 'announcement link activated' },
    onClose: { action: 'announcement dismissed' },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function AnnouncementExample({ dark = false }: { dark?: boolean }) {
  const [visible, setVisible] = useState(true);
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ background: 'var(--color-bg-page)', minHeight: 120 }}>
      {visible
        ? <AnnouncementBar message="Announcement message goes here." linkLabel="Learn more" href="#learn-more" onClose={() => setVisible(false)} />
        : <p style={{ padding: 24, color: 'var(--color-text-secondary)' }}>Announcement dismissed.</p>}
    </div>
  );
}

export const Default: Story = { render: () => <AnnouncementExample /> };
export const WithoutLink: Story = { args: { showLink: false } };
export const Dark: Story = { render: () => <AnnouncementExample dark /> };
