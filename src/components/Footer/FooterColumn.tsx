import { Children, type ReactNode } from 'react';
import { Text } from '../Text';
import './Footer.css';

export interface FooterColumnProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

export function FooterColumn({ heading, children, className }: FooterColumnProps) {
  return (
    <nav className={['footer-column', className].filter(Boolean).join(' ')} aria-label={heading}>
      <Text as="h2" style="subtitle-2" className="footer-column__heading">{heading}</Text>
      <ul className="footer-column__links">
        {Children.toArray(children).map((child, index) => <li key={index}>{child}</li>)}
      </ul>
    </nav>
  );
}
