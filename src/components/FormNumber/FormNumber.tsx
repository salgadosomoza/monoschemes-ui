import { useId, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import './FormNumber.css';
import { Icon } from '../Icon';

export interface FormNumberProps {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

function alignToStep(value: number, step: number, base: number) {
  const places = Math.max(0, (String(step).split('.')[1] ?? '').length);
  return Number((base + Math.round((value - base) / step) * step).toFixed(places));
}

export function FormNumber({ value: controlledValue, defaultValue = null, onChange, min, max, step = 1, disabled = false, error = false, label, helperText, placeholder }: FormNumberProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const controlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const [draft, setDraft] = useState<string | null>(null);
  const value = controlled ? controlledValue ?? null : internalValue;
  const numericValue = draft !== null && draft !== '' && Number.isFinite(Number(draft)) ? Number(draft) : value;
  const atMin = min !== undefined && numericValue !== null && numericValue <= min;
  const atMax = max !== undefined && numericValue !== null && numericValue >= max;

  const emit = (next: number | null) => {
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };
  const clamp = (next: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
  const stepValue = (direction: -1 | 1, multiplier = 1) => {
    const base = numericValue ?? min ?? 0;
    const next = clamp(alignToStep(base + direction * step * multiplier, step, min ?? 0));
    setDraft(null);
    emit(next);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setDraft(next);
    if (next === '') emit(null);
    else if (/^-?(?:\d+\.?\d*|\.\d*)$/.test(next) && Number.isFinite(Number(next))) emit(Number(next));
  };
  const handleBlur = () => {
    if (draft === null) return;
    if (draft === '') {
      setDraft(null);
      emit(null);
      return;
    }
    if (!Number.isFinite(Number(draft))) { setDraft(null); return; }
    const base = min ?? 0;
    const next = clamp(alignToStep(Number(draft), step, base));
    setDraft(null);
    emit(next);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      stepValue(event.key === 'ArrowUp' ? 1 : -1, event.shiftKey ? 10 : 1);
    } else if (event.key === 'Home' && min !== undefined) {
      event.preventDefault(); setDraft(null); emit(min);
    } else if (event.key === 'End' && max !== undefined) {
      event.preventDefault(); setDraft(null); emit(max);
    }
  };

  return (
    <div className="form-number" data-error={error || undefined}>
      {label && <label className="form-number__label" htmlFor={id}>{label}</label>}
      <div className="form-number__field">
        <input id={id} className="form-number__input" type="text" inputMode="decimal" role="spinbutton" placeholder={placeholder} value={draft ?? (value ?? '')} disabled={disabled} aria-valuenow={value ?? undefined} aria-valuemin={min} aria-valuemax={max} aria-invalid={error || undefined} aria-describedby={helperText ? helperId : undefined} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        <div className="form-number__controls">
          <button type="button" aria-label="Decrease" tabIndex={-1} disabled={disabled || !!atMin} onClick={() => stepValue(-1)}><Icon name="minus" size={24} /></button>
          <button type="button" aria-label="Increase" tabIndex={-1} disabled={disabled || !!atMax} onClick={() => stepValue(1)}><Icon name="plus" size={24} /></button>
        </div>
      </div>
      {helperText && <span className="form-number__helper" id={helperId}>{helperText}</span>}
    </div>
  );
}
