import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Map } from './Map';
import { MapMarker } from './MapMarker';
import './Map.stories.css';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA}${nodeId}` } });

function StaticProvider() {
  const [selected, setSelected] = useState(1);
  return <div className="map-story-provider">
    <svg className="map-story-provider__image" viewBox="0 0 640 360" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="var(--color-bg-placeholder)" />
      <path d="M65 0v360M205 0v360M372 0v360M530 0v360M0 78h640M0 218h640" stroke="var(--color-bg-page)" strokeWidth="10" />
      <path d="M0 314 640 28" stroke="var(--color-bg-page)" strokeWidth="14" />
      <path d="M0 150h640M292 0v360" stroke="var(--color-border-default)" strokeWidth="2" />
      <path d="M428 252h212v108H428z" fill="var(--color-bg-page)" opacity=".5" />
    </svg>
    <MapMarker className="map-story-provider__marker map-story-provider__marker--one" accessibleName="Property on Hill Street, €320,000" type="label" label="€320K" selected={selected === 1} onClick={() => setSelected(1)} />
    <MapMarker className="map-story-provider__marker map-story-provider__marker--two" accessibleName="Property on Park Avenue, €410,000" type="label" label="€410K" selected={selected === 2} onClick={() => setSelected(2)} />
    <MapMarker className="map-story-provider__marker map-story-provider__marker--three" accessibleName="Selected property near the park" selected={selected === 3} onClick={() => setSelected(3)} />
  </div>;
}

const meta = {
  title: 'Data display/Map',
  component: Map,
  args: { label: 'Map of the property location' },
  parameters: { layout: 'padded', ...figma('2778-1290'), docs: { description: { component: 'Map is a provider-independent frame. Supply Google Maps, Apple Maps, OpenStreetMap, or another provider in the children slot; keep the address visible as text outside the map.' } } },
  tags: ['autodocs'],
  argTypes: { children: { control: false }, onZoomIn: { control: false }, onZoomOut: { control: false }, attribution: { control: false } },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Map of the property location' } };

export const Ratios: Story = {
  render: () => <div className="map-story-ratios">{(['16:9', '4:3', '1:1', '21:9'] as const).map((ratio) => <Map key={ratio} label={`Map with ${ratio} ratio`} ratio={ratio} showControls={false} attribution={null} />)}</div>,
};

export const WithoutControls: Story = { args: { label: 'Neighborhood map', showControls: false } };
export const Markers: Story = { args: { children: <StaticProvider />, attribution: 'Map data © OpenStreetMap contributors' } };
export const StaticProviderExample: Story = {
  args: { children: <StaticProvider />, attribution: 'Map data © OpenStreetMap contributors', onZoomIn: () => undefined, onZoomOut: () => undefined },
  parameters: { ...figma('2778-1095') },
};
export const Dark: Story = { globals: { theme: 'dark' }, args: { children: <StaticProvider />, attribution: 'Map data © OpenStreetMap contributors', onZoomIn: () => undefined, onZoomOut: () => undefined } };
