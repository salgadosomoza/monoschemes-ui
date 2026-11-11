import './Divider.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerTone = 'default' | 'strong';

export interface DividerProps {
  orientation?: DividerOrientation;
  tone?: DividerTone;
  /** Hides the separator from assistive technology when it is purely decorative. */
  decorative?: boolean;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  tone = 'default',
  decorative = false,
  className,
}: DividerProps) {
  return (
    <hr
      className={['divider', className].filter(Boolean).join(' ')}
      data-orientation={orientation}
      data-tone={tone}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative || undefined}
    />
  );
}
