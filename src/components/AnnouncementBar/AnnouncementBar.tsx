import { Icon } from '../Icon';
import './AnnouncementBar.css';

export interface AnnouncementBarProps {
  message: string;
  linkLabel?: string;
  href?: string;
  onLinkClick?: () => void;
  showLink?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}

function AnnouncementLink({ label, href, onClick }: { label: string; href?: string; onClick?: () => void }) {
  const content = (
    <>
      <span>{label}</span>
      <Icon name="arrow-right" size={16} />
    </>
  );

  if (href) {
    return <a className="announcement-bar__link" href={href} onClick={onClick}>{content}</a>;
  }
  if (onClick) {
    return <button className="announcement-bar__link" type="button" onClick={onClick}>{content}</button>;
  }
  return <span className="announcement-bar__link">{content}</span>;
}

export function AnnouncementBar({
  message,
  linkLabel = 'Learn more',
  href,
  onLinkClick,
  showLink = true,
  showClose = true,
  onClose,
}: AnnouncementBarProps) {
  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="announcement-bar__content">
        <span className="announcement-bar__message">{message}</span>
        {showLink && <AnnouncementLink label={linkLabel} href={href} onClick={onLinkClick} />}
      </div>
      {showClose && (
        <button
          className="announcement-bar__close"
          type="button"
          aria-label="Dismiss announcement"
          onClick={onClose}
        >
          <Icon name="x" size={20} />
        </button>
      )}
    </div>
  );
}
