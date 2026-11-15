import { useId, useState } from 'react';
import './FormPassword.css';
import { Icon } from '../Icon';

export interface FormPasswordProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  autoComplete?: string;
}

export function FormPassword({
  label,
  placeholder = 'Password',
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  visible: controlledVisible,
  defaultVisible = false,
  onVisibleChange,
  autoComplete = 'current-password',
}: FormPasswordProps) {
  const id = useId();
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const visible = controlledVisible ?? internalVisible;
  const helperId = `${id}-helper`;
  const toggleVisible = () => {
    const next = !visible;
    if (controlledVisible === undefined) setInternalVisible(next);
    onVisibleChange?.(next);
  };

  return (
    <div className="form-password" data-error={error || undefined}>
      {label && <label className="form-password__label" htmlFor={id}>{label}</label>}
      <div className="form-password__field">
        <input
          id={id}
          className="form-password__input"
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          onChange={(event) => onChange?.(event.target.value)}
        />
        <button
          className="form-password__toggle"
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          aria-controls={id}
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={toggleVisible}
        >
          <Icon name={visible ? 'eye-off' : 'eye'} size={24} />
        </button>
      </div>
      {helperText && <span id={helperId} className="form-password__helper">{helperText}</span>}
    </div>
  );
}
