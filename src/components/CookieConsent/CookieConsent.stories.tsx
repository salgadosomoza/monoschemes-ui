import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CookieBanner, CookiePreferences } from './CookieConsent';
import { Button } from '../Button';
import { DescriptionList } from '../DescriptionList';
import { Footer } from '../Footer';
import { Prose } from '../Prose';
import { Text } from '../Text';

const categories = [
  { id: 'necessary', name: 'Necessary', description: 'Needed for the site to work, such as remembering your choice.', required: true },
  { id: 'analytics', name: 'Analytics', description: 'Help us understand which pages people visit so we can improve them.' },
  { id: 'marketing', name: 'Marketing', description: 'Used to show relevant ads on other sites. We use these only with your permission.' },
];

const description = 'Choose which cookies we can use. Necessary cookies are always on. You can change this at any time from the link in the footer.';

function ConsentExample({ layout = 'bar' }: { layout?: 'bar' | 'card' }) {
  const [choice, setChoice] = useState<string[]>();
  const [open, setOpen] = useState(false);

  function save(selection: string[]) {
    setChoice(selection);
    setOpen(false);
  }

  const onAcceptAll = () => save(categories.map(category => category.id));
  const onRejectAll = () => save(['necessary']);

  return (
    <>
      {!choice && (
        <CookieBanner
          layout={layout}
          message="We use necessary cookies to make this site work. With your permission we use analytics cookies to understand how it is used."
          policyHref="/?path=/story/feedback-cookie-consent--policy"
          onOpenPreferences={() => setOpen(true)}
          onAcceptAll={onAcceptAll}
          onRejectAll={onRejectAll}
        />
      )}
      <Footer variant="minimal" columns={null} legal="© Example" meta={<Button variant="link" label="Cookie settings" onClick={() => setOpen(true)} />} />
      <CookiePreferences
        open={open}
        onClose={() => setOpen(false)}
        value={choice}
        description={description}
        categories={categories}
        onSave={save}
        onAcceptAll={onAcceptAll}
        onRejectAll={onRejectAll}
      />
    </>
  );
}

const meta = {
  title: 'Feedback/Cookie consent',
  component: ConsentExample,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2917-864' },
  },
} satisfies Meta<typeof ConsentExample>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = {};
export const Card: Story = { args: { layout: 'card' } };
export const Dark: Story = { globals: { theme: 'dark' } };
export const Policy: Story = {
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2919-930' },
  },
  render: () => (
    <main style={{ margin: 'var(--spacing-xl)' }}>
      <Text as="h1" style="h1">Cookie policy</Text>
      <Prose style={{ marginBlock: 'var(--spacing-lg)' }}>
        <p>This example describes the cookies a site can use. Use the preferences below to manage your choice.</p>
      </Prose>
      <CookiePreferences
        layout="inline"
        description={description}
        categories={categories}
        onSave={() => undefined}
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
      />
      <section style={{ marginBlockStart: 'var(--spacing-xl)' }}>
        <Text as="h2" style="h4">Cookies on this site</Text>
        <DescriptionList items={[
          { term: 'Name', description: 'cookie-preferences' },
          { term: 'Provider', description: 'This site' },
          { term: 'Category', description: 'Necessary' },
          { term: 'Purpose', description: 'Remember consent' },
          { term: 'Duration', description: '6 months' },
        ]} />
      </section>
    </main>
  ),
};
