import type { HTMLAttributes } from 'react';
import './Spinner.css';
export type SpinnerType='squares'|'grid'|'outline';
export type SpinnerSize='default'|'small';
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>,'children'> { type?:SpinnerType; size?:SpinnerSize; showLabel?:boolean }
export function Spinner({type='grid',size='default',showLabel=true,className,...props}:SpinnerProps) {
  const count=type==='squares'?3:4;
  return <span {...props} className={['spinner',className].filter(Boolean).join(' ')} data-type={type} data-size={size} role="status" aria-label="Loading">
    <span className="spinner__shape" aria-hidden="true">{Array.from({length:count},(_,i)=><i key={i} />)}</span>
    {size==='default'&&showLabel&&<span className="spinner__label">Loading...</span>}
  </span>;
}
