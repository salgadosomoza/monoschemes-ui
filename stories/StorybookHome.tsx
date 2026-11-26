import { version } from '../package.json';
import { FeatureCard } from '../src/components/Card/FeatureCard';
import { CodeBlock } from '../src/components/CodeBlock';
import { Divider } from '../src/components/Divider';
import { Icon, type IconName } from '../src/components/Icon';
import { Link } from '../src/components/Link';
import { Tag } from '../src/components/Tag';
import { Text } from '../src/components/Text';
import './storybook-home.css';

const sections = [
  { title: 'Foundations', icon: 'palette', description: 'Principles, color, type, spacing, grid, motion, icons and the inverse zone.', href: '/?path=/docs/foundations-principles--docs' },
  { title: 'Components', icon: 'box', description: 'Accessible React components for actions, forms, navigation, feedback, data, layout and agents.', href: '/?path=/docs/actions-button--docs' },
  { title: 'Patterns', icon: 'file-text', description: 'Recipes that combine components into common screens, such as listings and detail pages.', href: '/?path=/docs/patterns-listing-card--docs' },
] satisfies { title: string; icon: IconName; description: string; href: string }[];

const steps = [
  ['Install and import the styles', 'Import @monoschemes/ui/style.css once, at the root of your app.'],
  ['Load the fonts', 'Load Inter and JetBrains Mono. The package does not bundle fonts.'],
  ['Set the theme', 'Use data-theme="light" or "dark" on <html>, and "inverse" for a contrasting zone.'],
];

const code = `npm install @monoschemes/ui

import '@monoschemes/ui/style.css';
import { Button } from '@monoschemes/ui';

<html data-theme="light">`;

const resources = [
  { label: 'Figma kit', href: 'https://www.figma.com/community/file/1706316593970846496/monoschemes-monochrome-ui-kit', icon: 'external-link' },
  { label: 'npm package', href: 'https://www.npmjs.com/package/@monoschemes/ui', icon: 'external-link' },
  { label: 'GitHub', href: 'https://github.com/salgadosomoza/monoschemes-ui', icon: 'brand-github' },
  { label: 'llms.txt for agents', href: '/llms.txt', icon: 'external-link' },
] satisfies { label: string; href: string; icon: IconName }[];

export function StorybookHome({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div className="storybook-home" data-theme={theme}>
      <div className="storybook-home__content">
        <header className="storybook-home__hero">
          <span className="storybook-home__mark" aria-hidden="true" />
          <Text style="overline" color="var(--color-text-secondary)">Design system · Figma + React</Text>
          <Text as="h1" style="display-3" className="storybook-home__title" color="var(--color-text-strong)" fullWidth>MonoSchemes</Text>
          <Text style="body-1">A monochrome design system with Light, Dark and inverse themes. Components are designed in Figma and built in React as @monoschemes/ui, with the same names, tokens and states on both sides.</Text>
          <div className="storybook-home__facts">
            {[`v${version}`, 'React + TypeScript', 'Light · Dark · Inverse', 'Figma kit included'].map((label) => (
              <Tag key={label} label={label} type="subtle" size="sm" />
            ))}
          </div>
        </header>
        <section className="storybook-home__section">
          <Text as="h2" style="h4" color="var(--color-text-strong)">Explore the system</Text>
          <div className="storybook-home__cards">
            {sections.map(({ title, icon, description, href }) => (
              <a className="storybook-home__card-link" href={href} target="_parent" key={title}>
                <FeatureCard title={title} icon={icon} description={description} />
              </a>
            ))}
          </div>
        </section>
        <section className="storybook-home__section">
          <Text as="h2" style="h4" color="var(--color-text-strong)">Quick start</Text>
          <div className="storybook-home__quick-start">
            <CodeBlock filename="Terminal and main.tsx" code={code} />
            <ol className="storybook-home__steps">
              {steps.map(([title, description]) => (
                <li key={title}>
                  <Text as="strong" style="subtitle-2" color="var(--color-text-strong)">{title}</Text>
                  <Text style="body-2" color="var(--color-text-secondary)">{description}</Text>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <footer className="storybook-home__section">
          <Divider />
          <Text as="h2" style="h6" color="var(--color-text-strong)">Resources</Text>
          <div className="storybook-home__resources">
            {resources.map(({ label, href, icon }) => (
              <Link key={href} type="icon" label={label} href={href} target="_blank" icon={<Icon name={icon} size={16} />} />
            ))}
          </div>
          <Text style="caption" color="var(--color-text-muted)">Open source under the MIT license.</Text>
        </footer>
      </div>
    </div>
  );
}
