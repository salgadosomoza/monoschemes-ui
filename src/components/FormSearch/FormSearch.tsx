import { useId, useState } from 'react';
import './FormSearch.css';
import { Icon } from '../Icon';

export interface FormSearchProps {
  /** Controlled value. */
  value?: string;
  /** Visible field label. When omitted, the placeholder is used as the accessible name. */
  label?: string;
  /** Accessible name when a visible label is not suitable. */
  'aria-label'?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Callback fired on every keystroke. */
  onChange?: (value: string) => void;
  /** Callback fired when the user presses Enter. */
  onSearch?: (value: string) => void;
  /** Renders the field in a disabled state. */
  disabled?: boolean;
  name?: string;
  autoComplete?: string;
  id?: string;
  required?: boolean;
}

export function FormSearch({
  value: controlledValue,
  label,
  'aria-label': ariaLabel,
  placeholder = 'Search',
  onChange,
  onSearch,
  disabled = false,
  name,
  autoComplete,
  id: providedId,
  required = false,
}: FormSearchProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const value = isControlled ? controlledValue : internalValue;

  function handleChange(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSearch?.(value);
  }

  return (
    <div className="form-search">
      {label && <label className="form-search-label" htmlFor={id}>{label}</label>}
      <div className="form-search-inner">
        <span className="form-search-icon" aria-hidden="true"><Icon name="search" size={20} /></span>
        <input
          id={id}
          aria-label={ariaLabel ?? (label ? undefined : placeholder)}
          type="search"
          name={name}
          autoComplete={autoComplete}
          required={required}
          className="form-search-input"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
