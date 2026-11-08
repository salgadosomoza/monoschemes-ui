import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant } from './Button';

const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'link'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });
const nodeByVariant: Record<ButtonVariant, string> = {
  primary: '2030-439', secondary: '2030-745', tertiary: '2030-1051', danger: '2030-1357', link: '2030-1663',
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
    iconLeft: {
      control: 'select',
      options: ['search', 'more_horiz', 'add', 'close', 'delete', 'edit', 'settings', 'menu', 'favorite', 'download'],
      description: 'Material Symbols name. In IconOnly, choose the icon here.',
    },
    iconRight: { control: 'text' },
    iconOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary', label: 'Button' }, parameters: figma(nodeByVariant.primary) };
export const Secondary: Story = { args: { variant: 'secondary', label: 'Button' }, parameters: figma(nodeByVariant.secondary) };
export const Tertiary: Story = { args: { variant: 'tertiary', label: 'Button' }, parameters: figma(nodeByVariant.tertiary) };
export const Danger: Story = { args: { variant: 'danger', label: 'Delete' }, parameters: figma(nodeByVariant.danger) };
export const Link: Story = { args: { variant: 'link', label: 'Text link' }, parameters: figma(nodeByVariant.link) };
export const Disabled: Story = { args: { variant: 'primary', label: 'Button', disabled: true }, parameters: figma('2030-482') };
export const Loading: Story = { args: { variant: 'primary', label: 'Loading', loading: true }, parameters: figma('2030-472') };
export const IconOnly: Story = {
  args: { variant: 'primary', label: 'Search', iconOnly: true, iconLeft: 'search' },
  parameters: {
    ...figma('2030-490'),
    docs: { description: { story: 'Use the iconLeft control to choose a Material Symbols icon. The label provides the accessible name and is not shown visually.' } },
  },
};
export const Small: Story = { args: { variant: 'primary', size: 'sm', label: 'Small' }, parameters: figma('2030-541') };
export const Large: Story = { args: { variant: 'primary', size: 'lg', label: 'Large' }, parameters: figma('2030-643') };

export const AllVariants: Story = {
  render: () => <div style={{ display: 'grid', gap: 16 }}>{variants.map(variant => <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{sizes.map(size => <Button key={size} variant={variant} size={size} label={`${variant} ${size}`} />)}</div>)}</div>,
  parameters: figma('2030-1786'),
};

export const LoadingAndIconStates: Story = {
  render: () => <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><Button label="Saving" loading /><Button label="Download" iconLeft="download" /><Button label="Next" iconRight="arrow_forward" /><Button label="Search" iconOnly iconLeft="search" /></div>,
  parameters: figma('2030-1786'),
};

export const DisabledVariants: Story = {
  render: () => <div style={{ display: 'grid', gap: 16 }}>{variants.map(variant => <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{sizes.map(size => <Button key={size} variant={variant} size={size} label={`${variant} ${size}`} disabled />)}</div>)}</div>,
  parameters: figma('2030-482'),
};
