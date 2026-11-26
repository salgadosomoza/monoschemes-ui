import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, CardImage, Icon, Stat, Tag, Text } from '../src/components';

const meta = {
  title: 'Patterns/Listing card',
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2773-2663' },
    docs: {
      description: {
        component: 'Use for listing and search-result cards that combine a property image, status, key facts, price, and an action.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ListingCardExample() {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <CardImage
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960"
        alt="Modern home surrounded by greenery"
        ratio="4:3"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tag type="subtle" size="sm" label="For sale" />
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            iconLeft="heart"
            label={saved ? 'Remove from saved homes' : 'Save home'}
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
          />
        </div>
        <Text as="h3" style="subtitle-1">Casa Olivar</Text>
        <Text style="body-2" color="var(--color-text-secondary)">Santa Maria del Camí, Mallorca</Text>
        <Text style="h6">1,250,000 €</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, color: 'var(--color-text-secondary)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="bed" size={16} /> <Text style="caption" as="span">3 bedrooms</Text></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="bath" size={16} /> <Text style="caption" as="span">2 bathrooms</Text></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="ruler-measure" size={16} /> <Text style="caption" as="span">240 m²</Text></span>
        </div>
        <Button variant="secondary" label="View property" />
      </CardImage>
    </div>
  );
}

export const Default: Story = { render: () => <ListingCardExample /> };

export const WithStats: Story = {
  render: () => <div style={{ display: 'flex', gap: 16 }}><Stat label="Bedrooms" value="3" /><Stat label="Bathrooms" value="2" /><Stat label="Area" value="240" unit="m²" /></div>,
};
