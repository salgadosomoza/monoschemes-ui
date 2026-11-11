import type { CSSProperties } from 'react';
import './FormSlider.css';

export interface FormSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  ticks?: number[];
  showTicks?: boolean;
  disabled?: boolean;
  'aria-label': string;
  onChange: (value: number) => void;
}

export function FormSlider({
  value,
  min,
  max,
  step,
  ticks,
  showTicks = true,
  disabled = false,
  'aria-label': ariaLabel,
  onChange,
}: FormSliderProps) {
  const progress = max > min ? Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)) : 0;
  const style = { '--slider-progress': progress + '%' } as CSSProperties;

  return (
    <div className="form-slider">
      <input
        className="form-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        style={style}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      {showTicks && ticks && ticks.length > 0 && (
        <div className="form-slider__ticks" aria-hidden="true">
          {ticks.map((tick) => <span key={tick}>{tick}</span>)}
        </div>
      )}
    </div>
  );
}
