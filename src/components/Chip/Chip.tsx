import './Chip.css';
import { Icon } from '../Icon';

export type ChipType = 'default' | 'drag';

export interface ChipProps {
  /** Determines the chip layout: default (label + close) or drag (handle + label + close). */
  type?: ChipType;
  /** Text label displayed inside the chip. */
  label?: string;
  /** Shows the remove control. Defaults to true. */
  showClose?: boolean;
  /** Applies the selected state. */
  selected?: boolean;
  /** Makes the label a selection toggle and reports the next selected state. */
  onSelectedChange?: (selected: boolean) => void;
  /** Callback fired when the close button is clicked. */
  onClose?: () => void;
  /** Makes the chip HTML5 draggable. Auto-enabled when type="drag". */
  draggable?: boolean;
}

export function Chip({
  type = 'default',
  label = 'Chip name',
  showClose = true,
  selected = false,
  onSelectedChange,
  onClose,
  draggable,
}: ChipProps) {
  const isDraggable = draggable ?? type === 'drag';

  return (
    <div
      className="chip"
      data-type={type}
      data-selected={selected || undefined}
      draggable={isDraggable || undefined}
    >
      {type === 'drag' && <Icon className="chip-drag-handle" name="grip-vertical" size={16} />}
      {onSelectedChange ? (
        <button
          className="chip-label chip-label-toggle"
          type="button"
          aria-pressed={selected}
          onClick={() => onSelectedChange(!selected)}
        >
          {label}
        </button>
      ) : (
        <span className="chip-label">{label}</span>
      )}
      {showClose && (
        <button
          className="chip-close"
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onClose}
        >
          <Icon name="x" size={24} />
        </button>
      )}
    </div>
  );
}
