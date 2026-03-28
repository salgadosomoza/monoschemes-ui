import { useId, useState } from 'react';
import './FormToggle.css';

export type FormToggleType = 'label' | 'icon';
export type FormToggleStatus = 'inactive' | 'active';

export interface FormToggleProps {
  /** Shows a text label or icon slot alongside the control. */
  type?: FormToggleType;
  /** Controlled active state. */
  status?: FormToggleStatus;
  /** Text label (used when type="label"). */
  label?: string;
  /** Callback fired on change. Providing this makes the component controlled. */
  onChange?: (active: boolean) => void;
  /** Renders the toggle in a disabled state. */
  disabled?: boolean;
}

export function FormToggle({
  type = 'label',
  status: controlledStatus,
  label = 'Label',
  onChange,
  disabled = false,
}: FormToggleProps) {
  // No htmlFor on <label> — input is a child so implicit association applies.
  // Using htmlFor + child input causes double-firing in browsers.
  const id = useId();
  const isControlled = controlledStatus !== undefined;
  const [internalStatus, setInternalStatus] = useState<FormToggleStatus>('inactive');
  const status = isControlled ? controlledStatus : internalStatus;
  const isActive = status === 'active';

  function handleChange(checked: boolean) {
    console.log('[FormToggle] handleChange fired', { checked, status, isControlled });
    if (!isControlled) {
      const next: FormToggleStatus = checked ? 'active' : 'inactive';
      console.log('[FormToggle] setting internal status →', next);
      setInternalStatus(next);
    }
    onChange?.(checked);
  }

  return (
    <label
      className="form-toggle"
      data-type={type}
      data-status={status}
    >
      <input
        id={id}
        type="checkbox"
        className="form-toggle-input"
        checked={isActive}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <span className="form-toggle-track" aria-hidden="true">
        <span className="form-toggle-thumb" />
      </span>
      {type === 'label' && (
        <span className="form-toggle-label">{label}</span>
      )}
    </label>
  );
}
