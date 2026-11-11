import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconName } from './Icon';

const iconNames: IconName[] = [
  'info-circle', 'alert-triangle', 'user-circle', 'plus', 'chart-bar', 'calendar',
  'square-check-filled', 'square', 'chevron-left', 'chevron-right', 'x', 'box', 'file-text',
  'download', 'grip-vertical', 'chevron-up', 'chevron-down', 'square-minus-filled', 'link',
  'map-pin', 'menu-2', 'music', 'photo', 'player-play', 'qrcode', 'circle-dot-filled', 'circle',
  'minus', 'search', 'movie', 'video', 'help-circle', 'password', 'dots', 'upload', 'star',
  'player-pause', 'volume', 'brand-x', 'brand-instagram', 'brand-linkedin', 'brand-youtube',
  'brand-facebook', 'brand-tiktok', 'brand-github',
];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'info-circle', size: 24 },
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=130-2058',
    },
    docs: {
      description: {
        component: 'Renders a Tabler icon from the shared icon set. Choose a name from `IconName`; size is measured in pixels and stroke defaults to the shared icon-stroke token. Use semantic text color on the surrounding component rather than setting primitive colors on the icon.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: iconNames, description: 'Tabler icon name from the shared icon set.' },
    size: { control: { type: 'number', min: 8, max: 64, step: 4 }, description: 'Rendered width and height in pixels. Defaults to 24.' },
    stroke: { control: { type: 'number', min: 1, max: 3, step: 0.25 }, description: 'Optional stroke width override; defaults to the icon-stroke token.' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 20 }}>
      {iconNames.map((name) => (
        <div key={name} style={{ display: 'grid', justifyItems: 'center', gap: 8, color: 'var(--color-text-primary)' }}>
          <Icon name={name} />
          <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-caption-size)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const SizesAndStroke: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'var(--color-text-primary)' }}>
      {[8, 16, 24, 32, 48, 64].map((size) => <Icon key={size} name="file-text" size={size} />)}
      <Icon name="file-text" size={32} stroke={2.5} />
    </div>
  ),
};
