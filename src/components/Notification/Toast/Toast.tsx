import { useEffect, useState, useCallback, useRef } from 'react';
import { Icon, type IconName } from '../../Icon';
import './Toast.css';
import { usePresence } from '../../../utils/usePresence';

export type ToastType = 'default' | 'success' | 'error' | 'warning';

const toastIcons: Partial<Record<ToastType, IconName>> = {
  success: 'circle-check',
  warning: 'alert-triangle',
  error: 'alert-circle',
};

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

  const isError = type === 'error';
  const iconName = toastIcons[type];

  return (
    <div
      ref={toastRef}
      className="toast"
      data-type={type}
      data-state={presence.state}
      onTransitionEnd={presence.onTransitionEnd}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
    >
      {iconName && <Icon className="toast-icon" name={iconName} size={24} />}
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
