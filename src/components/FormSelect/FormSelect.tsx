import { useId, useRef, useState, useEffect } from 'react';
import '../../styles/icons.css';
import './FormSelect.css';

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  /** List of options. */
  options?: FormSelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Callback fired when selection changes. */
  onChange?: (value: string) => void;
  /** Renders the select in a disabled state. */
  disabled?: boolean;
  /** Field label shown above the select. */
  label?: string;
  /** Renders the select in an error state. */
  error?: boolean;
  /** Helper text shown below the select. */
  helperText?: string;
}

export function FormSelect({
  options = [],
  value: controlledValue,
  placeholder = 'Select',
  onChange,
  disabled = false,
  label,
  error = false,
  helperText,
}: FormSelectProps) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const value = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption?.label ?? '';

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  function handleToggle() {
    if (!disabled) setIsOpen((prev) => !prev);
  }

  function handleSelect(option: FormSelectOption) {
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  }

  return (
    <div className="form-select" data-error={error || undefined} ref={rootRef}>
      {label && (
        <label className="form-select-label" htmlFor={id}>
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        className="form-select-trigger"
        data-open={isOpen || undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={handleToggle}
      >
        <span className={['form-select-value', !selectedOption ? 'form-select-value--placeholder' : ''].filter(Boolean).join(' ')}>
          {displayLabel || placeholder}
        </span>
        <span className="material-symbols-outlined form-select-chevron" aria-hidden="true">
          keyboard_arrow_down
        </span>
      </button>

      {isOpen && (
        <ul className="form-select-dropdown" role="listbox" aria-label={label}>
          {options.map((option) => (
            <li
              key={option.value}
              className="form-select-option"
              role="option"
              aria-selected={option.value === value}
              data-selected={option.value === value || undefined}
              onMouseDown={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && (
            <li className="form-select-option form-select-option--empty">No options</li>
          )}
        </ul>
      )}

      {helperText && (
        <span className={['form-select-helper', error ? 'form-select-helper--error' : ''].filter(Boolean).join(' ')}>
          {helperText}
        </span>
      )}
    </div>
  );
}
