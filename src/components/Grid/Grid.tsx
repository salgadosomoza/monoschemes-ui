import type { CSSProperties, HTMLAttributes } from 'react';
import { Container } from '../Container';
import './Grid.css';

export type GridType = 'small' | 'medium' | 'large' | 'max' | 'full';
export type GridResponsiveValue = number | { base?: number; sm?: number; md?: number };

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** @deprecated Use Grid and Container instead of breakpoint presets. */
  type?: GridType;
  columns?: GridResponsiveValue;
  minItemWidth?: string;
  gap?: string;
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  span?: GridResponsiveValue;
}

function responsiveValue(value: GridResponsiveValue, fallback: number) {
  const { base = fallback, sm = base, md = sm } = typeof value === 'number' ? { base: value } : value;
  return { base, sm, md };
}

// Library builds preserve NODE_ENV for the consuming app's bundler.
declare const process: { env: { NODE_ENV?: string } } | undefined;
let warnedAboutType = false;

export function Grid({
  type,
  columns = { base: 4, sm: 8, md: 12 },
  minItemWidth,
  gap,
  children,
  className,
  style,
  ...props
}: GridProps) {
  if (type && !warnedAboutType && (
    import.meta.env?.DEV ||
    (typeof process !== 'undefined' && process.env.NODE_ENV === 'development')
  )) {
    warnedAboutType = true;
    // eslint-disable-next-line no-console
    console.warn('Grid prop "type" is deprecated. Use Grid columns and Container instead.');
  }

  const { base, sm, md } = responsiveValue(columns, 4);
  const gridStyle = {
    ...style,
    '--grid-columns-base': base,
    '--grid-columns-sm': sm,
    '--grid-columns-md': md,
    gap: gap ?? style?.gap,
    gridTemplateColumns: minItemWidth
      ? `repeat(auto-fill, minmax(min(${minItemWidth}, 100%), 1fr))`
      : style?.gridTemplateColumns,
  } as CSSProperties;
  const grid = (
    <div {...props} className={['grid-layout', className].filter(Boolean).join(' ')} style={gridStyle}>
      {children}
    </div>
  );

  if (type === 'max' || type === 'full') {
    return <Container size={type === 'full' ? 'full' : 'default'}>{grid}</Container>;
  }

  return grid;
}

export function GridItem({ span = 1, style, className, ...props }: GridItemProps) {
  const { base, sm, md } = responsiveValue(span, 1);
  return (
    <div
      {...props}
      className={['grid-layout__item', className].filter(Boolean).join(' ')}
      style={{ ...style, '--grid-span-base': base, '--grid-span-sm': sm, '--grid-span-md': md } as CSSProperties}
    />
  );
}
