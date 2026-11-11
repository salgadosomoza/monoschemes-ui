import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { Text } from '../Text';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: IconName;
  showIcon?: boolean;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function EmptyState({
  icon = 'search',
  showIcon = true,
  title,
  description,
  actions,
}: EmptyStateProps) {
  return (
    <section className="empty-state" aria-label={title}>
      {showIcon && <Icon className="empty-state__icon" name={icon} size={48} aria-hidden="true" />}
      <Text className="empty-state__title" style="h6" as="h2">{title}</Text>
      <Text className="empty-state__description" style="body-2" as="p">{description}</Text>
      {actions && <div className="empty-state__actions">{actions}</div>}
    </section>
  );
}
