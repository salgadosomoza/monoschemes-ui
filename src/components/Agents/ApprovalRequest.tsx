import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

export type ApprovalState = 'pending' | 'allowed' | 'denied';

export interface ApprovalRequestProps {
  title: string;
  description: string;
  preview?: ReactNode;
  state?: ApprovalState;
  onAllow?: () => void;
  onDeny?: () => void;
  onEdit?: () => void;
  className?: string;
}

export function ApprovalRequest({ title, description, preview, state, onAllow, onDeny, onEdit, className }: ApprovalRequestProps) {
  const [internalState, setInternalState] = useState<ApprovalState>('pending');
  const currentState = state ?? internalState;
  const allowRef = useRef<HTMLButtonElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (currentState === 'pending' && !wasPending.current) allowRef.current?.focus();
    wasPending.current = currentState === 'pending';
  }, [currentState]);

  const resolve = (next: ApprovalState, callback?: () => void) => {
    if (state === undefined) setInternalState(next);
    callback?.();
  };

  if (currentState !== 'pending') {
    const allowed = currentState === 'allowed';
    return (
      <div className={['approval-request', 'approval-request--resolved', className].filter(Boolean).join(' ')} data-state={currentState}>
        <Icon name={allowed ? 'circle-check' : 'x'} size={16} />
        <span>{allowed ? `You allowed: ${title}` : `You denied: ${title}`}</span>
      </div>
    );
  }

  return (
    <section className={['approval-request', className].filter(Boolean).join(' ')} data-state="pending" role="group" aria-label={title}>
      <header className="approval-request__header">
        <Icon name="alert-triangle" size={20} />
        <h3>{title}</h3>
      </header>
      <p className="approval-request__description">{description}</p>
      {preview !== undefined && <div className="approval-request__preview">{preview}</div>}
      <div className="approval-request__actions">
        <Button ref={allowRef} variant="primary" size="md" label="Allow" onClick={() => resolve('allowed', onAllow)} />
        <Button variant="secondary" size="md" label="Deny" onClick={() => resolve('denied', onDeny)} />
        <Button variant="tertiary" size="md" label="Edit first" onClick={onEdit} />
      </div>
    </section>
  );
}
