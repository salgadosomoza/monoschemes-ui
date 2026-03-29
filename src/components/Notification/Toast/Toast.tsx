import { useEffect, useState, useCallback } from 'react';
import './Toast.css';

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

  useEffect(() => {
    if (!visible || duration === 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast" data-type={type} role="alert" aria-live="assertive">
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
        ×
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
