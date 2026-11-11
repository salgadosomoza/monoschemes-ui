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
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The primary control for an action. Choose primary for the main action, secondary or tertiary for supporting actions, danger for destructive actions and link for text actions. Use Link for navigation and Form/Toggle for on/off settings. An icon-only Button requires an accessible `label`; loading keeps the button width and prevents repeat activation.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: variants, description: 'Action emphasis and intent, matching the Figma variant.' },
    size: { control: 'select', options: sizes, description: 'Button height: sm 32px, md 40px or lg 48px.' },
    disabled: { control: 'boolean', description: 'Prevents activation and applies the disabled token treatment.' },
    loading: { control: 'boolean', description: 'Shows a spinner, keeps the button dimensions and blocks repeat clicks.' },
    label: { control: 'text', description: 'Visible button text, or the accessible name when iconOnly is true.' },
    iconLeft: {
      control: 'select',
      options: ['search', 'dots', 'plus', 'x', 'menu-2', 'star', 'download', 'chevron-left', 'chevron-right'],
      description: 'Tabler icon name, matching the Figma Icon/<name> component. Medium buttons use a 24px icon, an 8px gap, and 12px horizontal / 8px vertical padding.',
    },
    iconRight: { control: 'select', options: ['search', 'dots', 'plus', 'x', 'menu-2', 'star', 'download', 'chevron-left', 'chevron-right'], description: 'Optional Tabler icon after the label. Medium buttons use a 24px icon, an 8px gap, and 12px horizontal / 8px vertical padding.' },
    iconOnly: { control: 'boolean', description: 'Shows only iconLeft; label remains required as its accessible name.' },
    'aria-current': { control: 'select', options: ['page'], description: 'Marks the active item when the button represents the current pagination page.' },
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
    docs: { description: { story: 'Choose a Tabler icon with iconLeft. The label provides the accessible name and is not shown visually.' } },
  },
};
export const Small: Story = { args: { variant: 'primary', size: 'sm', label: 'Small' }, parameters: figma('2030-541') };
export const Large: Story = { args: { variant: 'primary', size: 'lg', label: 'Large' }, parameters: figma('2030-643') };

export const AllVariants: Story = {
  render: () => <div style={{ display: 'grid', gap: 16 }}>{variants.map(variant => <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{sizes.map(size => <Button key={size} variant={variant} size={size} label={`${variant} ${size}`} />)}</div>)}</div>,
  parameters: figma('2030-1786'),
};

export const LoadingAndIconStates: Story = {
  render: () => <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><Button label="Saving" loading /><Button label="Download" iconLeft="download" /><Button label="Next" iconRight="chevron-right" /><Button label="Search" iconOnly iconLeft="search" /></div>,
  parameters: figma('2030-1786'),
};

export const DisabledVariants: Story = {
  render: () => <div style={{ display: 'grid', gap: 16 }}>{variants.map(variant => <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{sizes.map(size => <Button key={size} variant={variant} size={size} label={`${variant} ${size}`} disabled />)}</div>)}</div>,
  parameters: figma('2030-482'),
};
