import type { ReactNode } from 'react';
import { Button } from '../Button';
import { MapCanvas } from './MapCanvas';
import './Map.css';

export type MapRatio = '16:9' | '4:3' | '1:1' | '21:9';

export interface MapProps {
  /** The map supplied by the chosen provider. */
  children?: ReactNode;
  /** Shape of the map viewport. */
  ratio?: MapRatio;
  /** Show provider-connected zoom controls. */
  showControls?: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  /** Provider attribution. Keep the provider's required attribution visible. */
  attribution?: ReactNode;
  /** Accessible name for this map region. */
  label: string;
}

export function Map({
  children,
  ratio = '16:9',
  showControls = true,
  onZoomIn,
  onZoomOut,
  attribution = 'Map data © provider',
  label,
}: MapProps) {
  return (
    <section className="map" data-ratio={ratio} role="region" aria-label={label}>
      <div className="map__canvas">{children ?? <MapCanvas />}</div>
      {showControls && (
        <div className="map__controls" aria-label="Map controls">
          <Button variant="secondary" size="md" iconOnly iconLeft="plus" label="Zoom in" disabled={!onZoomIn} onClick={onZoomIn} />
          <Button variant="secondary" size="md" iconOnly iconLeft="minus" label="Zoom out" disabled={!onZoomOut} onClick={onZoomOut} />
        </div>
      )}
      {attribution !== null && attribution !== undefined && <div className="map__attribution">{attribution}</div>}
    </section>
  );
}
