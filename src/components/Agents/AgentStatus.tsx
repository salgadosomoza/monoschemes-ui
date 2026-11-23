import { Button } from '../Button';
import { Kbd } from '../Kbd';
import { AgentMark } from './AgentMark';

export type AgentStatusState = 'thinking' | 'tool' | 'approval' | 'streaming' | 'stopped' | 'error';

export interface AgentStatusProps {
  state: AgentStatusState;
  label?: string;
  onStop?: () => void;
  className?: string;
}

const stateLabels: Record<AgentStatusState, string> = {
  thinking: 'Thinking…',
  tool: 'Using a tool…',
  approval: 'Waiting for your approval',
  streaming: 'Writing…',
  stopped: 'Stopped',
  error: 'Something went wrong. Try again.',
};

export function AgentStatus({ state, label, onStop, className }: AgentStatusProps) {
  const isWorking = state === 'thinking' || state === 'tool' || state === 'streaming';
  const markState = state === 'streaming' ? 'speaking' : state === 'thinking' || state === 'tool' ? 'thinking' : 'idle';
  const visibleLabel = label ?? stateLabels[state];

  return (
    <div
      className={['agent-status', className].filter(Boolean).join(' ')}
      data-state={state}
      role="group"
      aria-label="Agent status"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isWorking) {
          event.preventDefault();
          onStop?.();
        }
      }}
    >
      <AgentMark state={markState} />
      <span className="agent-status__label" aria-hidden="true">{visibleLabel}</span>
      <span className="agent-status__announcement" role="status" aria-live="polite">{stateLabels[state]}</span>
      {isWorking && onStop && (
        <div className="agent-status__stop">
          <Button variant="tertiary" size="sm" label="Stop" onClick={onStop} />
          <Kbd size="sm">Esc</Kbd>
        </div>
      )}
    </div>
  );
}
