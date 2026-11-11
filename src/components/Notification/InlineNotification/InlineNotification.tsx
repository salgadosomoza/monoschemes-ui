import './InlineNotification.css';
import { Icon } from '../../Icon';

export interface InlineNotificationProps {
  /** Contextual message displayed next to the content it describes. */
  message: string;
}

export function InlineNotification({ message }: InlineNotificationProps) {
  return (
    <div className="inline-notification" role="status">
      <Icon className="inline-notification__icon" name="info-circle" size={20} />
      <p className="inline-notification__message">{message}</p>
    </div>
  );
}
