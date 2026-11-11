import { Text } from '../Text/Text';
import './Accordion.css';
import { Icon } from '../Icon';

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
      <Icon className="accordion-icon" name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
    </button>
  );
}
