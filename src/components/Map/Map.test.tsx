import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Map } from './Map';
import { MapMarker } from './MapMarker';

afterEach(cleanup);

describe('Map', () => {
  it('renders an accessible named map and provider-connected zoom controls', () => {
    const zoomIn = vi.fn();
    const zoomOut = vi.fn();
    render(<Map label="Map of the property location" ratio="4:3" onZoomIn={zoomIn} onZoomOut={zoomOut} />);

    expect(screen.getByRole('region', { name: 'Map of the property location' }).getAttribute('data-ratio')).toBe('4:3');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(zoomIn).toHaveBeenCalledOnce();
    expect(zoomOut).toHaveBeenCalledOnce();
  });

  it('can hide controls and accepts provider content', () => {
    render(<Map label="Neighborhood map" showControls={false}><div data-testid="provider-map">Map provider</div></Map>);
    expect(screen.queryByRole('button', { name: 'Zoom in' })).toBeNull();
    expect(screen.getByTestId('provider-map')).toBeTruthy();
  });

  it('renders MapMarker as a focusable pressed-state button', () => {
    const onClick = vi.fn();
    render(<MapMarker type="label" label="€320K" selected accessibleName="Property in Gràcia, €320,000" onClick={onClick} />);
    const marker = screen.getByRole('button', { name: 'Property in Gràcia, €320,000' });
    expect(marker.getAttribute('aria-pressed')).toBe('true');
    marker.focus();
    expect(document.activeElement).toBe(marker);
    fireEvent.click(marker);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
