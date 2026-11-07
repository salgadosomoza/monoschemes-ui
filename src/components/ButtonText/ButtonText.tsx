import { Button } from '../Button';
import type { CSSProperties } from 'react';

export type ButtonTextState = 'default' | 'disabled';

/** @deprecated Use `Button` with `variant="link"`. */
export interface ButtonTextProps {
  state?: ButtonTextState;
  label?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

/** @deprecated Use `Button` with `variant="link"`. */
export function ButtonText({ state = 'default', label = 'Button', style, onClick }: ButtonTextProps) {
  return <Button variant="link" label={label} disabled={state === 'disabled'} style={style} onClick={onClick} />;
}
