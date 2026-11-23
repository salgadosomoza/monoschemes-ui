import { useId, useState, type ReactNode } from 'react';
import { CodeBlock } from '../CodeBlock';
import { Icon } from '../Icon';
import { AgentMark } from './AgentMark';

export type ToolCallState = 'running' | 'done' | 'error';

export interface ToolCallProps {
  name: string;
  summary: string;
  state?: ToolCallState;
  result?: ReactNode;
  input?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export function ToolCall({ name, summary, state = 'running', result, input, defaultExpanded = false, className }: ToolCallProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const detailsId = useId();
  const statusLabel = state === 'running' ? 'Running' : state === 'done' ? 'Done' : 'Failed';

  return (
    <section className={['tool-call', className].filter(Boolean).join(' ')} data-state={state}>
      <button
        type="button"
        className="tool-call__trigger"
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={`${name}: ${summary}. ${statusLabel}`}
        onClick={() => setExpanded((current) => !current)}
      >
        <Icon name="tool" size={20} />
        <span className="tool-call__name">{name}</span>
        <span className="tool-call__summary">{summary}</span>
        <span className="tool-call__status">
          {state === 'running' && <AgentMark state="thinking" size="sm" />}
          {state === 'done' && <Icon name="circle-check" size={16} />}
          {state === 'error' && <Icon name="alert-circle" size={16} />}
          <span>{statusLabel}</span>
        </span>
        <Icon className="tool-call__chevron" name={expanded ? 'chevron-up' : 'chevron-down'} size={20} />
      </button>
      <div className="tool-call__details" id={detailsId} hidden={!expanded}>
        {input !== undefined && <div className="tool-call__input"><span className="tool-call__caption">Input</span><CodeBlock filename={name} code={input} /></div>}
        {result !== undefined && <div className="tool-call__result">{result}</div>}
      </div>
    </section>
  );
}
