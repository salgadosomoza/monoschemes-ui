import { Text } from '../src/components/Text';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { Chip } from '../src/components/Chip';
import { Link } from '../src/components/Link';

function InverseZoneDemo() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', width: '100%', maxWidth: 900, padding: 'var(--spacing-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--gap-md)' }}>
        <Button variant="primary" label="Primary" />
        <Button variant="secondary" label="Secondary" />
        <Link label="Link" href="#normal" />
      </div>

      <div data-theme="inverse" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)', padding: 'var(--spacing-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--gap-md)' }}>
          <Button variant="primary" label="Primary" />
          <Button variant="secondary" label="Secondary" />
          <Button variant="tertiary" label="Tertiary" />
          <Button variant="link" label="Button link" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--gap-md)' }}>
          <Link label="Link" href="#inverse" />
          <Link type="icon" label="Link with icon" href="#inverse-icon" />
          <Chip label="Chip name" />
          <Chip label="Selected chip" selected />
        </div>
      </div>
    </main>
  );
}

const meta = {
  title: 'Foundations/Inverse zone',
  component: InverseZoneDemo,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2450-315',
    },
    docs: {
      description: {
        component: 'Use `data-theme="inverse"` on a non-nested zone to make it resolve to the opposite color mode. Avoid Button danger inside an inverse zone.',
      },
    },
  },
} satisfies Meta<typeof InverseZoneDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InverseZone: Story = {};

export const DocsExample: Story = {
  render: () => (
    <section data-theme="inverse" style={{ padding: 'var(--spacing-xl)', background: 'var(--color-bg-page)' }}>
      <Text style="h5" as="h3">Ship faster with MonoSchemes</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-sm)', marginTop: 'var(--spacing-sm)' }}>
        <Button variant="primary" label="Get started" />
        <Button variant="secondary" label="Read the docs" />
      </div>
    </section>
  ),
};
