import { useRef, useEffect, useId, useState } from 'react';
import '../../styles/icons.css';
import './FormCheckbox.css';

export type FormCheckboxType = 'label' | 'icon';
export type FormCheckboxStatus = 'inactive' | 'active' | 'indeterminated';

export interface FormCheckboxProps {
  /** Shows a text label or icon slot alongside the control. */
  type?: FormCheckboxType;
  /** Controlled checked state. */
  status?: FormCheckboxStatus;
  /** Text label (used when type="label"). */
  label?: string;
  /** Callback fired on change. Providing this makes the component controlled. */
  onChange?: (checked: boolean) => void;
  /** Renders the checkbox in a disabled state. */
  disabled?: boolean;
}

const ICON: Record<FormCheckboxStatus, string> = {
  inactive:       'check_box_outline_blank',
  active:         'check_box',
  indeterminated: 'indeterminate_check_box',
};

export function FormCheckbox({
  type = 'label',
  status: controlledStatus,
  label = 'Label',
  onChange,
  disabled = false,
}: FormCheckboxProps) {
  // useId for the input — used only for aria, NOT on <label htmlFor> to avoid
  // the double-click bug (input inside label + htmlFor = two click events).
  const id = useId();
  const isControlled = controlledStatus !== undefined;
  const [internalStatus, setInternalStatus] = useState<FormCheckboxStatus>('inactive');
  const status = isControlled ? controlledStatus : internalStatus;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = status === 'indeterminated';
    }
  }, [status]);

  function handleChange(checked: boolean) {
    console.log('[FormCheckbox] handleChange fired', { checked, status, isControlled });
    if (!isControlled) {
      // indeterminated → active on click; active → inactive; inactive → active
      const next = status === 'indeterminated' ? 'active' : checked ? 'active' : 'inactive';
      console.log('[FormCheckbox] setting internal status →', next);
      setInternalStatus(next);
    }
    onChange?.(checked);
  }

  return (
    // No htmlFor — input is a child so implicit association applies.
    // Using htmlFor + child input causes double-firing in browsers.
    <label
      className="form-checkbox"
      data-type={type}
      data-status={status}
    >
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className="form-checkbox-input"
        checked={status === 'active'}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <span className="material-symbols-outlined form-checkbox-icon" aria-hidden="true">
        {ICON[status]}
      </span>
      {type === 'label' && (
        <span className="form-checkbox-label">{label}</span>
      )}
    </label>
  );
}
