import './Chip.css';

export type ChipType = 'default' | 'drag';

export interface ChipProps {
  /** Determines the chip layout: default (label + close) or drag (handle + label + close). */
  type?: ChipType;
  /** Text label displayed inside the chip. */
  label?: string;
  /** Callback fired when the close button is clicked. */
  onClose?: () => void;
  /** Makes the chip HTML5 draggable. Auto-enabled when type="drag". */
  draggable?: boolean;
}

function DragHandle() {
  return (
    <svg
      className="chip-drag-handle"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5" cy="4" r="1.5" />
      <circle cx="11" cy="4" r="1.5" />
      <circle cx="5" cy="8" r="1.5" />
      <circle cx="11" cy="8" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="11" cy="12" r="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Chip({
  type = 'default',
  label = 'Chip name',
  onClose,
  draggable,
}: ChipProps) {
  const isDraggable = draggable ?? type === 'drag';

  return (
    <div
      className="chip"
      data-type={type}
      draggable={isDraggable || undefined}
    >
      {type === 'drag' && <DragHandle />}
      <span className="chip-label">{label}</span>
      <button
        className="chip-close"
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
