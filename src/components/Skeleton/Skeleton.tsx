import type { CSSProperties } from 'react';
import './Skeleton.css';
export interface SkeletonProps { width?:CSSProperties['width']; height?:CSSProperties['height']; className?:string }
export function Skeleton({width='100%',height=48,className}:SkeletonProps) {
  return <span aria-hidden="true" className={['skeleton',className].filter(Boolean).join(' ')} style={{width,height}} />;
}
