import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { Button } from '../Button';
import { AgentMark } from './AgentMark';

export type AgentThreadLayout = 'dedicated' | 'panel';

export interface AgentThreadProps {
  children: ReactNode;
  layout?: AgentThreadLayout;
  title?: string;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export function AgentThread({ children, layout = 'dedicated', title = 'Assistant', open = true, onClose, className }: AgentThreadProps) {
  const logRef = useRef<HTMLDivElement>(null);
  const wasAtBottom = useRef(true);

  useLayoutEffect(() => {
    const log = logRef.current;
    if (log && wasAtBottom.current) log.scrollTop = log.scrollHeight;
  }, [children]);

  if (layout === 'panel' && !open) return null;

  return (
    <section className={['agent-thread', `agent-thread--${layout}`, className].filter(Boolean).join(' ')} aria-label={title}>
      <header className="agent-thread__header">
        <AgentMark size="sm" />
        <strong>{title}</strong>
        {layout === 'panel' && onClose && <Button variant="tertiary" size="sm" iconOnly label="Close assistant" iconLeft="x" onClick={onClose} />}
      </header>
      <div
        ref={logRef}
        className="agent-thread__log"
        role="log"
        aria-label="Conversation"
        aria-relevant="additions"
        onScroll={(event) => {
          const element = event.currentTarget;
          wasAtBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 24;
        }}
      >
        {children}
      </div>
    </section>
  );
}
