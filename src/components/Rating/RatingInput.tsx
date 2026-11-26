import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Text } from '../Text';
import { RatingStar } from './RatingStar';
import './Rating.css';

const DEFAULT_LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

export interface RatingInputProps {
  /** Current score from one to five. Pass with onChange for a controlled input. */
  value?: number;
  /** Initial score for an uncontrolled input. */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Shared native radio name for form submission. */
  name?: string;
  /** Accessible label shown for each score. */
  labels?: string[];
  showLabel?: boolean;
  disabled?: boolean;
  /** Accessible name for the radio group. */
  'aria-label'?: string;
  /** IDs of external help or error text associated with the group. */
  'aria-describedby'?: string;
  /** Marks the group invalid when used within a form field. */
  'aria-invalid'?: boolean;
}

function clampValue(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return 0;
  return Math.min(5, Math.max(0, Math.round(value)));
}

export function RatingInput({
  value,
  defaultValue = 0,
  onChange,
  name,
  labels = DEFAULT_LABELS,
  showLabel = true,
  disabled = false,
  'aria-label': ariaLabel = 'Rating',
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: RatingInputProps) {
  const autoName = useId().replace(/:/g, '');
  const [internalValue, setInternalValue] = useState(() => clampValue(defaultValue));
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const controlled = value !== undefined;
  const selected = controlled ? clampValue(value) : internalValue;
  const preview = hoveredValue ?? selected;
  const optionLabels = DEFAULT_LABELS.map((label, index) => labels[index] ?? label);

  const select = (next: number) => {
    if (disabled) return;
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const current = Number(input.value);
    let next: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(5, current + 1);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(1, current - 1);
    if (event.key === 'Home') next = 1;
    if (event.key === 'End') next = 5;
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    input.parentElement?.parentElement?.querySelector<HTMLInputElement>(`input[value="${next}"]`)?.focus();
  };

  const clearPreview = () => setHoveredValue(null);

  return (
    <div
      className="rating-input"
      role="radiogroup"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid || undefined}
      data-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={clearPreview}
    >
      <div className="rating-input__stars">
        {Array.from({ length: 5 }, (_, index) => {
          const score = index + 1;
          const checked = selected === score;
          const active = preview >= score;
          const optionLabel = optionLabels[index];
          return (
            <label
              className="rating-input__option"
              key={score}
              onMouseEnter={() => setHoveredValue(score)}
              data-checked={checked || undefined}
            >
              <input
                type="radio"
                name={name ?? `rating-${autoName}`}
                value={score}
                checked={checked}
                disabled={disabled}
                tabIndex={selected === 0 ? (score === 1 ? 0 : -1) : (checked ? 0 : -1)}
                aria-label={`${score} ${score === 1 ? 'star' : 'stars'}, ${optionLabel}`}
                onChange={() => select(score)}
              />
              <span className="rating-input__visual" aria-hidden="true">
                <RatingStar value={active ? 'full' : 'empty'} size={24} disabled={disabled} />
              </span>
            </label>
          );
        })}
      </div>
      {showLabel && (
        <Text className="rating-input__label" style="body-2" color="var(--color-text-secondary)" as="span">
          {optionLabels.map((label, index) => (
            <span key={index} aria-hidden={index + 1 !== preview || undefined}>{label}</span>
          ))}
        </Text>
      )}
    </div>
  );
}
