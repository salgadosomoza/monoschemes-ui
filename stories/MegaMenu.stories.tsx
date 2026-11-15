import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHeader } from '../src/components/AppHeader';
import { Button } from '../src/components/Button';
import { MegaMenu } from '../src/components/MegaMenu';
import { Nav } from '../src/components/Nav';
import { NavItem } from '../src/components/NavItem';

const groups = [
  { heading: 'Build', items: [{ label: 'Components', description: 'Reusable interface pieces', href: '#components' }, { label: 'Patterns', description: 'Common product flows', href: '#patterns' }] },
  { heading: 'Learn', items: [{ label: 'Guides', description: 'Start with the basics', href: '#guides' }, { label: 'Resources', description: 'Documentation and examples', href: '#resources' }] },
];
const meta = { title: 'Components/Mega menu', component: MegaMenu, tags: ['autodocs'], parameters: { layout: 'fullscreen', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2506-299' } } } satisfies Meta<typeof MegaMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return <div style={{ maxWidth: 1280, margin: '0 auto', padding: 24 }}><AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /><NavItem label="Pricing" href="#pricing" /><NavItem label="About" href="#about" /></Nav>} megaMenu={<MegaMenu id="products" groups={groups} featured={<><strong>Featured</strong><p>Build a clearer interface with our component library.</p><Button variant="secondary" size="sm" label="Explore components" /></>} />} defaultMegaMenuOpen={defaultOpen} /></div>;
}

export const Interactive: Story = { render: () => <Demo /> };
export const Open: Story = { render: () => <Demo defaultOpen /> };
export const OpenDark: Story = { ...Open, globals: { theme: 'dark' } };
export const Compact: Story = { render: () => <div style={{ width: 390, margin: 24 }}><AppHeader logo={{ type: 'text', label: 'MonoSchemes' }} nav={<Nav><NavItem label="Products" hasMenu menuId="products" /><NavItem label="Pricing" href="#pricing" /></Nav>} megaMenu={<MegaMenu id="products" groups={groups} />} defaultMenuOpen /></div>, parameters: { viewport: { defaultViewport: 'mobile360' }, design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2506-346' } } };
