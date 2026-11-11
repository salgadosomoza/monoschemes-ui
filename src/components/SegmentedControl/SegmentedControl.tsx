import type { KeyboardEvent } from 'react';
import './SegmentedControl.css';

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label': string;
}

export function SegmentedControl({ options, value, onChange, 'aria-label': ariaLabel }: SegmentedControlProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % options.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + options.length) % options.length;
    if (nextIndex === undefined || !options.length) return;
    event.preventDefault();
    const next = options[nextIndex];
    onChange(next.value);
    document.getElementById('segmented-control-option-' + nextIndex)?.focus();
  }

  return (
    <div className="segmented-control" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            id={'segmented-control-option-' + index}
            className="segmented-control__item"
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
