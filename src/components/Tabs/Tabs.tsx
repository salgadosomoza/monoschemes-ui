import { Children, createContext, isValidElement, useContext, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactElement, type ReactNode } from 'react';
import './Tabs.css';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  baseId: string;
  tabValues: string[];
  panelValues: string[];
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`${component} must be rendered inside <Tabs>.`);
  return context;
}

export interface TabProps {
  /** Stable value used to associate this tab with its panel. */
  value: string;
  /** Visible tab label. */
  label: string;
  /** Prevents selection and removes the tab from keyboard navigation. */
  disabled?: boolean;
}

export interface TabPanelProps {
  /** Value of the tab that controls this panel. */
  value: string;
  children: ReactNode;
}

export interface TabsProps {
  /** Currently selected tab value. */
  value: string;
  /** Called when keyboard or pointer interaction selects another tab. */
  onChange: (value: string) => void;
  /** Accessible name of the tab list. */
  'aria-label': string;
  children: ReactNode;
}

export function Tab({ value, label, disabled = false }: TabProps) {
  const context = useTabsContext('Tab');
  const index = context.tabValues.indexOf(value);
  const selected = context.value === value;
  const panelIndex = context.panelValues.indexOf(value);
  const tabId = `${context.baseId}-tab-${index}`;
  const panelId = `${context.baseId}-panel-${panelIndex}`;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const enabledValues = context.tabValues.filter((tabValue) => {
      const tab = document.getElementById(`${context.baseId}-tab-${context.tabValues.indexOf(tabValue)}`);
      return tab instanceof HTMLButtonElement && !tab.disabled;
    });
    const currentIndex = enabledValues.indexOf(value);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % enabledValues.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + enabledValues.length) % enabledValues.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = enabledValues.length - 1;

    if (nextIndex === undefined || !enabledValues.length) return;
    event.preventDefault();
    const nextValue = enabledValues[nextIndex];
    context.onChange(nextValue);
    document.getElementById(`${context.baseId}-tab-${context.tabValues.indexOf(nextValue)}`)?.focus();
  }

  return (
    <button
      id={tabId}
      className="tabs__tab"
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelIndex >= 0 ? panelId : undefined}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => { if (!disabled) context.onChange(value); }}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  );
}

export function TabPanel({ value, children }: TabPanelProps) {
  const context = useTabsContext('TabPanel');
  const tabIndex = context.tabValues.indexOf(value);
  const panelIndex = context.panelValues.indexOf(value);
  if (tabIndex < 0) throw new Error(`TabPanel value "${value}" does not match a Tab.`);

  return (
    <div
      id={`${context.baseId}-panel-${panelIndex}`}
      className="tabs__panel"
      role="tabpanel"
      aria-labelledby={`${context.baseId}-tab-${tabIndex}`}
      tabIndex={0}
      hidden={context.value !== value}
    >
      {children}
    </div>
  );
}

export function Tabs({ value, onChange, 'aria-label': ariaLabel, children }: TabsProps) {
  const reactId = useId().replace(/:/g, '');
  const baseId = `monoschemes-tabs-${reactId}`;
  const childElements = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const tabElements = childElements.filter((child) => child.type === Tab) as ReactElement<TabProps>[];
  const panelElements = childElements.filter((child) => child.type === TabPanel) as ReactElement<TabPanelProps>[];
  const context: TabsContextValue = {
    value,
    onChange,
    baseId,
    tabValues: tabElements.map((tab) => tab.props.value),
    panelValues: panelElements.map((panel) => panel.props.value),
  };
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, ready: false });
  const indicatorInitialized = useRef(false);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const selected = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!selected) return;
      const listRect = list.getBoundingClientRect();
      const tabRect = selected.getBoundingClientRect();
      setIndicator({ x: tabRect.left - listRect.left + list.scrollLeft, width: tabRect.width, ready: indicatorInitialized.current });
      if (!indicatorInitialized.current) {
        indicatorInitialized.current = true;
        window.requestAnimationFrame(() => setIndicator((current) => ({ ...current, ready: true })));
      }
    };
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    observer?.observe(list);
    list.querySelectorAll('[role="tab"]').forEach((tab) => observer?.observe(tab));
    window.addEventListener('resize', update);
    return () => { observer?.disconnect(); window.removeEventListener('resize', update); };
  }, [value, tabElements.length]);
  const indicatorStyle = {
    '--tabs-indicator-x': `${indicator.x}px`,
    '--tabs-indicator-w': `${indicator.width}px`,
  } as CSSProperties;

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs">
        <div ref={listRef} className="tabs__list" data-indicator-ready={indicator.ready || undefined} role="tablist" aria-label={ariaLabel}>
          {tabElements}
          <span className="tabs__indicator" aria-hidden="true" style={indicatorStyle} />
        </div>
        <div className="tabs__panels">{panelElements}</div>
      </div>
    </TabsContext.Provider>
  );
}
