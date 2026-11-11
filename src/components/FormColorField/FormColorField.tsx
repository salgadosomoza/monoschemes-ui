import './FormColorField.css';

export interface FormColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function FormColorField({ label, value, onChange }: FormColorFieldProps) {
  return (
    <div className="form-color-field">
      <span className="form-color-field__swatch" style={{ backgroundColor: value }}>
        <input
          className="form-color-field__input"
          type="color"
          value={value}
          aria-label={'Choose ' + label + ' color'}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      </span>
      <span className="form-color-field__label">{label}</span>
      <span className="form-color-field__value">{value.toUpperCase()}</span>
    </div>
  );
}
