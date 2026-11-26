import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorybookHome } from './StorybookHome';

const meta = {
  title: 'Start here',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const Home: StoryObj<typeof meta> = {
  tags: ['!dev'],
  render: (_, { globals }) => <StorybookHome theme={globals.theme === 'dark' ? 'dark' : 'light'} />,
};
