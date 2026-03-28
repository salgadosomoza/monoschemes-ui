import { useId } from 'react';
import '../../styles/icons.css';
import './FormInput.css';

export type FormInputType =
  | 'simple'
  | 'trailing-icon'
  | 'leading-select'
  | 'prefix'
  | 'leading-and-trailing-icon';

export interface FormInputProps {
  /** Layout variant of the input. */
  type?: FormInputType;
  /** Placeholder text. */
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Callback fired on change. */
  onChange?: (value: string) => void;
  /** Renders the input in a disabled state. */
  disabled?: boolean;
  /** Renders the input in an error state. */
  error?: boolean;
  /** Field label shown above the input. */
  label?: string;
  /** Helper text shown below the input. */
  helperText?: string;
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="form-input-icon">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="form-input-icon">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

export function FormInput({
  type = 'simple',
  placeholder = 'Placeholder',
  value,
  onChange,
  disabled = false,
  error = false,
  label,
  helperText,
}: FormInputProps) {
  const id = useId();
  const inputClass = ['form-input-field', error ? 'form-input-field--error' : ''].filter(Boolean).join(' ');

  const renderControl = () => {
    switch (type) {
      case 'trailing-icon':
        return (
          <div className="form-input-adornment">
            <input
              id={id}
              className={inputClass}
              type="text"
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <span className="form-input-icon-end"><SearchIcon /></span>
          </div>
        );

      case 'leading-select':
        return (
          <div className="form-input-adornment">
            <div className="form-input-select-wrapper">
              <select className="form-input-select" disabled={disabled}>
                <option>http://</option>
                <option>https://</option>
              </select>
              <span className="material-symbols-outlined form-input-select-chevron" aria-hidden="true">
                keyboard_arrow_down
              </span>
            </div>
            <input
              id={id}
              className={inputClass}
              type="text"
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.value)}
            />
          </div>
        );

      case 'prefix':
        return (
          <div className="form-input-adornment">
            <span className="form-input-prefix">$</span>
            <input
              id={id}
              className={inputClass}
              type="text"
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.value)}
            />
          </div>
        );

      case 'leading-and-trailing-icon':
        return (
          <div className="form-input-adornment">
            <span className="form-input-icon-start"><SearchIcon /></span>
            <input
              id={id}
              className={inputClass}
              type="text"
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <span className="form-input-icon-end"><CloseIcon /></span>
          </div>
        );

      default:
        return (
          <input
            id={id}
            className={inputClass}
            type="text"
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="form-input" data-type={type} data-error={error || undefined}>
      {label && (
        <label className="form-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      {renderControl()}
      {helperText && (
        <span className={['form-input-helper', error ? 'form-input-helper--error' : ''].filter(Boolean).join(' ')}>
          {helperText}
        </span>
      )}
    </div>
  );
}
