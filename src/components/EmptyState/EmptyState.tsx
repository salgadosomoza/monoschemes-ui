import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { Text } from '../Text';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: IconName;
  /** Semantic tone for the icon. Use error for whole-view error states. */
  iconTone?: 'default' | 'error';
  showIcon?: boolean;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function EmptyState({
  icon = 'search',
  iconTone = 'default',
  showIcon = true,
  title,
  description,
  actions,
}: EmptyStateProps) {
  return (
    <section className="empty-state" aria-label={title}>
      {showIcon && <Icon className="empty-state__icon" data-tone={iconTone} name={icon} size={48} aria-hidden="true" />}
      <Text className="empty-state__title" style="h6" as="h2">{title}</Text>
      <Text className="empty-state__description" style="body-2" as="p">{description}</Text>
      {actions && <div className="empty-state__actions">{actions}</div>}
    </section>
  );
}
