import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Calendar } from '../Calendar';
import { Icon } from '../Icon';
import './FormDate.css';

export interface FormDateProps {
  /** Controlled value and onChange format: DD/MM/YYYY. */
  value?: string;
  onChange?: (value: string) => void;
  /** Bounds use the ISO format YYYY-MM-DD. */
  min?: string;
  max?: string;
  disabled?: boolean;
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  locale?: string;
  error?: boolean;
}

const today = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
function parseDisplayDate(value: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return date.getFullYear() === Number(yyyy) && date.getMonth() === Number(mm) - 1 && date.getDate() === Number(dd) ? date : null;
}
function parseIsoDate(value?: string): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
}
const formatDisplayDate = (date: Date) => `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
const compareDate = (a: Date, b: Date) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() - new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();

export function FormDate({ value: controlledValue, onChange, min, max, disabled = false, label, open: controlledOpen, defaultOpen = false, onOpenChange, locale = 'en', error = false }: FormDateProps) {
  const id = useId();
  const dialogId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typedRef = useRef<string | null>(null);
  const isValueControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const [draftValue, setDraftValue] = useState<string | null>(null);
  const value = isValueControlled ? controlledValue : internalValue;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [focusCalendarOnOpen, setFocusCalendarOnOpen] = useState(defaultOpen || controlledOpen === true);
  const isOpen = controlledOpen ?? internalOpen;
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');
  const date = parseDisplayDate(value ?? '');
  const minDate = parseIsoDate(min);
  const maxDate = parseIsoDate(max);
  const outOfBounds = !!date && ((minDate && compareDate(date, minDate) < 0) || (maxDate && compareDate(date, maxDate) > 0));
  const invalidTypedDate = typedRef.current !== null && (typedRef.current.length === 10) && (!parseDisplayDate(typedRef.current) || (() => {
    const candidate = parseDisplayDate(typedRef.current as string);
    return !!candidate && ((minDate && compareDate(candidate, minDate) < 0) || (maxDate && compareDate(candidate, maxDate) > 0));
  })());
  const hasError = error || !!outOfBounds || invalidTypedDate;

  const setOpen = useCallback((next: boolean) => {
    if (disabled) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [disabled, controlledOpen, onOpenChange]);
  function commitValue(next: string) {
    typedRef.current = null;
    setDraftValue(null);
    if (!isValueControlled) setInternalValue(next);
    onChange?.(next);
  }
  function openCalendar(focusCalendar: boolean) {
    if (!disabled) {
      setFocusCalendarOnOpen(focusCalendar);
      setOpen(true);
    }
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 8);
    if (digits.length === 0) {
      commitValue('');
      return;
    }
    const display = digits.length > 4 ? `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}` : digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    setDraftValue(display);
    const typed = digits.length === 8 ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}` : null;
    typedRef.current = typed;
    if (digits.length === 8) {
      const parsed = parseDisplayDate(typed!);
      if (parsed && !(minDate && compareDate(parsed, minDate) < 0) && !(maxDate && compareDate(parsed, maxDate) > 0)) commitValue(formatDisplayDate(parsed));
    }
  }
  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.altKey && event.key === 'ArrowDown') { event.preventDefault(); openCalendar(true); }
  }

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    function onDocumentKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); inputRef.current?.focus(); }
      if (event.key === 'Tab') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onDocumentKeyDown); };
  }, [isOpen, disabled, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) setPlacement(window.innerHeight - rect.bottom < 306 ? 'top' : 'bottom');
  }, [isOpen]);

  const inputValue = draftValue ?? (value ? value.replace(/\//g, ' / ') : '');
  const calendarDate = date && !outOfBounds ? date : null;
  return <div className="form-date" ref={rootRef} data-error={hasError || undefined} data-open={isOpen || undefined} data-placement={placement}>
    {label && <label className="form-date-label" htmlFor={id}>{label}</label>}
    <div className="form-date-inner">
      <input ref={inputRef} id={id} type="text" inputMode="numeric" autoComplete="off" className="form-date-input" placeholder="-- / -- / ----" value={inputValue} disabled={disabled} aria-invalid={hasError || undefined} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? dialogId : undefined} onClick={() => openCalendar(false)} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
      <button type="button" className="form-date-icon-btn" aria-label="Choose date" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? dialogId : undefined} disabled={disabled} onClick={() => openCalendar(true)}><Icon className="form-date-icon" name="calendar" size={20} /></button>
    </div>
    {isOpen && <div id={dialogId} className="form-date-popover" role="dialog" aria-label={label || 'Choose date'} data-placement={placement}>
      <Calendar type="date" value={calendarDate} defaultMonth={date ?? today()} defaultFocusDate={date ?? today()} locale={locale} minDate={minDate ?? undefined} maxDate={maxDate ?? undefined} autoFocus={focusCalendarOnOpen} onChange={(selected) => {
        if (!selected) return;
        commitValue(formatDisplayDate(selected));
        setOpen(false);
        inputRef.current?.focus();
      }} />
    </div>}
  </div>;
}
