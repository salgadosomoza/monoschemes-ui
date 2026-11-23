import './Map.css';

export type MapMarkerType = 'pin' | 'label';

export interface MapMarkerProps {
  type?: MapMarkerType;
  label?: string;
  selected?: boolean;
  /** Accessible name for this location. */
  accessibleName: string;
  /** Called when this location is selected. */
  onClick?: () => void;
  className?: string;
}

export function MapMarker({ type = 'pin', label = '€320K', selected = false, accessibleName, onClick, className }: MapMarkerProps) {
  return (
    <button
      type="button"
      className={['map-marker', className].filter(Boolean).join(' ')}
      data-type={type}
      data-selected={selected || undefined}
      aria-label={accessibleName}
      aria-pressed={selected}
      onClick={onClick}
    >
      {type === 'pin' ? (
        <span className="map-marker__pin" aria-hidden="true">
          <span className="map-marker__head"><span className="map-marker__dot" /></span>
          <span className="map-marker__tip" />
        </span>
      ) : (
        <span className="map-marker__label">{label}</span>
      )}
    </button>
  );
}
