import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from './Grid';
import { Container } from '../Container';

const design = { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2701-3632' };
const meta = { title: 'Foundations/Grid', component: Grid, tags: ['autodocs'], parameters: { design, layout: 'fullscreen' } } satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

const cell = { minHeight: 72, background: 'var(--color-grid-gutter)' };

export const Responsive: Story = {
  render: () => (
    <Container>
      <Grid>
        {Array.from({ length: 12 }, (_, index) => <GridItem key={index} style={cell} />)}
      </Grid>
    </Container>
  ),
};

export const Spans: Story = {
  render: () => (
    <Container>
      <Grid>
        <GridItem span={{ base: 4, sm: 5, md: 8 }} style={cell} />
        <GridItem span={{ base: 4, sm: 3, md: 4 }} style={cell} />
      </Grid>
    </Container>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <Container>
      <Grid minItemWidth="240px">
        {Array.from({ length: 6 }, (_, index) => <div key={index} style={cell} />)}
      </Grid>
    </Container>
  ),
};
