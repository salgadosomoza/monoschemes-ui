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

function FeaturedBand({ theme, title, message }: { theme?: 'inverse' | 'dark'; title: string; message: string }) {
  return (
    <section data-theme={theme} style={{ padding: 'var(--spacing-2xl)', background: 'var(--color-bg-page)' }}>
      <Text style="h3" as="h2">{title}</Text>
      <Text as="p" style="body-2" color="var(--color-text-secondary)">{message}</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-md)', marginTop: 'var(--spacing-md)' }}>
        <Button label={theme === 'dark' ? 'Play video' : 'Get started'} />
        <Button variant="secondary" label="Learn more" />
      </div>
    </section>
  );
}

export const FeaturedSections: Story = {
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2932-2070' },
  },
  render: () => (
    <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'var(--gap-lg)' }}>
      {(['light', 'dark'] as const).map(theme => (
        <div key={theme} data-theme={theme} aria-label={`${theme} page`}>
          <FeaturedBand title="Plan your week in minutes" message={`Regular content on the ${theme} page.`} />
          <FeaturedBand theme="inverse" title="Ship faster with one system" message="Dark on a Light page, light on a Dark page." />
          <FeaturedBand theme="dark" title="Watch the launch film" message="Stays dark in both page themes." />
        </div>
      ))}
    </main>
  ),
};
