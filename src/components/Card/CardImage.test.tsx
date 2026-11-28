import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardImage } from './CardImage';

describe('CardImage', () => {
  it('renders an accessible image, selected aspect ratio, and content slot', () => {
    render(
      <CardImage src="/home.jpg" alt="A home with a garden" ratio="4:3">
        <h2>Casa Olivar</h2>
      </CardImage>,
    );

    expect(screen.getByRole('img', { name: 'A home with a garden' }).getAttribute('src')).toBe('/home.jpg');
    expect(screen.getByText('Casa Olivar')).toBeTruthy();
    expect(screen.getByRole('img').parentElement?.getAttribute('data-ratio')).toBe('4:3');
  });
});
