import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '../../src/components/Notification/Banner';

const meta = {
  title: 'Components/Notification/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A persistent message at the top or bottom of a page or section about a system-wide condition. Make it dismissible only when the information is not critical. Its background, text, border and offset shadow use semantic tokens and follow Light or Dark mode.\n\n`message` is the Figma text property. `position`, visibility, close handling and the optional action button are React implementation props; the action and close controls are omitted unless provided.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Announcement text, matching the Figma message property.' },
    position: { control: 'select', options: ['top', 'bottom'], description: 'Viewport edge where the banner is fixed. Defaults to top.' },
    isVisible: { control: 'boolean', description: 'Shows the banner. Defaults to false.' },
    onClose: { action: 'closed', description: 'Optional handler for the close control.' },
    action: { control: false, description: 'Optional action button with a label and click handler.' },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

export const Default: Story = {
  args: { message: 'This is an important announcement.', isVisible: true, position: 'top' },
  parameters: figma('475-79'),
};

export const Bottom: Story = {
  args: { message: 'Banner at the bottom of the page.', isVisible: true, position: 'bottom' },
  parameters: figma('475-79'),
};

export const WithAction: Story = {
  args: {
    message: 'A new version is available.',
    isVisible: true,
    action: { label: 'Update now', onClick: () => alert('Update clicked') },
  },
  parameters: figma('475-79'),
};

export const LongMessage: Story = {
  args: {
    message: 'This is a much longer announcement message that contains more information than usual to test how the banner handles extended content.',
    isVisible: true,
  },
  parameters: figma('475-79'),
};
