import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AgentMark } from './AgentMark';
import { AgentStatus } from './AgentStatus';
import { Message } from './Message';
import { ToolCall } from './ToolCall';
import { ApprovalRequest } from './ApprovalRequest';
import { Suggestions } from './Suggestions';
import { Composer } from './Composer';
import { AgentThread } from './AgentThread';

afterEach(cleanup);

describe('agent components', () => {
  it('renders the mark as decorative and exposes its state for styling', () => {
    render(<AgentMark state="thinking" size="md" />);
    const mark = document.querySelector('.agent-mark');
    expect(mark?.getAttribute('data-state')).toBe('thinking');
    expect(mark?.getAttribute('data-size')).toBe('md');
    expect(mark?.getAttribute('aria-hidden')).toBe('true');
  });

  it('announces status changes while keeping custom streaming text out of the live region', () => {
    const { rerender } = render(<AgentStatus state="streaming" label="Writing 3 words…" />);
    expect(screen.getByRole('status').textContent).toBe('Writing…');
    expect(screen.getByText('Writing 3 words…').getAttribute('aria-hidden')).toBe('true');
    rerender(<AgentStatus state="tool" label="Searching 1 result…" />);
    expect(screen.getByRole('status').textContent).toBe('Using a tool…');
  });

  it('stops active work with Escape from the status controls', () => {
    const onStop = vi.fn();
    render(<AgentStatus state="tool" onStop={onStop} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Stop' }), { key: 'Escape' });
    expect(onStop).toHaveBeenCalledOnce();
  });

  it('renders agent, user and system message semantics', () => {
    render(<><Message role="agent">Answer</Message><Message role="user">Question</Message><Message role="system">Started</Message></>);
    expect(screen.getAllByRole('article')[0].textContent).toContain('Answer');
    expect(screen.getAllByRole('article')[1].textContent).toContain('Question');
    expect(screen.getByRole('note').textContent).toContain('Started');
  });

  it('keeps the disclosure target mounted and toggles its expanded state', () => {
    render(<ToolCall name="Search" summary="looking up" state="done" />);
    const trigger = screen.getByRole('button', { name: /Search: looking up/ });
    const targetId = trigger.getAttribute('aria-controls');
    expect(targetId && document.getElementById(targetId)).toBeTruthy();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('moves focus to Allow when a pending approval appears and resolves it', async () => {
    const onAllow = vi.fn();
    const { rerender } = render(<ApprovalRequest title="Send email?" description="Review the message." state="allowed" onAllow={onAllow} />);
    rerender(<ApprovalRequest title="Send email?" description="Review the message." state="pending" onAllow={onAllow} />);
    const allow = screen.getByRole('button', { name: 'Allow' });
    await waitFor(() => expect(document.activeElement).toBe(allow));
    fireEvent.click(allow);
    expect(onAllow).toHaveBeenCalledOnce();
  });

  it('selects suggestions and hides them while typing or busy', () => {
    const onSelect = vi.fn();
    const { rerender } = render(<Suggestions suggestions={['Compare options']} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Compare options' }));
    expect(onSelect).toHaveBeenCalledWith('Compare options');
    rerender(<Suggestions suggestions={['Compare options']} onSelect={onSelect} inputValue="Com" />);
    expect(screen.queryByRole('group', { name: 'Suggested messages' })).toBeNull();
    rerender(<Suggestions suggestions={['Compare options']} onSelect={onSelect} busy />);
    expect(screen.queryByRole('group', { name: 'Suggested messages' })).toBeNull();
  });

  it('sends on Enter, preserves Shift+Enter, and restores focus after send', async () => {
    const onSend = vi.fn();
    render(<Composer onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message the agent' });
    fireEvent.change(input, { target: { value: '  Hello  ' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Hello');
    await waitFor(() => expect(document.activeElement).toBe(input));
  });

  it('stops generation with Escape even while the textarea is disabled', () => {
    const onStop = vi.fn();
    render(<Composer busy onStop={onStop} />);
    const stop = screen.getByRole('button', { name: 'Stop generating' });
    stop.focus();
    fireEvent.keyDown(stop, { key: 'Escape' });
    expect(onStop).toHaveBeenCalledOnce();
  });

  it('exposes voice activation as a pressed state and supports stopping voice with Escape', () => {
    const onVoiceEnd = vi.fn();
    render(<Composer voiceActive onVoiceEnd={onVoiceEnd} />);
    const endVoice = screen.getByRole('button', { name: 'End voice' });
    expect(endVoice.getAttribute('aria-pressed')).toBe('true');
    fireEvent.keyDown(endVoice, { key: 'Escape' });
    expect(onVoiceEnd).toHaveBeenCalledOnce();
  });

  it('lets the host handle ArrowUp to edit the previous message', () => {
    const onEditLast = vi.fn();
    render(<Composer onEditLast={onEditLast} />);
    const input = screen.getByRole('textbox', { name: 'Message the agent' });
    input.focus();
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onEditLast).toHaveBeenCalledOnce();
  });

  it('offers the thread as a conversation log and hides a closed panel', () => {
    const { rerender } = render(<AgentThread layout="panel" open><Message role="agent">Hello</Message></AgentThread>);
    expect(screen.getByRole('log', { name: 'Conversation' })).toBeTruthy();
    rerender(<AgentThread layout="panel" open={false}><Message role="agent">Hello</Message></AgentThread>);
    expect(screen.queryByRole('log', { name: 'Conversation' })).toBeNull();
  });
});
