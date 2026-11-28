import type { HTMLAttributes } from 'react';
import './Prose.css';

export type ProseProps = HTMLAttributes<HTMLDivElement>;

export function Prose({ className, ...props }: ProseProps) {
  return <div {...props} className={['prose', className].filter(Boolean).join(' ')} />;
}
