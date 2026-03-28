import { Text } from '../Text/Text';
import './Logo.css';

export type LogoType = 'text' | 'image';

export interface LogoProps {
  /** Determines the logo content: text label or image. */
  type?: LogoType;
  /** Text label displayed when type="text". Maps to Text style="h6". */
  label?: string;
  /** Image URL when type="image". Falls back to a placeholder when omitted. */
  src?: string;
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

function LogoContent({ type, label, src, alt }: Pick<LogoProps, 'type' | 'label' | 'src' | 'alt'>) {
  if (type === 'image') {
    return src ? (
      <img className="logo-image" src={src} alt={alt} />
    ) : (
      <ImagePlaceholder />
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
  alt = 'Logo',
  onClick,
  href,
}: LogoProps) {
  const content = <LogoContent type={type} label={label} src={src} alt={alt} />;

  if (href) {
    return (
      <a className="logo" data-type={type} href={href} onClick={onClick}>
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
