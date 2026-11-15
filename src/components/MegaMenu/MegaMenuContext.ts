import { createContext, useContext } from 'react';

export interface MegaMenuContextValue {
  open: boolean;
  compactOpen: boolean;
  activeMenuId?: string;
  panelId: string;
  setOpen: (open: boolean, menuId?: string) => void;
  toggle: (trigger: HTMLElement, menuId?: string) => void;
  setTrigger: (trigger: HTMLElement | null) => void;
  scheduleOpen: (trigger: HTMLElement, menuId?: string) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
}

export const MegaMenuContext = createContext<MegaMenuContextValue | null>(null);
export const useMegaMenuContext = () => useContext(MegaMenuContext);
