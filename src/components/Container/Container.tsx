import type { HTMLAttributes } from 'react';
import './Container.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'full';
}

export function Container({ size = 'default', className, ...props }: ContainerProps) {
  return <div {...props} className={['layout-container', className].filter(Boolean).join(' ')} data-size={size} />;
}
