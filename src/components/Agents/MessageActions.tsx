import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

export type MessageRole = 'agent' | 'user';

export interface MessageActionsProps {
  role?: MessageRole;
  onCopy?: () => void;
  onRetry?: () => void;
  onGoodResponse?: () => void;
  onBadResponse?: () => void;
  onEdit?: () => void;
  className?: string;
}

export function MessageActions({ role = 'agent', onCopy, onRetry, onGoodResponse, onBadResponse, onEdit, className }: MessageActionsProps) {
  const actions = role === 'agent'
    ? [
      { name: 'copy', label: 'Copy response', onClick: onCopy },
      { name: 'refresh', label: 'Retry response', onClick: onRetry },
      { name: 'thumb-up', label: 'Good response', onClick: onGoodResponse },
      { name: 'thumb-down', label: 'Bad response', onClick: onBadResponse },
    ] as const
    : [
      { name: 'pencil', label: 'Edit message', onClick: onEdit },
      { name: 'copy', label: 'Copy message', onClick: onCopy },
    ] as const;

  const availableActions = actions.filter((action) => action.onClick);
  if (availableActions.length === 0) return null;

  return (
    <div className={['message-actions', className].filter(Boolean).join(' ')} data-role={role}>
      {availableActions.map((action) => (
        <Tooltip key={action.name} content={action.label}>
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            label={action.label}
            iconLeft={action.name}
            onClick={action.onClick}
          />
        </Tooltip>
      ))}
    </div>
  );
}
