import '../../../styles/icons.css';
import './InlineNotification.css';

export interface InlineNotificationProps {
  /** Contextual message displayed next to the content it describes. */
  message: string;
}

export function InlineNotification({ message }: InlineNotificationProps) {
  return (
    <div className="inline-notification" role="status">
      <span className="inline-notification__icon material-symbols-outlined" aria-hidden="true">info</span>
      <p className="inline-notification__message">{message}</p>
    </div>
  );
}
