import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Button } from '../Button';
import { Kbd } from '../Kbd';
import { Tag } from '../Tag';
import { AgentMark } from './AgentMark';

export interface ComposerAttachment {
  id: string;
  name: string;
}

export interface ComposerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  onStop?: () => void;
  busy?: boolean;
  voiceActive?: boolean;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  transcript?: string;
  level?: number;
  onAttach?: () => void;
  attachments?: ComposerAttachment[];
  onRemoveAttachment?: (id: string) => void;
  onEditLast?: () => void;
  placeholder?: string;
  showHint?: boolean;
  className?: string;
}

export function Composer({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSend,
  onStop,
  busy = false,
  voiceActive = false,
  onVoiceStart,
  onVoiceEnd,
  transcript = '',
  level = 0,
  onAttach,
  attachments = [],
  onRemoveAttachment,
  onEditLast,
  placeholder = 'Ask anything…',
  showHint = true,
  className,
}: ComposerProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const value = isControlled ? controlledValue : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value, voiceActive]);

  const updateValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const send = () => {
    const message = value.trim();
    if (!message || busy) return;
    onSend?.(message);
    updateValue('');
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    } else if (event.key === 'ArrowUp' && value.length === 0 && onEditLast) {
      event.preventDefault();
      onEditLast?.();
    }
  };

  const toggleVoice = () => voiceActive ? onVoiceEnd?.() : onVoiceStart?.();

  return (
    <div
      className={['agent-composer', className].filter(Boolean).join(' ')}
      data-state={voiceActive ? 'voice' : busy ? 'busy' : focused ? 'focused' : value ? 'filled' : 'empty'}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && busy) {
          event.preventDefault();
          onStop?.();
        } else if (event.key === 'Escape' && voiceActive) {
          event.preventDefault();
          onVoiceEnd?.();
        }
      }}
    >
      <div className="agent-composer__box">
        {voiceActive ? (
          <div className="agent-composer__voice" aria-live="off">
            <AgentMark state="listening" size="md" level={level} />
            <div className="agent-composer__voice-text">
              <span className="agent-composer__voice-hint">Listening… speak normally</span>
              <span className="agent-composer__transcript" aria-label="Live transcription">{transcript}</span>
            </div>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            className="agent-composer__textarea"
            value={value}
            placeholder={busy ? 'Agent is answering…' : placeholder}
            aria-label="Message the agent"
            disabled={busy}
            rows={1}
            onChange={(event) => updateValue(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
          />
        )}
        {attachments.length > 0 && (
          <div className="agent-composer__attachments">
            {attachments.map((attachment) => (
              <span className="agent-composer__attachment" key={attachment.id}>
                <Tag type="subtle" size="sm" label={attachment.name} />
                {onRemoveAttachment && <Button variant="tertiary" size="sm" iconOnly label={`Remove ${attachment.name}`} iconLeft="x" onClick={() => onRemoveAttachment(attachment.id)} />}
              </span>
            ))}
          </div>
        )}
        <div className="agent-composer__toolbar">
          {!voiceActive && <Button variant="tertiary" size="md" iconOnly label="Attach file" iconLeft="paperclip" onClick={onAttach} />}
          <span className="agent-composer__spacer" />
          {voiceActive ? (
            <Button variant="tertiary" size="sm" label="End voice" iconLeft="x" aria-pressed={voiceActive} onClick={toggleVoice} />
          ) : (
            <Button variant="secondary" size="md" iconOnly label="Start voice input" iconLeft="microphone" aria-pressed={voiceActive} onClick={toggleVoice} />
          )}
          {busy ? (
            <Button variant="primary" size="md" iconOnly label="Stop generating" iconLeft="player-stop" onClick={onStop} />
          ) : !voiceActive && (
            <Button variant="primary" size="md" iconOnly label="Send message" iconLeft="arrow-up" disabled={!value.trim()} onClick={send} />
          )}
        </div>
      </div>
      {showHint && !voiceActive && (
        <div className="agent-composer__hint">
          <Kbd size="sm">Enter</Kbd><span>to send ·</span><Kbd size="sm">Shift</Kbd><span>+</span><Kbd size="sm">Enter</Kbd><span>for a new line</span>
          {busy && <><Kbd size="sm">Esc</Kbd><span>to stop</span></>}
        </div>
      )}
      {voiceActive && <p className="agent-composer__voice-note">Voice stays on until you end it. Everything you say is written in the thread.</p>}
      <span className="agent-composer__sr-only" role="status" aria-live="polite">{voiceActive ? 'Voice input active' : ''}</span>
    </div>
  );
}
