import type { ReactNode } from 'react';
import { Text } from '../Text';
import './DescriptionList.css';

export interface DescriptionListItem {
  term: string;
  description: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionListItem[];
}

/** Present a set of related terms and descriptions. Use Table for comparable repeated data. */
export function DescriptionList({ items }: DescriptionListProps) {
  return (
    <dl className="description-list">
      {items.map(({ term, description }, index) => (
        <div className="description-list__row" data-divided={index < items.length - 1 || undefined} key={`${term}-${index}`}>
          <dt><Text style="body-2" color="var(--color-text-muted)">{term}</Text></dt>
          <dd><Text style="body-1" color="var(--color-text-primary)">{description}</Text></dd>
        </div>
      ))}
    </dl>
  );
}
