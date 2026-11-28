import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Link, Tag, Text } from '../src/components';
import './ExperienceEntry.css';

const secondary = 'var(--color-text-secondary)';

function Dates({ start, from, end, to }: { start: string; from: string; end?: string; to: string }) {
  return (
    <div className="experience-recipe__dates">
      <Text style="caption" color={secondary}>
        <time dateTime={start}>{from}</time> – {end ? <time dateTime={end}>{to}</time> : to}
      </Text>
    </div>
  );
}

function ExperienceEntryExample() {
  return (
    <section className="experience-recipe" aria-label="Experience">
      <Text as="h2" style="h3">Experience</Text>
      <ol className="experience-recipe__list" role="list">
        <li>
          <article className="experience-recipe__entry">
            <header className="experience-recipe__header">
              <Text as="h3" style="h5">Product designer · Design systems</Text>
              <Text style="body-2" color={secondary}>Northwind Studio · Barcelona, Spain</Text>
              <Dates start="2023-09" from="Sep 2023" to="Present" />
            </header>
            <Text as="p" style="body-2" className="experience-recipe__description">
              Leads the design system used by four product teams, including components, tokens and documentation.
            </Text>
            <div className="experience-recipe__tags">
              {['Design systems', 'Figma', 'Storybook', 'Accessibility'].map(label => <Tag key={label} label={label} type="subtle" size="sm" />)}
            </div>
            <Link size="small" label="View case study" href="/?path=/docs/patterns-experience-entry--docs" />
          </article>
        </li>
        <li>
          <Divider decorative />
          <article className="experience-recipe__entry">
            <header className="experience-recipe__header">
              <Text as="h3" style="h5">Brightline</Text>
              <Text style="body-2" color={secondary}>Remote</Text>
              <Dates start="2019-03" from="Mar 2019" end="2023-08" to="Aug 2023 · 4 yrs 6 mos" />
            </header>
            <div className="experience-recipe__group">
              <Divider decorative orientation="vertical" />
              <ol className="experience-recipe__roles" role="list">
                <li className="experience-recipe__entry">
                  <header className="experience-recipe__header">
                    <Text as="h4" style="h6">Senior UX designer</Text>
                    <Dates start="2021-01" from="Jan 2021" end="2023-08" to="Aug 2023" />
                  </header>
                  <Text as="p" style="body-2">Owned onboarding and billing flows.</Text>
                </li>
                <li className="experience-recipe__entry">
                  <header className="experience-recipe__header">
                    <Text as="h4" style="h6">UX designer</Text>
                    <Dates start="2019-03" from="Mar 2019" end="2020-12" to="Dec 2020" />
                  </header>
                  <Text as="p" style="body-2">Redesigned the reporting dashboard and set up usability tests.</Text>
                </li>
              </ol>
            </div>
          </article>
        </li>
        <li>
          <Divider decorative />
          <article className="experience-recipe__entry">
            <header className="experience-recipe__header">
              <Text as="h3" style="h5">UI designer</Text>
              <Text style="body-2" color={secondary}>Atlas Labs · Madrid, Spain</Text>
              <Dates start="2017-06" from="Jun 2017" end="2019-02" to="Feb 2019" />
            </header>
            <Text as="p" style="body-2">Designed interfaces for B2B web apps and a marketing site.</Text>
          </article>
        </li>
      </ol>
    </section>
  );
}

const meta = {
  title: 'Patterns/Experience entry',
  component: ExperienceEntryExample,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2921-1697' },
  },
} satisfies Meta<typeof ExperienceEntryExample>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Experience: Story = {};
export const Dark: Story = { globals: { theme: 'dark' } };
