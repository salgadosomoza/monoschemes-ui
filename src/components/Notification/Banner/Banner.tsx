import './Banner.css';

export interface BannerAction {
  label: string;
  onClick: () => void;
}

export interface BannerProps {
  message: string;
  position?: 'top' | 'bottom';
  isVisible?: boolean;
  onClose?: () => void;
  action?: BannerAction;
}

export function Banner({
  message,
  position = 'top',
  isVisible = false,
  onClose,
  action,
}: BannerProps) {
  if (!isVisible) return null;

  return (
    <div className="banner" data-position={position} role="banner">
      <span className="banner-message">{message}</span>
      <div className="banner-actions">
        {action && (
          <button type="button" className="banner-action-btn" onClick={action.onClick}>
            {action.label}
          </button>
        )}
        {onClose && (
          <button type="button" className="banner-close" aria-label="Close banner" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
