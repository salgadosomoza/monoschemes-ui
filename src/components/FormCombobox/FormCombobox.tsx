import { useId, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import './FormCombobox.css';

export interface FormComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormComboboxProps {
  options: FormComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  loading?: boolean;
  emptyText?: (query: string) => string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  'aria-label'?: string;
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase();
}

function matchesWordStart(label: string, query: string) {
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) return true;
  const words = label.matchAll(/[\p{L}\p{N}]+/gu);
  for (const word of words) {
    if (normalize(word[0]).startsWith(normalizedQuery)) return true;
  }
  return false;
}

function HighlightMatch({ label, query }: { label: string; query: string }) {
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) return <>{label}</>;

  for (const word of label.matchAll(/[\p{L}\p{N}]+/gu)) {
    if (!normalize(word[0]).startsWith(normalizedQuery)) continue;
    let normalizedLength = 0;
    let end = word.index;
    for (const character of word[0]) {
      normalizedLength += normalize(character).length;
      end += character.length;
      if (normalizedLength >= normalizedQuery.length) break;
    }
    return <>{label.slice(0, word.index)}<strong>{label.slice(word.index, end)}</strong>{label.slice(end)}</>;
  }
  return <>{label}</>;
}

export function FormCombobox({
  options,
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = 'Search',
  query,
  onQueryChange,
  loading = false,
  emptyText = (search) => `No matches for “${search}”`,
  disabled = false,
  error = false,
  label,
  helperText,
  id: providedId,
  name,
  autoComplete,
  required = false,
  'aria-label': ariaLabel,
}: FormComboboxProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const listId = `${id}-listbox`;
  const helperId = `${id}-helper`;
  const rootRef = useRef<HTMLDivElement>(null);
  const controlledValueMode = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const selectedValue = controlledValueMode ? controlledValue : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const [internalQuery, setInternalQuery] = useState('');
  const queryIsControlled = query !== undefined;
  const searchText = queryIsControlled ? query : internalQuery;
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const filteredOptions = useMemo(
    () => loading && options.length > 0
      ? options
      : options.filter((option) => matchesWordStart(option.label, searchText)),
    [loading, options, searchText],
  );
  const enabledOptions = filteredOptions.filter((option) => !option.disabled);
  const activeOption = enabledOptions.find((option) => option.value === activeValue) ?? enabledOptions[0];
  const displayedValue = editing ? searchText : selectedOption?.label ?? '';

  function updateQuery(nextQuery: string) {
    if (!queryIsControlled) setInternalQuery(nextQuery);
    onQueryChange?.(nextQuery);
  }

  function restoreSelection() {
    setEditing(false);
    updateQuery('');
  }

  function selectOption(option: FormComboboxOption) {
    if (option.disabled) return;
    if (!controlledValueMode) setInternalValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    setEditing(false);
    updateQuery('');
    setActiveValue(option.value);
  }

  function handleFocus() {
    if (disabled) return;
    setEditing(true);
    updateQuery(selectedOption?.label ?? '');
    setOpen(true);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.relatedTarget && rootRef.current?.contains(event.relatedTarget as Node)) return;
    setOpen(false);
    restoreSelection();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateQuery(event.currentTarget.value);
    setOpen(true);
    setActiveValue(null);
  }

  function moveActive(direction: 1 | -1) {
    if (!enabledOptions.length) return;
    const current = enabledOptions.findIndex((option) => option.value === activeOption?.value);
    const next = current < 0
      ? (direction === 1 ? 0 : enabledOptions.length - 1)
      : (current + direction + enabledOptions.length) % enabledOptions.length;
    setActiveValue(enabledOptions[next].value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveActive(-1);
    } else if (event.key === 'Enter' && open) {
      event.preventDefault();
      if (activeOption) selectOption(activeOption);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      restoreSelection();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div className="form-combobox" ref={rootRef} data-error={error || undefined} data-open={open || undefined} onBlur={handleBlur}>
      {label && <label className="form-combobox__label" htmlFor={id}>{label}</label>}
      {name && <input type="hidden" name={name} value={selectedValue ?? ''} disabled={disabled} />}
      <div className="form-combobox__control">
        <input
          id={id}
          className="form-combobox__input"
          type="text"
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={open && activeOption ? `${listId}-option-${encodeURIComponent(activeOption.value)}` : undefined}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          autoComplete={autoComplete ?? 'off'}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          value={displayedValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Icon className="form-combobox__chevron" name={open ? 'chevron-up' : 'chevron-down'} size={24} aria-hidden="true" />
      </div>
      {open && (
        <ul className="form-combobox__list" id={listId} role="listbox" aria-label={label ?? ariaLabel}>
          {filteredOptions.map((option) => {
            const selected = option.value === selectedValue;
            const active = option.value === activeOption?.value;
            return (
              <li
                className="form-combobox__option"
                id={`${listId}-option-${encodeURIComponent(option.value)}`}
                key={option.value}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled || undefined}
                data-active={active || undefined}
                data-selected={selected || undefined}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => !option.disabled && setActiveValue(option.value)}
                onClick={() => selectOption(option)}
              >
                <HighlightMatch label={option.label} query={searchText} />
              </li>
            );
          })}
          {loading && (
            <li className="form-combobox__status" role="presentation"><Spinner size="small" showLabel={false} aria-hidden="true" />Loading…</li>
          )}
          {filteredOptions.length === 0 && !loading && (
            <li className="form-combobox__status" role="presentation">{emptyText(searchText)}</li>
          )}
        </ul>
      )}
      <span className="form-combobox__live" aria-live="polite" aria-atomic="true">
        {open ? loading
          ? `Loading results${filteredOptions.length ? `; showing ${filteredOptions.length} previous results` : ''}`
          : `${filteredOptions.length} ${filteredOptions.length === 1 ? 'result' : 'results'}`
          : ''}
      </span>
      {helperText && <span className="form-combobox__helper" id={helperId}>{helperText}</span>}
    </div>
  );
}
