import { Text } from '../Text/Text';
import { Icon, type IconName } from '../Icon';
import './Logo.css';

export type LogoType = 'text' | 'image' | 'icon';

export interface LogoProps {
  /** Determines the logo content: text label or image. */
  type?: LogoType;
  /** Text label displayed when type="text". Maps to Text style="h6". */
  label?: string;
  /** Image URL when type="image". Falls back to a placeholder when omitted. */
  src?: string;
  /** Icon used when type="icon". Defaults to search. */
  mark?: IconName;
  /** Alt text for the image (type="image"). */
  alt?: string;
  /** Callback fired when the logo is clicked. */
  onClick?: () => void;
  /** When provided, wraps the logo in an <a> tag. */
  href?: string;
}

function ImagePlaceholder() {
  return <div className="logo-image-placeholder" aria-hidden="true" />;
}

function LogoContent({ type, label, src, alt, mark }: Pick<LogoProps, 'type' | 'label' | 'src' | 'alt' | 'mark'>) {
  if (type === 'image') {
    return src ? (
      <img className="logo-image" src={src} alt={alt} />
    ) : (
      <ImagePlaceholder />
    );
  }

  if (type === 'icon') {
    return (
      <span className="logo-icon" aria-hidden="true">
        <Icon name={mark ?? 'search'} size={24} />
      </span>
    );
  }

  return (
    <Text style="h6" as="span">
      {label}
    </Text>
  );
}

export function Logo({
  type = 'text',
  label = 'Logo',
  src,
  mark,
  alt = 'Logo',
  onClick,
  href,
}: LogoProps) {
  const content = <LogoContent type={type} label={label} src={src} alt={alt} mark={mark} />;

  if (href) {
    return (
      <a
        className="logo"
        data-type={type}
        href={href}
        onClick={onClick}
        aria-label={type === 'icon' || (type === 'image' && !src) ? label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="logo" data-type={type} onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}
