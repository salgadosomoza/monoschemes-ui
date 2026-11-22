import { Children, isValidElement, useCallback, useEffect, useId, useMemo, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from '../Icon';
import { Kbd } from '../Kbd';
import { Button } from '../Button';
import { readCssDuration, usePresence } from '../../utils/usePresence';
import './CommandPalette.css';

export interface CommandPaletteItemProps {
  label: string;
  description?: string;
  icon?: IconName;
  shortcut?: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}
export interface CommandPaletteGroupProps { label: string; children: ReactNode }
export interface CommandPaletteProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  shortcut?: string | null;
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  loading?: boolean;
  emptyTitle?: string;
  children: ReactNode;
}

export function CommandPaletteItem(props: CommandPaletteItemProps) { void props; return null; }
export function CommandPaletteGroup(props: CommandPaletteGroupProps) { void props; return null; }

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
}
function getShortcutKey(shortcut: string) {
  return shortcut.toLowerCase() === 'mod+k' ? 'k' : shortcut.toLowerCase();
}

export function CommandPalette({ open: controlledOpen, defaultOpen = false, onOpenChange, shortcut = 'mod+k', placeholder = 'Search commands', query: controlledQuery, onQueryChange, loading = false, emptyTitle = 'No results', children }: CommandPaletteProps) {
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const [internalQuery, setInternalQuery] = useState('');
  const query = controlledQuery ?? internalQuery;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const presence = usePresence(open, readCssDuration('--duration-fast', 120));

  const setOpen = useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);
  const setQuery = useCallback((next: string) => {
    if (controlledQuery === undefined) setInternalQuery(next);
    onQueryChange?.(next);
  }, [controlledQuery, onQueryChange]);

  const groups = useMemo(() => Children.toArray(children).filter(isValidElement).map((group, groupIndex) => {
    const groupProps = group.props as CommandPaletteGroupProps;
    const items = Children.toArray(groupProps.children).filter(isValidElement).map((item, itemIndex) => {
      const props = item.props as CommandPaletteItemProps;
      return { element: item as ReactElement<CommandPaletteItemProps>, props, id: `${id}-item-${groupIndex}-${itemIndex}` };
    }).filter(({ props }) => {
      if (!query.trim()) return true;
      const haystack = normalize([props.label, ...(props.keywords ?? [])].join(' '));
      return haystack.includes(normalize(query.trim()));
    });
    return { label: groupProps.label, id: `${id}-group-${groupIndex}`, items };
  }).filter(group => group.items.length > 0), [children, id, query]);
  const enabledItems = useMemo(() => groups.flatMap(group => group.items.filter(item => !item.props.disabled)), [groups]);

  useEffect(() => {
    const host = document.createElement('div');
    host.className = 'command-palette-portal';
    const themeSource = document.querySelector<HTMLElement>('[data-theme]');
    if (themeSource?.dataset.theme) host.dataset.theme = themeSource.dataset.theme;
    document.body.append(host);
    setPortalHost(host);
    return () => host.remove();
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => { if (open && portalHost) inputRef.current?.focus(); }, [open, portalHost]);

  useEffect(() => {
    if (!open || !portalHost) return;
    const themeSource = returnFocusRef.current?.closest<HTMLElement>('[data-theme]');
    if (themeSource && themeSource !== document.documentElement && themeSource.dataset.theme) portalHost.dataset.theme = themeSource.dataset.theme;
    else delete portalHost.dataset.theme;
  }, [open, portalHost]);

  useEffect(() => {
    if (!shortcut) return;
    const key = getShortcutKey(shortcut);
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = shortcut.toLowerCase() === 'mod+k' ? (navigator.platform.toLowerCase().includes('mac') ? event.metaKey : event.ctrlKey) : (event.metaKey || event.ctrlKey);
      if (!modifier || event.key.toLowerCase() !== key || event.defaultPrevented || event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('[contenteditable]:not([contenteditable="false"])'))) return;
      event.preventDefault();
      if (!open) setOpen(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen, shortcut]);

  useEffect(() => { setActiveId(enabledItems[0]?.id ?? null); }, [enabledItems]);

  const close = useCallback(() => setOpen(false), [setOpen]);
  const selectActive = useCallback(() => {
    const item = enabledItems.find(candidate => candidate.id === activeId);
    item?.props.onSelect?.();
    if (item) close();
  }, [activeId, close, enabledItems]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { event.preventDefault(); selectActive(); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    if (!enabledItems.length) return;
    if (event.key === 'Home') setActiveId(enabledItems[0].id);
    else if (event.key === 'End') setActiveId(enabledItems[enabledItems.length - 1].id);
    else {
      const current = enabledItems.findIndex(item => item.id === activeId);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      setActiveId(enabledItems[(current + delta + enabledItems.length) % enabledItems.length].id);
    }
  };

  if (!presence.mounted || !portalHost) return null;
  const list = (
    <div className="command-palette-overlay" data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" data-state={presence.state} onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); close(); return; }
        if (event.key !== 'Tab') return;
        const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => getComputedStyle(element).display !== 'none');
        if (!focusable.length) { event.preventDefault(); return; }
        if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
      }}>
        <div className="command-palette__search"><Icon name="search" size={24} aria-hidden="true" /><input ref={inputRef} role="combobox" aria-label={placeholder} aria-expanded="true" aria-controls={`${id}-list`} aria-activedescendant={activeId ?? undefined} value={query} placeholder={placeholder} onChange={event => setQuery(event.currentTarget.value)} onKeyDown={handleKeyDown} /><Button className="command-palette__cancel" variant="link" size="sm" label="Cancel" onClick={close} /></div>
        <div id={`${id}-list`} className="command-palette__list" role="listbox" aria-label="Commands" aria-busy={loading}>
          {loading ? <div className="command-palette__loading" aria-label="Loading commands">{Array.from({ length: 4 }, (_, index) => <div className="command-palette__skeleton" key={index} />)}</div> : groups.length ? groups.map(group => (
            <div role="group" aria-labelledby={group.id} key={group.id} className="command-palette__group">
              <div id={group.id} className="command-palette__group-label">{group.label}</div>
              {group.items.map(item => {
                const selected = item.id === activeId;
                const props = item.props;
                return <div id={item.id} key={item.id} role="option" aria-selected={selected} aria-disabled={props.disabled || undefined} className="command-palette-item" data-active={selected || undefined} data-disabled={props.disabled || undefined} onMouseMove={() => !props.disabled && setActiveId(item.id)} onMouseDown={event => event.preventDefault()} onClick={() => { if (!props.disabled) { props.onSelect?.(); close(); } }}>
                  {props.icon && <Icon name={props.icon} size={16} aria-hidden="true" />}
                  <span className="command-palette-item__copy"><span className="command-palette-item__label">{props.label}</span>{props.description && <span className="command-palette-item__description">{props.description}</span>}</span>
                  {props.shortcut && <Kbd size="sm">{props.shortcut}</Kbd>}
                </div>;
              })}
            </div>
          )) : <div className="command-palette__empty"><Icon name="search" size={32} aria-hidden="true" /><strong>{emptyTitle}</strong><span>Try a different search.</span></div>}
        </div>
        <div className="command-palette__footer"><span><Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> navigate</span><span><Kbd size="sm">↵</Kbd> open</span><span><Kbd size="sm">esc</Kbd> close</span></div>
        <div className="command-palette__announcer" aria-live="polite" aria-atomic="true">{loading ? 'Loading results' : groups.length ? `${enabledItems.length} results` : 'No results'}</div>
      </div>
    </div>
  );
  return createPortal(list, portalHost);
}
