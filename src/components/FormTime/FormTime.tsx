import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import './FormTime.css';
import { Icon } from '../Icon';
import { usePresence } from '../../utils/usePresence';

export interface FormTimeProps {
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  minuteStep?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
}

const validTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const pad = (value: number) => String(value).padStart(2, '0');

export function FormTime({ value: controlledValue, onChange, min, max, minuteStep = 5, open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, error = false, label, helperText }: FormTimeProps) {
  const safeMinuteStep = Number.isFinite(minuteStep) && minuteStep > 0 ? minuteStep : 5;
  const id = useId();
  const panelId = useId();
  const helperId = `${id}-helper`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);
  const controlledValueIsSet = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const [draft, setDraft] = useState<string | null>(null);
  const value = controlledValueIsSet ? controlledValue : internalValue;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;
  const presence = usePresence(isOpen, 120);
  const [hour, setHour] = useState(() => Number(value?.slice(0, 2) || 0));
  const [minute, setMinute] = useState(() => Number(value?.slice(3, 5) || 0));
  const [activeHour, setActiveHour] = useState(hour);
  const [activeMinute, setActiveMinute] = useState(minute);
  const display = draft ?? (value ? `${value.slice(0, 2)} : ${value.slice(3, 5)}` : '');
  const invalid = !!draft && !validTime(draft.replace(/\s/g, ''));
  const hasError = error || invalid || (!!value && !validTime(value));

  const setOpen = useCallback((next: boolean) => {
    if (disabled) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [disabled, controlledOpen, onOpenChange]);

  useEffect(() => { rootRef.current?.querySelector('[data-time-panel]')?.toggleAttribute('inert', !isOpen); }, [isOpen, presence.mounted]);
  useEffect(() => {
    if (!isOpen) return;
    const selected = value && validTime(value) ? value : `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`;
    const nextHour = Number(selected.slice(0, 2));
    const nextMinute = Number(selected.slice(3, 5));
    setHour(nextHour); setActiveHour(nextHour); setMinute(nextMinute); setActiveMinute(nextMinute);
    hourListRef.current?.focus();
    requestAnimationFrame(() => {
      hourListRef.current?.querySelector<HTMLElement>('[data-selected="true"]')?.scrollIntoView?.({ block: 'nearest' });
      minuteListRef.current?.querySelector<HTMLElement>('[data-selected="true"]')?.scrollIntoView?.({ block: 'nearest' });
    });
  }, [isOpen, value]);
  useEffect(() => {
    if (!isOpen) return;
    document.getElementById(`${panelId}-hour-${activeHour}`)?.scrollIntoView?.({ block: 'nearest' });
    document.getElementById(`${panelId}-minute-${activeMinute}`)?.scrollIntoView?.({ block: 'nearest' });
  }, [isOpen, panelId, activeHour, activeMinute]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    const onKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); inputRef.current?.focus(); } };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeyDown); };
  }, [isOpen, setOpen]);

  const emit = (next: string) => {
    if (!controlledValueIsSet) setInternalValue(next);
    onChange?.(next);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)} : ${digits.slice(2)}` : digits;
    setDraft(formatted);
    if (digits.length === 4) {
      const next = `${digits.slice(0, 2)}:${digits.slice(2)}`;
      if (validTime(next) && (!min || next >= min) && (!max || next <= max)) { setDraft(null); emit(next); }
    } else if (!digits.length) { setDraft(null); emit(''); }
  };
  const timeAllowed = (h: number, m: number) => {
    const candidate = `${pad(h)}:${pad(m)}`;
    return (!min || candidate >= min) && (!max || candidate <= max);
  };
  const hourAllowed = (h: number) => {
    const minHour = min ? Number(min.slice(0, 2)) : 0;
    const maxHour = max ? Number(max.slice(0, 2)) : 23;
    return h >= minHour && h <= maxHour;
  };
  const commitMinute = (nextMinute: number) => {
    setMinute(nextMinute); setActiveMinute(nextMinute);
    const next = `${pad(hour)}:${pad(nextMinute)}`;
    if (timeAllowed(hour, nextMinute)) { setDraft(null); emit(next); setOpen(false); inputRef.current?.focus(); }
  };
  const move = (target: 'hour' | 'minute', key: string) => {
    const isHour = target === 'hour';
    const list = isHour ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: Math.ceil(60 / safeMinuteStep) }, (_, i) => i * safeMinuteStep).filter((v) => v < 60);
    const available = list.filter((item) => isHour ? hourAllowed(item) : timeAllowed(hour, item));
    if (!available.length) return;
    const current = isHour ? activeHour : activeMinute;
    const foundIndex = available.indexOf(current);
    const currentIndex = foundIndex < 0 ? (key === 'ArrowUp' ? available.length : -1) : foundIndex;
    let nextIndex = currentIndex;
    if (key === 'ArrowDown') nextIndex = Math.min(available.length - 1, currentIndex + 1);
    else if (key === 'ArrowUp') nextIndex = Math.max(0, currentIndex - 1);
    else if (key === 'Home') nextIndex = 0;
    else if (key === 'End') nextIndex = available.length - 1;
    else if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const nextColumn = target === 'hour' ? 'minute' : 'hour';
      (nextColumn === 'hour' ? hourListRef : minuteListRef).current?.focus(); return;
    } else return;
    const next = available[nextIndex];
    if (isHour) setActiveHour(next); else setActiveMinute(next);
  };
  const renderList = (type: 'hour' | 'minute', values: number[]) => {
    const selected = type === 'hour' ? hour : minute;
    const active = type === 'hour' ? activeHour : activeMinute;
    const ref = type === 'hour' ? hourListRef : minuteListRef;
    const activeId = `${panelId}-${type}-${active}`;
    return <div ref={ref} className="form-time__list" role="listbox" aria-label={type === 'hour' ? 'Hours' : 'Minutes'} tabIndex={0} aria-activedescendant={activeId} onKeyDown={(event) => { if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) event.preventDefault(); move(type, event.key); }}>
      {values.map((item) => {
        const allowed = type === 'hour' ? hourAllowed(item) : timeAllowed(hour, item);
        return <div id={`${panelId}-${type}-${item}`} key={item} className="form-time__option" role="option" aria-selected={selected === item} aria-disabled={!allowed || undefined} data-selected={selected === item || undefined} data-active={active === item || undefined} onMouseEnter={() => type === 'hour' ? setActiveHour(item) : setActiveMinute(item)} onClick={() => { if (!allowed) return; if (type === 'hour') { setHour(item); setActiveHour(item); minuteListRef.current?.focus(); } else commitMinute(item); }}>{pad(item)}</div>;
      })}
    </div>;
  };

  const minuteValues = Array.from({ length: Math.ceil(60 / safeMinuteStep) }, (_, i) => i * safeMinuteStep).filter((v) => v < 60);
  return <div className="form-time" ref={rootRef} data-error={hasError || undefined}>
    {label && <label className="form-time__label" htmlFor={id}>{label}</label>}
    <div className="form-time__field" data-open={isOpen || undefined}>
      <input ref={inputRef} id={id} className="form-time__input" type="text" inputMode="numeric" autoComplete="off" placeholder="-- : --" value={display} disabled={disabled} aria-invalid={hasError || undefined} aria-describedby={helperText ? helperId : undefined} onChange={handleInputChange} />
      <button className="form-time__trigger" type="button" aria-label="Choose time" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={panelId} disabled={disabled} onClick={() => setOpen(!isOpen)}><Icon name="clock" size={20} /></button>
    </div>
    {presence.mounted && <div ref={(node) => node?.toggleAttribute('inert', !isOpen)} id={panelId} data-time-panel className="form-time__panel" data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} role="dialog" aria-label="Choose time" aria-hidden={!isOpen || undefined}>
      {renderList('hour', Array.from({ length: 24 }, (_, i) => i))}
      <div className="form-time__divider" aria-hidden="true" />
      {renderList('minute', minuteValues)}
    </div>}
    {helperText && <span id={helperId} className="form-time__helper">{helperText}</span>}
  </div>;
}
