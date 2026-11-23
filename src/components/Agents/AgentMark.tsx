import type { CSSProperties } from 'react';

export type AgentMarkState = 'idle' | 'thinking' | 'listening' | 'speaking';
export type AgentMarkSize = 'sm' | 'md' | 'lg';

export interface AgentMarkProps {
  state?: AgentMarkState;
  size?: AgentMarkSize;
  /** Audio level from 0 to 1. Used by listening and speaking states. */
  level?: number;
  className?: string;
}

export function AgentMark({ state = 'idle', size = 'sm', level = 0, className }: AgentMarkProps) {
  const clampedLevel = Math.max(0, Math.min(1, level));
  const style = { '--agent-mark-level': clampedLevel } as CSSProperties;

  return (
    <span
      className={['agent-mark', className].filter(Boolean).join(' ')}
      data-state={state}
      data-size={size}
      style={style}
      aria-hidden="true"
    >
      {state === 'idle' && <span className="agent-mark__core" />}
      {state === 'thinking' && <span className="agent-mark__core agent-mark__core--thinking" />}
      {(state === 'listening' || state === 'speaking') && (
        <span className="agent-mark__bars">
          <span className="agent-mark__bar agent-mark__bar--left" />
          <span className="agent-mark__bar agent-mark__bar--center" />
          <span className="agent-mark__bar agent-mark__bar--right" />
        </span>
      )}
    </span>
  );
}
