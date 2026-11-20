import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../src/components/Button';
import { Tooltip, type TooltipPlacement } from '../src/components/Tooltip';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` } });

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { content: 'Copy link', placement: 'top' },
  parameters: {
    layout: 'centered',
    ...figma('2631-266'),
    docs: {
      description: {
        component: 'Use for supplementary text only, never essential information or interactive content. It opens after a short hover delay or immediately on keyboard focus, flips when it will not fit, and uses aria-describedby on its focusable trigger. An icon-only Button receives the tooltip content as its accessible name when no label was supplied.',
      },
    },
  },
  argTypes: {
    content: { control: 'text', description: 'Brief supplementary text; do not put essential information or interactive content in a tooltip.' },
    shortcut: { control: 'text', description: 'Optional keyboard shortcut rendered with Kbd sm.' },
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'], description: 'Preferred side; flips to the opposite side if it does not fit.' },
    children: { control: false, description: 'One focusable element that triggers the tooltip.' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

type DemoOptions = {
  placement?: TooltipPlacement;
  shortcut?: string;
  iconOnly?: boolean;
  inverse?: boolean;
};

function singleTooltip({ placement = 'top', shortcut, iconOnly = false, inverse = false }: DemoOptions = {}) {
  const tip = (
    <Tooltip content="Copy link" shortcut={shortcut} placement={placement}>
      {iconOnly
        ? <Button variant="tertiary" size="sm" iconOnly iconLeft="copy" label="" />
        : <Button variant="tertiary" label="Copy link" />}
    </Tooltip>
  );
  return inverse ? <div data-theme="inverse" style={{ minHeight: '100vh', padding: 80 }}>{tip}</div> : tip;
}

function placementExamples(inverse = false) {
  const examples = (['top', 'bottom', 'left', 'right'] as const).map((placement) => (
    <Tooltip key={placement} content={`Tooltip ${placement}`} placement={placement}>
      <Button variant="secondary" label={placement} />
    </Tooltip>
  ));
  const grid = <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gap: 64, padding: 80 }}>{examples}</div>;
  return inverse ? <div data-theme="inverse" style={{ minHeight: '100vh' }}>{grid}</div> : grid;
}

function themedStory(theme: 'light' | 'dark', nodeId: string, options: DemoOptions = {}): Story {
  return {
    globals: { theme },
    parameters: figma(nodeId),
    render: () => singleTooltip(options),
  };
}

function placementsStory(theme: 'light' | 'dark', nodeId: string, inverse = false): Story {
  return {
    globals: { theme },
    parameters: figma(nodeId),
    render: () => placementExamples(inverse),
  };
}

export const Default: Story = themedStory('light', '2631-270');
export const DefaultDark: Story = themedStory('dark', '2631-345');
export const DefaultInverse: Story = themedStory('light', '2631-270', { inverse: true });
export const DefaultInverseDark: Story = themedStory('dark', '2631-345', { inverse: true });

export const Placements: Story = placementsStory('light', '2631-266');
export const PlacementsDark: Story = placementsStory('dark', '2631-266');
export const PlacementsInverse: Story = placementsStory('light', '2631-266', true);
export const PlacementsInverseDark: Story = placementsStory('dark', '2631-266', true);

export const WithShortcut: Story = themedStory('light', '2631-270', { shortcut: '⌘C' });
export const WithShortcutDark: Story = themedStory('dark', '2631-345', { shortcut: '⌘C' });
export const WithShortcutInverse: Story = themedStory('light', '2631-270', { shortcut: '⌘C', inverse: true });
export const WithShortcutInverseDark: Story = themedStory('dark', '2631-345', { shortcut: '⌘C', inverse: true });

export const OnIconButton: Story = themedStory('light', '2631-270', { iconOnly: true });
export const OnIconButtonDark: Story = themedStory('dark', '2631-345', { iconOnly: true });
export const OnIconButtonInverse: Story = themedStory('light', '2631-270', { iconOnly: true, inverse: true });
export const OnIconButtonInverseDark: Story = themedStory('dark', '2631-345', { iconOnly: true, inverse: true });
