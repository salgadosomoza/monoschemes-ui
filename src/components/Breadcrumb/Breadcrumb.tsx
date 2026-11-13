import { Link } from '../Link';
import './Breadcrumb.css';
export interface BreadcrumbItem { label: string; href?: string }
export interface BreadcrumbProps { items: BreadcrumbItem[] }
export function Breadcrumb({ items }: BreadcrumbProps) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><ol>{items.map((item, index) => {
    const current = index === items.length - 1;
    return <li key={index}>{current
      ? <span aria-current="page" className="breadcrumb__current">{item.label}</span>
      : <Link type="default" size="small" label={item.label} href={item.href} />}
      {!current && <span className="breadcrumb__separator" aria-hidden="true">/</span>}
    </li>;
  })}</ol></nav>;
}
