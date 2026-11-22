import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  EmptyState,
  Footer,
  Logo,
  SegmentedControl,
  Stat,
  Tag,
  Text,
} from '@monoschemes/ui';

type Theme = 'light' | 'dark';

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="prototype-app">
      <header className="prototype-header">
        <Logo type="text" label="MonoSchemes" href="#top" />
        <SegmentedControl
          aria-label="Page theme"
          options={themeOptions}
          value={theme}
          onChange={(value) => setTheme(value as Theme)}
        />
      </header>

      <main id="top" className="prototype-main">
        <section className="prototype-hero" data-theme="inverse" aria-label="Prototype introduction">
          <div className="prototype-hero__copy">
            <Tag label="Prototype starter" type="inverse" size="sm" />
            <Text as="h1" style="display-3" fullWidth>
              Make the idea tangible.
            </Text>
            <Text as="p" style="body-1" fullWidth>
              A small, working canvas for your next product concept. Replace this example with the screen your team needs.
            </Text>
          </div>
          <div className="prototype-hero__actions">
            <Button label="Explore the workspace" variant="primary" />
            <Button label="Read the guide" variant="secondary" />
          </div>
        </section>

        <section className="prototype-stats" aria-label="Workspace overview">
          <Stat label="Projects" value="08" />
          <Stat label="In progress" value="03" />
          <Stat label="Updated" value="Today" tone="muted" />
        </section>

        <Divider />

        <section className="prototype-content" aria-label="Workspace">
          <div className="prototype-content__main">
            <div className="prototype-section-heading">
              <div>
                <Text as="h2" style="h4" fullWidth>Workspace</Text>
                <Text as="p" style="body-2" color="var(--color-text-secondary)" fullWidth>
                  Use this page to explore a product flow with real MonoSchemes components.
                </Text>
              </div>
              <Button label="Create project" iconLeft="plus" />
            </div>

            <Card>
              <div className="prototype-card-heading">
                <Text as="h3" style="h6">Getting started</Text>
                <Tag label="Ready to edit" type="subtle" size="sm" />
              </div>
              <div className="prototype-details">
                <div className="prototype-detail-row">
                  <Text style="body-2" color="var(--color-text-muted)">Design system</Text>
                  <Text style="body-1">@monoschemes/ui</Text>
                </div>
                <Divider decorative />
                <div className="prototype-detail-row">
                  <Text style="body-2" color="var(--color-text-muted)">Theme</Text>
                  <Text style="body-1">Light, Dark, and adaptive inverse zones</Text>
                </div>
                <Divider decorative />
                <div className="prototype-detail-row">
                  <Text style="body-2" color="var(--color-text-muted)">Next step</Text>
                  <Text style="body-1">Describe the product screen you want to prototype</Text>
                </div>
              </div>
            </Card>
          </div>

          <aside className="prototype-content__aside" aria-label="Recent activity">
            <Card>
              <Text as="h3" style="h6">Recent activity</Text>
              <EmptyState
                icon="clock"
                title="Nothing here yet"
                description="Your prototype can replace this area with real activity or an empty state of its own."
                showIcon
              />
            </Card>
          </aside>
        </section>
      </main>

      <Footer variant="minimal" columns={null} legal="Prototype scaffold · Replace with your product content." />
    </div>
  );
}
