import type { CSSProperties, SVGProps } from 'react';
import {
  IconAlertTriangle,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBox,
  IconCalendar,
  IconChartBar,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircle,
  IconCircleDotFilled,
  IconDots,
  IconDownload,
  IconFileText,
  IconGripVertical,
  IconHelpCircle,
  IconInfoCircle,
  IconLink,
  IconMapPin,
  IconMenu2,
  IconMinus,
  IconMovie,
  IconMusic,
  IconPassword,
  IconPhoto,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconQrcode,
  IconSearch,
  IconSquare,
  IconSquareCheckFilled,
  IconSquareMinusFilled,
  IconStar,
  IconUpload,
  IconUserCircle,
  IconVideo,
  IconVolume,
  IconX,
} from '@tabler/icons-react';
import './Icon.css';

const ICONS = {
  'info-circle': IconInfoCircle,
  'alert-triangle': IconAlertTriangle,
  'user-circle': IconUserCircle,
  plus: IconPlus,
  'chart-bar': IconChartBar,
  calendar: IconCalendar,
  'square-check-filled': IconSquareCheckFilled,
  square: IconSquare,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  x: IconX,
  box: IconBox,
  'file-text': IconFileText,
  download: IconDownload,
  'grip-vertical': IconGripVertical,
  'chevron-up': IconChevronUp,
  'chevron-down': IconChevronDown,
  'square-minus-filled': IconSquareMinusFilled,
  link: IconLink,
  'map-pin': IconMapPin,
  'menu-2': IconMenu2,
  music: IconMusic,
  photo: IconPhoto,
  'player-play': IconPlayerPlay,
  qrcode: IconQrcode,
  'circle-dot-filled': IconCircleDotFilled,
  circle: IconCircle,
  minus: IconMinus,
  search: IconSearch,
  movie: IconMovie,
  video: IconVideo,
  'help-circle': IconHelpCircle,
  password: IconPassword,
  dots: IconDots,
  upload: IconUpload,
  star: IconStar,
  'player-pause': IconPlayerPause,
  volume: IconVolume,
  'brand-x': IconBrandX,
  'brand-instagram': IconBrandInstagram,
  'brand-linkedin': IconBrandLinkedin,
  'brand-youtube': IconBrandYoutube,
  'brand-facebook': IconBrandFacebook,
  'brand-tiktok': IconBrandTiktok,
  'brand-github': IconBrandGithub,
} as const;

export type IconName = keyof typeof ICONS;

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'color' | 'width' | 'height' | 'stroke' | 'strokeWidth'> & {
  /** Tabler icon name, matching the Figma Icon/<name> component. */
  name: IconName;
  /** Rendered width and height in pixels. Defaults to 24. */
  size?: number;
  /** Stroke width override. Defaults to the --icon-stroke token. */
  stroke?: number;
};

export function Icon({ name, size = 24, stroke, className, style, 'aria-hidden': ariaHidden, ...props }: IconProps) {
  const TablerIcon = ICONS[name];
  const iconStyle: CSSProperties | undefined = stroke === undefined ? style : { ...style, strokeWidth: stroke };

  return (
    <TablerIcon
      {...props}
      className={['icon', className].filter(Boolean).join(' ')}
      size={size}
      color="currentColor"
      style={iconStyle}
      aria-hidden={ariaHidden ?? true}
      focusable="false"
    />
  );
}
