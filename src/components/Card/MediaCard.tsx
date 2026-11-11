import type { ReactNode } from 'react';
import { Avatar, type AvatarProps } from '../Avatar';
import { Button } from '../Button';
import './Card.css';

export interface MediaCardActionConfig {
  label: string;
  onClick?: () => void;
}

export type MediaCardAction = ReactNode | MediaCardActionConfig;

export interface MediaCardProps {
  title: string;
  meta: string;
  avatar?: AvatarProps;
  action?: MediaCardAction;
  showAction?: boolean;
  selected?: boolean;
  interactive?: boolean;
  onSelect?: (selected: boolean) => void;
}

function isActionConfig(action: MediaCardAction | undefined): action is MediaCardActionConfig {
  return typeof action === 'object' && action !== null && 'label' in action && typeof action.label === 'string';
}

function renderAction(action: MediaCardAction | undefined) {
  if (isActionConfig(action)) {
    return <Button variant="link" size="sm" label={action.label} onClick={action.onClick} />;
  }
  if (typeof action === 'string') {
    return <Button variant="link" size="sm" label={action} />;
  }
  if (action === undefined || action === null) {
    return <Button variant="link" size="sm" label="Use this voice" />;
  }
  return action;
}

export function MediaCard({
  title,
  meta,
  avatar = { type: 'icon', shape: 'round', size: 'lg' },
  action,
  showAction = true,
  selected = false,
  interactive = false,
  onSelect,
}: MediaCardProps) {
  const canSelect = interactive || onSelect !== undefined;

  return (
    <article
      className="media-card"
      data-selected={selected || undefined}
      data-interactive={canSelect || undefined}
    >
      {canSelect ? (
        <button
          className="media-card__select"
          type="button"
          aria-pressed={selected}
          onClick={() => onSelect?.(!selected)}
        >
          <Avatar {...avatar} />
          <span className="media-card__title">{title}</span>
          <span className="media-card__meta">{meta}</span>
        </button>
      ) : (
        <div className="media-card__content">
          <Avatar {...avatar} />
          <span className="media-card__title">{title}</span>
          <span className="media-card__meta">{meta}</span>
        </div>
      )}
      {showAction && <div className="media-card__action">{renderAction(action)}</div>}
    </article>
  );
}
