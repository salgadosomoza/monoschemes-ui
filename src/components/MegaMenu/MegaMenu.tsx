import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './MegaMenu.css';
import { usePresence } from '../../utils/usePresence';
import { useMegaMenuContext } from './MegaMenuContext';

export interface MegaMenuItem { label: string; description?: string; href: string }
export interface MegaMenuGroup { heading: string; items: MegaMenuItem[] }
export interface MegaMenuProps {
  id?: string;
  groups: MegaMenuGroup[];
  featured?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MegaMenu({ id: menuId, groups, featured, open: controlledOpen, defaultOpen = false, onOpenChange }: MegaMenuProps) {
  const context = useMegaMenuContext();
  const id = useId();
  const panelId = context ? `${context.panelId}${menuId ? `-${menuId}` : ''}` : id;
  const panelRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = context ? ((context.open && (menuId === undefined || context.activeMenuId === undefined || context.activeMenuId === menuId)) || context.compactOpen) : controlledOpen ?? internalOpen;
  const presence = usePresence(isOpen, 120);

  const setOpen = (next: boolean) => {
    if (!context && controlledOpen === undefined) setInternalOpen(next);
    context?.setOpen(next);
    onOpenChange?.(next);
  };
  useEffect(() => { panelRef.current?.toggleAttribute('inert', !isOpen); }, [isOpen, presence.mounted]);

  if (!presence.mounted || (context?.open && menuId !== undefined && context.activeMenuId !== undefined && context.activeMenuId !== menuId && !context.compactOpen)) return null;
  return <div ref={panelRef} className="mega-menu" id={panelId} role="navigation" aria-label="Mega menu" aria-hidden={!isOpen || undefined} data-state={presence.state} onTransitionEnd={presence.onTransitionEnd} onPointerEnter={() => context?.cancelClose()} onPointerLeave={() => context?.scheduleClose()}>
    <div className="mega-menu__groups">
      {groups.slice(0, 4).map((group) => <section className="mega-menu__group" key={group.heading}>
        <h2 className="mega-menu__heading">{group.heading}</h2>
        <ul className="mega-menu__items">{group.items.map((item) => <li key={`${item.href}-${item.label}`}><a className="mega-menu__item" href={item.href} onClick={() => setOpen(false)}><span className="mega-menu__item-title">{item.label}</span>{item.description && <span className="mega-menu__item-description">{item.description}</span>}</a></li>)}</ul>
      </section>)}
    </div>
    {featured && <div className="mega-menu__featured">{featured}</div>}
  </div>;
}
