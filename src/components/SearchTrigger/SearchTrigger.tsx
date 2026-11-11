import { Icon } from '../Icon';
import { Kbd } from '../Kbd';
import './SearchTrigger.css';

export interface SearchTriggerProps {
  size?: 'md' | 'lg';
  placeholder?: string;
  shortcut?: string;
  showShortcut?: boolean;
  onClick: () => void;
}

export function SearchTrigger({
  size = 'md',
  placeholder = 'Search',
  shortcut = '/',
  showShortcut = true,
  onClick,
}: SearchTriggerProps) {
  return (
    <button className="search-trigger" data-size={size} type="button" aria-label={placeholder} onClick={onClick}>
      <Icon className="search-trigger__icon" name="search" size={24} />
      <span className="search-trigger__placeholder">{placeholder}</span>
      {showShortcut && <Kbd size={size === 'lg' ? 'md' : 'sm'}>{shortcut}</Kbd>}
    </button>
  );
}
