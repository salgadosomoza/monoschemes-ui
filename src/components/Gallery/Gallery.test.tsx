import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Gallery } from './Gallery';

afterEach(cleanup);

const images = [
  { src: '/one.jpg', alt: 'Front of the house', caption: 'Front' },
  { src: '/two.jpg', alt: 'Bright living room', caption: 'Living room' },
  { src: '/three.jpg', alt: 'Kitchen with island', caption: 'Kitchen' },
  { src: '/four.jpg', alt: 'Garden patio', caption: 'Patio' },
];

describe('Gallery', () => {
  it('opens the viewer from a photo and exposes meaningful photo names', async () => {
    render(<Gallery images={images} />);
    const opener = screen.getAllByRole('button', { name: 'Open photo 2 of 4: Bright living room' })[0];
    fireEvent.click(opener);

    expect(await screen.findByRole('dialog', { name: 'Photo gallery' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeTruthy();
    expect(screen.getByText('2 / 4')).toBeTruthy();
    const dialog = screen.getByRole('dialog', { name: 'Photo gallery' });
    expect(within(dialog).getByRole('img', { name: 'Bright living room' })).toBeTruthy();
    expect(within(dialog).getByRole('button', { name: 'Show photo 2: Bright living room' }).getAttribute('aria-current')).toBe('true');
  });

  it('supports arrow, Home and End navigation and updates the live count', async () => {
    render(<Gallery images={images} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Open photo 1 of 4: Front of the house' })[0]);
    const dialog = await screen.findByRole('dialog');

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(within(dialog).getByText('2 / 4')).toBeTruthy();
    fireEvent.keyDown(dialog, { key: 'End' });
    expect(within(dialog).getByText('4 / 4')).toBeTruthy();
    fireEvent.keyDown(dialog, { key: 'Home' });
    expect(within(dialog).getByText('1 / 4')).toBeTruthy();
  });

  it('traps focus and returns focus to the opener on Escape', async () => {
    render(<Gallery images={images} />);
    const opener = screen.getAllByRole('button', { name: 'Open photo 1 of 4: Front of the house' })[0];
    opener.focus();
    fireEvent.click(opener);
    const close = await screen.findByRole('button', { name: 'Close gallery' });
    await waitFor(() => expect(document.activeElement).toBe(close));

    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(within(screen.getByRole('dialog')).getByRole('button', { name: 'Show photo 4: Garden patio' }));
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(opener);
  });

  it('moves through photos with the viewer controls', async () => {
    render(<Gallery images={images} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Open photo 1 of 4: Front of the house' })[0]);
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Next photo' }));
    expect(within(dialog).getByText('2 / 4')).toBeTruthy();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Previous photo' }));
    expect(within(dialog).getByText('1 / 4')).toBeTruthy();
  });

  it('changes the mobile photo on a horizontal swipe', () => {
    const { container } = render(<Gallery images={images} />);
    const mobileGallery = container.querySelector('.gallery__mobile');
    expect(mobileGallery).toBeTruthy();
    fireEvent.touchStart(mobileGallery as HTMLElement, { changedTouches: [{ clientX: 120 }] });
    fireEvent.touchEnd(mobileGallery as HTMLElement, { changedTouches: [{ clientX: 60 }] });
    expect(within(mobileGallery as HTMLElement).getByText('2 / 4')).toBeTruthy();
  });
});
