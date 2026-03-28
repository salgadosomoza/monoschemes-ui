import type { ReactNode, CSSProperties } from 'react';
import './Grid.css';

export type GridType = 'small' | 'medium' | 'large' | 'max' | 'full';

const TYPE_COLUMNS: Record<GridType, number> = {
  small:  4,
  medium: 8,
  large:  16,
  max:    16,
  full:   16,
};

export interface GridProps {
  /** Breakpoint preset controlling column count and padding. */
  type?: GridType;
  /** Override the column count. */
  columns?: number;
  /** Override the column gap. Defaults to var(--gap-sm). */
  gap?: string;
  /** Grid cells. */
  children?: ReactNode;
}

export function Grid({
  type = 'large',
  columns,
  gap,
  children,
}: GridProps) {
  const cols = columns ?? TYPE_COLUMNS[type];
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    ...(gap ? { gap } : {}),
  };

  return (
    <div className="grid-layout" data-type={type} style={style}>
      {children}
    </div>
  );
}
