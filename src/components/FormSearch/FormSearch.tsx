import { useId, useState } from 'react';
import '../../styles/icons.css';
import './FormSearch.css';

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
}

export function FormSearch({
  value: controlledValue,
  placeholder = 'Search',
  onChange,
  onSearch,
  disabled = false,
}: FormSearchProps) {
  const id = useId();
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
        <span className="material-symbols-outlined form-search-icon" aria-hidden="true">
          search
        </span>
        <input
          id={id}
          type="search"
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
