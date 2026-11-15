import { useId, useState } from 'react';
import './FormSearch.css';
import { Icon } from '../Icon';

export interface FormSearchProps {
  /** Controlled value. */
  value?: string;
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
      <label className="form-search-inner" htmlFor={id}>
        <Icon className="form-search-icon" name="search" size={20} />
        <input
          id={id}
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
      </label>
    </div>
  );
}
