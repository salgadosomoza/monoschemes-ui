import { Icon, type IconName } from '../Icon';
import './IconTile.css';

export interface IconTileProps {
  icon: IconName;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function IconTile({ icon, label, selected = false, onClick }: IconTileProps) {
  return (
    <button
      className="icon-tile"
      type="button"
      data-selected={selected ? 'true' : undefined}
      aria-pressed={onClick ? selected : undefined}
      onClick={onClick}
    >
      <Icon className="icon-tile__icon" name={icon} size={24} aria-hidden="true" />
      <span className="icon-tile__label">{label}</span>
    </button>
  );
}
