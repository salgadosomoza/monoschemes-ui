import type { ReactNode } from 'react';
import { Divider } from '../Divider';
import { Text } from '../Text';
import './Footer.css';

export interface FooterProps {
  variant?: 'default' | 'minimal';
  brandName?: string;
  brandDescription?: string;
  showBrand?: boolean;
  columns: ReactNode;
  legal: string;
  meta?: ReactNode;
  className?: string;
}

export function Footer({
  variant = 'default',
  brandName = 'Brand',
  brandDescription = 'One-line description of the product.',
  showBrand = true,
  columns,
  legal,
  meta,
  className,
}: FooterProps) {
  return (
    <footer className={['footer', className].filter(Boolean).join(' ')} data-variant={variant} aria-label="Site footer">
      {variant === 'default' && <div className="footer__top">
        {showBrand && (
          <div className="footer__brand">
            <Text as="p" style="subtitle-1" color="var(--color-text-primary)" fullWidth>{brandName}</Text>
            <Text as="p" style="body-2" color="var(--color-text-secondary)" fullWidth>{brandDescription}</Text>
          </div>
        )}
        <div className="footer__columns">{columns}</div>
      </div>}
      {variant === 'default' && <Divider className="footer__divider" />}
      <div className="footer__bottom">
        <Text as="p" style="caption" color="var(--color-text-secondary)" fullWidth>{legal}</Text>
        {meta && <div className="footer__meta">{meta}</div>}
      </div>
    </footer>
  );
}
