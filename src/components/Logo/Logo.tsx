import { Text } from '../Text/Text';
import { Icon, type IconName } from '../Icon';
import './Logo.css';

export type LogoType = 'text' | 'image' | 'icon';
export type LogoSize = 'md' | 'lg';

export interface LogoProps {
  /** Determines the logo content: text label or image. */
  type?: LogoType;
  /** Display size; md preserves the current sizing. */
  size?: LogoSize;
  /** Text label displayed when type="text". Uses h6 at md and h3 at lg. */
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

function LogoContent({ type, size, label, src, alt, mark }: Pick<LogoProps, 'type' | 'size' | 'label' | 'src' | 'alt' | 'mark'>) {
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
        <Icon name={mark ?? 'search'} size={size === 'lg' ? 48 : 24} />
      </span>
    );
  }

  return (
    <Text style={size === 'lg' ? 'h3' : 'h6'} as="span">
      {label}
    </Text>
  );
}

export function Logo({
  type = 'text',
  size = 'md',
  label = 'Logo',
  src,
  mark,
  alt = 'Logo',
  onClick,
  href,
}: LogoProps) {
  const content = <LogoContent type={type} size={size} label={label} src={src} alt={alt} mark={mark} />;

  if (href) {
    return (
      <a
        className="logo"
        data-type={type}
        data-size={size}
        href={href}
        onClick={onClick}
        aria-label={type === 'icon' || (type === 'image' && !src) ? label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="logo" data-type={type} data-size={size} onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}
