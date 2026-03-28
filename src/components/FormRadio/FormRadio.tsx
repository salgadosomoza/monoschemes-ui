import { useId, useState, createContext, useContext } from 'react';
import '../../styles/icons.css';
import './FormRadio.css';

export type FormRadioType = 'label' | 'icon';
export type FormRadioStatus = 'inactive' | 'active';

// ─── RadioGroup context ──────────────────────────────

interface RadioGroupContextValue {
  selected: string;
  onSelect: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  /** Currently selected value (controlled). */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Callback fired when selection changes. */
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export function RadioGroup({ value: controlledValue, defaultValue = '', onChange, children }: RadioGroupProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;

  function onSelect(val: string) {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }

  return (
    <RadioGroupContext.Provider value={{ selected, onSelect }}>
      <div className="form-radio-group" role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ─── FormRadio ───────────────────────────────────────

export interface FormRadioProps {
  /** Shows a text label or icon slot alongside the control. */
  type?: FormRadioType;
  /** Controlled status (ignored when inside a RadioGroup). */
  status?: FormRadioStatus;
  /** Text label (used when type="label"). */
  label?: string;
  /** Value for this radio option (required inside RadioGroup). */
  value?: string;
  /** Callback fired on change. Providing this makes the component controlled. */
  onChange?: (value: string) => void;
  /** Renders the radio in a disabled state. */
  disabled?: boolean;
}

export function FormRadio({
  type = 'label',
  status: controlledStatus,
  label = 'Label',
  value = '',
  onChange,
  disabled = false,
}: FormRadioProps) {
  const id = useId();
  const group = useContext(RadioGroupContext);

  // Inside RadioGroup: derive status from group state
  const isActive = group ? group.selected === value : controlledStatus === 'active';

  // Standalone uncontrolled
  const isControlled = group !== null || controlledStatus !== undefined;
  const [internalActive, setInternalActive] = useState(false);
  const active = isControlled ? isActive : internalActive;

  function handleChange() {
    if (group) {
      group.onSelect(value);
    } else if (!isControlled) {
      setInternalActive(true);
    }
    onChange?.(value);
  }

  const status: FormRadioStatus = active ? 'active' : 'inactive';

  return (
    <label
      className="form-radio"
      data-type={type}
      data-status={status}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        className="form-radio-input"
        checked={active}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="material-symbols-outlined form-radio-icon" aria-hidden="true">
        {active ? 'radio_button_checked' : 'radio_button_unchecked'}
      </span>
      {type === 'label' && (
        <span className="form-radio-label">{label}</span>
      )}
    </label>
  );
}
