import { useState, useRef, useEffect, useId } from 'react';
import { Text } from '../Text/Text';
import './Accordion.css';

export interface AccordionProps {
  /** Header title text. */
  title?: string;
  /** Panel content. */
  children?: React.ReactNode;
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback fired when the accordion is toggled. */
  onToggle?: (open: boolean) => void;
}

function ExpandMoreIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="accordion-icon"
    >
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );
}

function ExpandLessIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="accordion-icon"
    >
      <path d="M12 8 6 14l1.41 1.41L12 10.83l4.59 4.58L18 14z" />
    </svg>
  );
}

export function Accordion({
  title = 'Section title',
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
}: AccordionProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number | undefined>(
    isOpen ? undefined : 0,
  );
  const panelId = useId();

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (isOpen) {
      setPanelHeight(el.scrollHeight);
      const onTransitionEnd = () => setPanelHeight(undefined);
      el.addEventListener('transitionend', onTransitionEnd, { once: true });
    } else {
      // Lock to current height before collapsing so transition has a start value
      setPanelHeight(el.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelHeight(0));
      });
    }
  }, [isOpen]);

  function handleToggle() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  }

  return (
    <div className="accordion" data-state={isOpen ? 'expanded' : 'collapsed'}>
      <button
        className="accordion-header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <Text style="subtitle-1" as="span">
          {title}
        </Text>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <div
        id={panelId}
        ref={panelRef}
        className="accordion-panel"
        style={{ height: panelHeight }}
        hidden={!isOpen && panelHeight === 0}
      >
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
}
