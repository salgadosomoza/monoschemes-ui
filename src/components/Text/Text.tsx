import type { ElementType, ReactNode } from 'react';
import './Text.css';

export type TextStyle =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle-1' | 'subtitle-2'
  | 'body-1' | 'body-2'
  | 'caption' | 'overline';
export type TextAlign = 'left' | 'center' | 'right';

export interface TextProps {
  /** Typography style — maps directly to Figma style variants. */
  style?: TextStyle;
  /** Content rendered inside the element. */
  children: ReactNode;
  /** CSS color override. Defaults to var(--color-text-primary). */
  color?: string;
  /** Horizontal text alignment. Defaults to left. */
  align?: TextAlign;
  /** Fills the available width and removes the style max-width. */
  fullWidth?: boolean;
  /** HTML tag override. Defaults to the semantic tag for each style. */
  as?: ElementType;
  /** Additional class for composing the text style. */
  className?: string;
}

const DEFAULT_TAG: Record<TextStyle, ElementType> = {
  'h1':         'h1',
  'h2':         'h2',
  'h3':         'h3',
  'h4':         'h4',
  'h5':         'h5',
  'h6':         'h6',
  'subtitle-1': 'p',
  'subtitle-2': 'p',
  'body-1':     'p',
  'body-2':     'p',
  'caption':    'span',
  'overline':   'span',
};

export function Text({
  style = 'body-1',
  children,
  color,
  align = 'left',
  fullWidth = false,
  as,
  className,
}: TextProps) {
  const Tag = as ?? DEFAULT_TAG[style];

  return (
    <Tag
      className={['text', className].filter(Boolean).join(' ')}
      data-style={style}
      data-align={align}
      data-full-width={fullWidth || undefined}
      style={color ? { color } : undefined}
    >
      {children}
    </Tag>
  );
}
