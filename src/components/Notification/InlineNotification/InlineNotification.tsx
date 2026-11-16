import './InlineNotification.css';
import { Icon } from '../../Icon';

export interface InlineNotificationProps {
  /** Contextual message displayed next to the content it describes. */
  message: string;
  /** Visual and live-region type for the message. */
  type?: 'default' | 'error';
}

export function InlineNotification({ message, type = 'default' }: InlineNotificationProps) {
  return (
    <div className="inline-notification" data-type={type} role={type === 'error' ? 'alert' : 'status'}>
      <Icon className="inline-notification__icon" name={type === 'error' ? 'alert-circle' : 'info-circle'} size={24} />
      <p className="inline-notification__message">{message}</p>
    </div>
  );
}
