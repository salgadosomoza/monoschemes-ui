import { useId, useState } from 'react';
import './FormTextarea.css';

export interface FormTextareaProps {
  /** Controlled value. */
  value?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Callback fired on change. */
  onChange?: (value: string) => void;
  /** Number of visible rows. */
  rows?: number;
  /** Renders the textarea in a disabled state. */
  disabled?: boolean;
  /** Renders the textarea in an error state. */
  error?: boolean;
  /** Field label shown above the textarea. */
  label?: string;
  /** Helper text shown below the textarea. */
  helperText?: string;
  name?: string;
  autoComplete?: string;
  id?: string;
  required?: boolean;
}

export function FormTextarea({
  value: controlledValue,
  placeholder = 'Text',
  onChange,
  rows = 4,
  disabled = false,
  error = false,
  label,
  helperText,
  name,
  autoComplete,
  id: providedId,
  required = false,
}: FormTextareaProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const value = isControlled ? controlledValue : internalValue;

  function handleChange(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <div className="form-textarea" data-error={error || undefined}>
      {label && (
        <label className="form-textarea-label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        className={['form-textarea-field', error ? 'form-textarea-field--error' : ''].filter(Boolean).join(' ')}
        placeholder={placeholder}
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.value)}
      />
      {helperText && (
        <span className={['form-textarea-helper', error ? 'form-textarea-helper--error' : ''].filter(Boolean).join(' ')}>
          {helperText}
        </span>
      )}
    </div>
  );
}
