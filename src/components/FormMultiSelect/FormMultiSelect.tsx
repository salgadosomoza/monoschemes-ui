import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import './FormMultiSelect.css';
import { Icon } from '../Icon';
import { usePresence } from '../../utils/usePresence';

export interface FormMultiSelectOption { value: string; label: string; disabled?: boolean }
export interface FormMultiSelectProps {
  options: FormMultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  maxVisibleLabels?: number;
}

export function FormMultiSelect({ options, value: controlledValue, defaultValue = [], onChange, placeholder = 'Select', label, helperText, disabled = false, error = false, maxVisibleLabels = 2 }: FormMultiSelectProps) {
  const id = useId();
  const listId = `${id}-listbox`;
  const helperId = `${id}-helper`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const controlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValues = controlled ? controlledValue : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const presence = usePresence(isOpen, 120);
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const visible = selectedOptions.slice(0, maxVisibleLabels).map((option) => option.label);
  const rest = selectedOptions.length - visible.length;
  const summary = selectedOptions.length ? `${visible.join(', ')}${rest > 0 ? ` +${rest}` : ''}` : placeholder;
  const activeOption = options[activeIndex];

  useEffect(() => { listRef.current?.toggleAttribute('inert', !isOpen); }, [isOpen, presence.mounted]);
  useEffect(() => {
    if (!isOpen) return;
    const outside = (event: PointerEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [isOpen]);

  const toggle = (option: FormMultiSelectOption) => {
    if (option.disabled) return;
    const next = selectedValues.includes(option.value)
      ? selectedValues.filter((value) => value !== option.value)
      : [...selectedValues, option.value];
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' || event.key === 'Tab') { setIsOpen(false); return; }
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setIsOpen(true); setActiveIndex(Math.max(0, options.findIndex((option) => selectedValues.includes(option.value)))); return; }
    if (!isOpen) return;
    const enabledIndices = options.flatMap((option, index) => option.disabled ? [] : [index]);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = enabledIndices.indexOf(activeIndex);
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const next = (current + offset + enabledIndices.length) % enabledIndices.length;
      if (enabledIndices.length) setActiveIndex(enabledIndices[next]);
    }
    if (event.key === 'Home' && enabledIndices.length) { event.preventDefault(); setActiveIndex(enabledIndices[0]); }
    if (event.key === 'End' && enabledIndices.length) { event.preventDefault(); setActiveIndex(enabledIndices[enabledIndices.length - 1]); }
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (activeOption) toggle(activeOption); }
  };

  return <div className="form-multi-select" ref={rootRef} data-error={error || undefined}>
    {label && <label className="form-multi-select__label" htmlFor={id}>{label}</label>}
    <button id={id} className="form-multi-select__trigger" type="button" role="combobox" aria-label={`${label ? `${label}: ` : ''}${summary}`} aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listId} aria-activedescendant={isOpen && activeOption ? `${listId}-option-${activeIndex}` : undefined} aria-invalid={error || undefined} aria-describedby={helperText ? helperId : undefined} disabled={disabled} data-open={isOpen || undefined} onClick={() => setIsOpen((open) => !open)} onKeyDown={keyDown}>
      <span className="form-multi-select__value" data-placeholder={!selectedOptions.length || undefined}>{summary}</span>
      <Icon className="form-multi-select__chevron" name="chevron-down" size={20} />
    </button>
    {presence.mounted && <ul ref={listRef} id={listId} className="form-multi-select__list" role="listbox" aria-label={label} aria-multiselectable="true" aria-hidden={!isOpen || undefined} data-state={presence.state} onTransitionEnd={presence.onTransitionEnd}>
      {options.map((option, index) => {
        const selected = selectedValues.includes(option.value);
        return <li id={`${listId}-option-${index}`} key={option.value} className="form-multi-select__option" role="option" aria-selected={selected} aria-disabled={option.disabled || undefined} data-active={activeIndex === index || undefined} data-selected={selected || undefined} onMouseEnter={() => setActiveIndex(index)} onClick={() => toggle(option)}>
          <span className="form-multi-select__check" aria-hidden="true"><Icon name={selected ? 'check' : 'square'} size={16} /></span><span>{option.label}</span>
        </li>;
      })}
    </ul>}
    {helperText && <span id={helperId} className="form-multi-select__helper">{helperText}</span>}
  </div>;
}
