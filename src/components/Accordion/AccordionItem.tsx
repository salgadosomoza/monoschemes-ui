import { useState, useId } from 'react';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';
import './Accordion.css';

export interface AccordionItemProps {
  /** Header title text. */
  title?: string;
  /** Panel content. */
  children?: React.ReactNode;
  /** Initial expanded state (uncontrolled). */
  defaultExpanded?: boolean;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Callback fired when the item is toggled. */
  onToggle?: (expanded: boolean) => void;
  /** Disables interaction. */
  disabled?: boolean;
}

export function AccordionItem({
  title = 'Section title',
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  disabled = false,
}: AccordionItemProps) {
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;
  const panelId = useId();

  function handleToggle() {
    if (disabled) return;
    const next = !isExpanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  }

  return (
    <div
      className="accordion-item"
      data-state={isExpanded ? 'expanded' : 'collapsed'}
      data-disabled={disabled ? '' : undefined}
    >
      <AccordionHeader
        expanded={isExpanded}
        disabled={disabled}
        onClick={handleToggle}
        panelId={panelId}
      >
        {title}
      </AccordionHeader>
      <AccordionPanel expanded={isExpanded} id={panelId}>
        {children}
      </AccordionPanel>
    </div>
  );
}
