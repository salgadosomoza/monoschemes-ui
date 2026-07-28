import { Text } from '../Text/Text';
import '../../styles/icons.css';

export interface AccordionHeaderProps {
  /** Whether the associated panel is expanded — controls icon direction. */
  expanded?: boolean;
  /** Disables interaction. */
  disabled?: boolean;
  /** Called when the header is clicked. */
  onClick?: () => void;
  /** ID of the associated panel element (aria-controls). */
  panelId?: string;
  /** Title text. */
  children: React.ReactNode;
}

export function AccordionHeader({
  expanded = false,
  disabled = false,
  onClick,
  panelId,
  children,
}: AccordionHeaderProps) {
  return (
    <button
      className="accordion-header"
      type="button"
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onClick}
      disabled={disabled}
    >
      <Text style="subtitle-1" as="span">
        {children}
      </Text>
      <span className="material-symbols-outlined accordion-icon" aria-hidden="true">
        {expanded ? 'expand_less' : 'expand_more'}
      </span>
    </button>
  );
}
