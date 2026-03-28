import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import type { GridType } from './Grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['small', 'medium', 'large', 'max', 'full'] satisfies GridType[],
      description: 'Breakpoint preset controlling column count and padding.',
    },
    columns: {
      control: 'number',
      description: 'Override the column count.',
    },
    gap: {
      control: 'text',
      description: 'Override the column gap.',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// ─── Placeholder cell ────────────────────────────────

function Cell({ index }: { index: number }) {
  return (
    <div
      style={{
        background: index % 2 === 0 ? '#E2E5E9' : '#CFCFCF',
        height: 48,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        color: '#40444A',
      }}
    >
      {index + 1}
    </div>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 24, background: '#F6F7F9', minHeight: '100vh' }}>
      {children}
    </div>
  );
}

// ─── Individual type stories ─────────────────────────

export const Small: Story = {
  parameters: figma('106-1129'),
  render: () => (
    <Wrapper>
      <Grid type="small">
        {Array.from({ length: 4 }, (_, i) => <Cell key={i} index={i} />)}
      </Grid>
    </Wrapper>
  ),
};

export const Medium: Story = {
  parameters: figma('106-1127'),
  render: () => (
    <Wrapper>
      <Grid type="medium">
        {Array.from({ length: 8 }, (_, i) => <Cell key={i} index={i} />)}
      </Grid>
    </Wrapper>
  ),
};

export const Large: Story = {
  parameters: figma('106-1126'),
  render: () => (
    <Wrapper>
      <Grid type="large">
        {Array.from({ length: 16 }, (_, i) => <Cell key={i} index={i} />)}
      </Grid>
    </Wrapper>
  ),
};

export const Max: Story = {
  parameters: figma('106-1128'),
  render: () => (
    <Wrapper>
      <Grid type="max">
        {Array.from({ length: 16 }, (_, i) => <Cell key={i} index={i} />)}
      </Grid>
    </Wrapper>
  ),
};

export const Full: Story = {
  parameters: figma('870-1323'),
  render: () => (
    <Wrapper>
      <Grid type="full">
        {Array.from({ length: 16 }, (_, i) => <Cell key={i} index={i} />)}
      </Grid>
    </Wrapper>
  ),
};

// ─── All types ───────────────────────────────────────

const TYPE_COLS: Record<GridType, number> = {
  small: 4,
  medium: 8,
  large: 16,
  max: 16,
  full: 16,
};

export const AllTypes: Story = {
  parameters: figma('106-1130'),
  render: () => (
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {(['small', 'medium', 'large', 'max', 'full'] as GridType[]).map((type) => (
          <div key={type}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#40444A',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 700,
              }}
            >
              {type} · {TYPE_COLS[type]} cols
            </p>
            <Grid type={type}>
              {Array.from({ length: TYPE_COLS[type] }, (_, i) => (
                <Cell key={i} index={i} />
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </Wrapper>
  ),
};
