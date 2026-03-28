import { useId, useRef, useState } from 'react';
import '../../styles/icons.css';
import './FormDate.css';

export interface FormDateProps {
  /** Controlled value in DD/MM/YYYY format (converted internally to YYYY-MM-DD for the input). */
  value?: string;
  /** Callback fired on change; value is DD/MM/YYYY. */
  onChange?: (value: string) => void;
  /** Minimum selectable date (YYYY-MM-DD). */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD). */
  max?: string;
  /** Renders the field in a disabled state. */
  disabled?: boolean;
  /** Field label shown above the date field. */
  label?: string;
}

/** Convert DD/MM/YYYY → YYYY-MM-DD for <input type="date"> value attribute. */
function toInputValue(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split('/');
  if (!d || !m || !y) return '';
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

/** Convert YYYY-MM-DD → DD/MM/YYYY for the onChange callback. */
function toDisplayValue(yyyymmdd: string): string {
  const [y, m, d] = yyyymmdd.split('-');
  if (!y || !m || !d) return '';
  return `${d}/${m}/${y}`;
}

export function FormDate({
  value: controlledValue,
  onChange,
  min,
  max,
  disabled = false,
  label,
}: FormDateProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const value = isControlled ? controlledValue : internalValue;

  const inputValue = value ? toInputValue(value) : '';

  function handleChange(raw: string) {
    const display = toDisplayValue(raw);
    if (!isControlled) setInternalValue(display);
    onChange?.(display);
  }

  function handleIconClick() {
    if (disabled) return;
    try {
      inputRef.current?.showPicker();
    } catch {
      inputRef.current?.focus();
    }
  }

  return (
    <div className="form-date">
      {label && (
        <label className="form-date-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="form-date-inner">
        <input
          ref={inputRef}
          id={id}
          type="date"
          className="form-date-input"
          value={inputValue}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          type="button"
          className="form-date-icon-btn"
          aria-label="Open date picker"
          tabIndex={-1}
          disabled={disabled}
          onClick={handleIconClick}
        >
          <span className="material-symbols-outlined form-date-icon" aria-hidden="true">
            calendar_today
          </span>
        </button>
      </div>
    </div>
  );
}
