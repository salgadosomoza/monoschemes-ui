import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Link } from '../Link';
import { Footer, FooterColumn } from './index';

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen', design: { type: 'figma', url: `${FIGMA_BASE}2271-269` } },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBrandAndSocials: Story = {
  args: { columns: null, legal: '' },
  render: () => (
    <Footer
      brandName="MonoSchemes"
      brandDescription="A thoughtful design system for clear, consistent interfaces."
      legal="© 2026 MonoSchemes. All rights reserved."
      columns={(
        <>
          <FooterColumn heading="Product">
            <Link size="small" label="Components" href="#components" />
            <Link size="small" label="Tokens" href="#tokens" />
            <Link size="small" label="Changelog" href="#changelog" />
          </FooterColumn>
          <FooterColumn heading="Resources">
            <Link size="small" label="Documentation" href="#documentation" />
            <Link size="small" label="Storybook" href="#storybook" />
            <Link size="small" label="Support" href="#support" />
          </FooterColumn>
          <FooterColumn heading="Company">
            <Link size="small" label="About" href="#about" />
            <Link size="small" label="Contact" href="#contact" />
          </FooterColumn>
        </>
      )}
      meta={(
        <>
          <Button variant="tertiary" size="sm" iconOnly iconLeft="brand-github" label="GitHub" />
          <Button variant="tertiary" size="sm" iconOnly iconLeft="brand-x" label="X" />
          <Button variant="tertiary" size="sm" iconOnly iconLeft="brand-instagram" label="Instagram" />
        </>
      )}
    />
  ),
};

export const WithoutBrandAndLegalLinks: Story = {
  args: { columns: null, legal: '' },
  render: () => (
    <Footer
      showBrand={false}
      legal="© 2026 TTS. All rights reserved."
      columns={(
        <>
          <FooterColumn heading="Explore">
            <Link size="small" label="Stories" href="#stories" />
            <Link size="small" label="About TTS" href="#about" />
          </FooterColumn>
          <FooterColumn heading="Help">
            <Link size="small" label="Help center" href="#help" />
            <Link size="small" label="Contact us" href="#contact" />
          </FooterColumn>
        </>
      )}
      meta={(
        <>
          <Link size="small" label="Privacy" href="#privacy" />
          <Link size="small" label="Terms" href="#terms" />
          <Link size="small" label="Cookies" href="#cookies" />
        </>
      )}
    />
  ),
};
