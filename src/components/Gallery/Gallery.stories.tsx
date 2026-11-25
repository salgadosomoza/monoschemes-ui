import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Gallery } from './Gallery';
import { GalleryViewer } from './GalleryViewer';
import type { GalleryImage } from './types';

const images: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', alt: 'Modern house surrounded by trees', caption: 'A calm home among the trees' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80', alt: 'Bright living room with a sofa and plants', caption: 'Living room' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80', alt: 'Open kitchen with a central island', caption: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80', alt: 'Dining room beside a large window', caption: 'Dining room' },
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', alt: 'Minimal bedroom with a large window', caption: 'Bedroom' },
];

const figma = (nodeId: string) => ({
  design: {
    type: 'figma',
    url: `https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=${nodeId}`,
  },
});

const meta = {
  title: 'Data display/Gallery',
  component: Gallery,
  args: { images },
  parameters: {
    layout: 'padded',
    ...figma('2775-1061'),
    docs: { description: { component: 'Use Gallery for a small set of photos. Keep no more than three photos in the page layout; the viewer gives access to the full collection.' } },
  },
  tags: ['autodocs'],
  argTypes: { images: { control: false } },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Featured: Story = {};

const fluidStory = (width: number): Story => ({
  render: (args) => <div style={{ maxWidth: width }}><Gallery {...args} /></div>,
  parameters: { layout: 'fullscreen' },
});

export const Fluid1312: Story = { name: 'Fluid at 1312 px', ...fluidStory(1312) };
export const Fluid900: Story = { name: 'Fluid at 900 px', ...fluidStory(900) };
export const Grid: Story = { args: { layout: 'grid' } };
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
export const SinglePhoto: Story = { args: { images: images.slice(0, 1), showAll: false } };
export const ViewerOpen: Story = {
  render: () => {
    const ViewerExample = () => {
      const [index, setIndex] = useState(0);
      const [open, setOpen] = useState(true);
      return open ? <GalleryViewer images={images} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} /> : <Gallery images={images} />;
    };
    return <ViewerExample />;
  },
  parameters: { ...figma('2775-1062'), viewport: { defaultViewport: 'fullscreen' } },
};

export const Inverse: Story = {
  render: (args) => <div data-theme="inverse" style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-page)' }}><Gallery {...args} /></div>,
};

export const Dark: Story = { globals: { theme: 'dark' } };
