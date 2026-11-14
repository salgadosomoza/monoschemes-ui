import { useEffect, useState, useCallback, useRef } from 'react';
import { Icon } from '../../Icon';
import './Toast.css';
import { usePresence } from '../../../utils/usePresence';

export type ToastType = 'default' | 'success' | 'error' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  isVisible?: boolean;
  onClose?: () => void;
}

export function Toast({
  message,
  type = 'default',
  duration = 3000,
  isVisible = false,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  const presence = usePresence(visible, 120);
  const toastRef = useRef<HTMLDivElement>(null);
  useEffect(() => { toastRef.current?.toggleAttribute('inert', !visible); }, [visible, presence.mounted]);

  useEffect(() => {
    if (!visible || duration === 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!presence.mounted) return null;

  return (
    <div ref={toastRef} className="toast" data-type={type} data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} role="alert" aria-live="assertive">
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        aria-label="Close notification"
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
      >
        <Icon name="x" size={24} />
      </button>
    </div>
  );
}

export interface UseToastOptions {
  type?: ToastType;
  duration?: number;
}

export function useToast() {
  const [state, setState] = useState<{
    message: string;
    type: ToastType;
    duration: number;
    visible: boolean;
  }>({ message: '', type: 'default', duration: 3000, visible: false });

  const show = useCallback((message: string, options?: UseToastOptions) => {
    setState({ message, type: options?.type ?? 'default', duration: options?.duration ?? 3000, visible: true });
  }, []);

  const hide = useCallback(() => {
    setState(s => ({ ...s, visible: false }));
  }, []);

  return { show, hide, toastProps: { ...state, isVisible: state.visible, onClose: hide } };
}
