import { Icon } from '../Icon';
import { Kbd } from '../Kbd';
import './SearchTrigger.css';

export interface SearchTriggerProps {
  placeholder?: string;
  shortcut?: string;
  showShortcut?: boolean;
  onClick: () => void;
}

export function SearchTrigger({
  placeholder = 'Search',
  shortcut = '/',
  showShortcut = true,
  onClick,
}: SearchTriggerProps) {
  return (
    <button className="search-trigger" type="button" aria-label={placeholder} onClick={onClick}>
      <Icon className="search-trigger__icon" name="search" size={24} />
      <span className="search-trigger__placeholder">{placeholder}</span>
      {showShortcut && <Kbd size="sm">{shortcut}</Kbd>}
    </button>
  );
}
