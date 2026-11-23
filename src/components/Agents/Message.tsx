import type { ReactNode } from 'react';
import { MessageActions, type MessageRole } from './MessageActions';

export interface MessageProps {
  role?: MessageRole | 'system';
  author?: string;
  time?: string;
  children: ReactNode;
  actions?: ReactNode;
  showActions?: boolean;
  className?: string;
}

export function Message({ role = 'agent', author, time, children, actions, showActions = true, className }: MessageProps) {
  if (role === 'system') {
    return (
      <div className={['agent-message', 'agent-message--system', className].filter(Boolean).join(' ')} role="note">
        <span className="agent-message__rule" />
        <span className="agent-message__system-text">{children}</span>
        <span className="agent-message__rule" />
      </div>
    );
  }

  const isUser = role === 'user';
  return (
    <article className={['agent-message', isUser ? 'agent-message--user' : 'agent-message--agent', className].filter(Boolean).join(' ')}>
      <header className="agent-message__header">
        {!isUser && <span className="agent-mark agent-message__mark" data-state="idle" data-size="sm" aria-hidden="true"><span className="agent-mark__core" /></span>}
        <strong className="agent-message__author">{author ?? (isUser ? 'You' : 'Agent')}</strong>
        {time && <time className="agent-message__time">{time}</time>}
      </header>
      <div className="agent-message__content">{children}</div>
      {showActions && (actions ?? <MessageActions role={role} />)}
    </article>
  );
}
