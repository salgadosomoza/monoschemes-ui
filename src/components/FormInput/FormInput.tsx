import { useId } from 'react';
import './FormInput.css';
import { Icon } from '../Icon';

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
  return <Icon className="form-input-icon" name="search" size={20} />;
}

function CloseIcon() {
  return <Icon className="form-input-icon" name="x" size={20} />;
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
              <select
                className="form-input-select"
                aria-label={`${label ?? 'Input'} protocol`}
                disabled={disabled}
              >
                <option>http://</option>
                <option>https://</option>
              </select>
              <Icon className="form-input-select-chevron" name="chevron-down" size={20} />
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
