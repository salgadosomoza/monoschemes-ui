import type { ElementType, ReactNode } from 'react';
import './Text.css';

export type TextStyle =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle-1' | 'subtitle-2'
  | 'body-1' | 'body-2'
  | 'caption' | 'overline';

export interface TextProps {
  /** Typography style — maps directly to Figma style variants. */
  style?: TextStyle;
  /** Content rendered inside the element. */
  children: ReactNode;
  /** CSS color override. Defaults to var(--color-text-primary). */
  color?: string;
  /** HTML tag override. Defaults to the semantic tag for each style. */
  as?: ElementType;
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
  as,
}: TextProps) {
  const Tag = as ?? DEFAULT_TAG[style];

  return (
    <Tag
      className="text"
      data-style={style}
      style={color ? { color } : undefined}
    >
      {children}
    </Tag>
  );
}
