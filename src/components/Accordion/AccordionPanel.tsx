import { useRef, useState, useEffect } from 'react';

export interface AccordionPanelProps {
  /** Whether the panel is visible. */
  expanded: boolean;
  /** ID referenced by the header's aria-controls. */
  id?: string;
  children?: React.ReactNode;
}

export function AccordionPanel({ expanded, id, children }: AccordionPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(expanded ? undefined : 0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (expanded) {
      setHeight(el.scrollHeight);
      const onEnd = () => setHeight(undefined);
      el.addEventListener('transitionend', onEnd, { once: true });
    } else {
      // Lock to current height before collapsing so CSS transition has a start value
      setHeight(el.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [expanded]);

  return (
    <div
      id={id}
      ref={panelRef}
      className="accordion-panel"
      style={{ height }}
      hidden={!expanded && height === 0}
    >
      <div className="accordion-content">{children}</div>
    </div>
  );
}
