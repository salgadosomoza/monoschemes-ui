import './Accordion.css';

export interface AccordionProps {
  /** One or more AccordionItem elements. */
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="accordion">{children}</div>;
}
