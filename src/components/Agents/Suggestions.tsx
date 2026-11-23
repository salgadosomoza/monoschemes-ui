import { Button } from '../Button';

export interface SuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  inputValue?: string;
  busy?: boolean;
  className?: string;
}

export function Suggestions({ suggestions, onSelect, inputValue = '', busy = false, className }: SuggestionsProps) {
  if (busy || inputValue.trim() || suggestions.length === 0) return null;
  return (
    <div className={['agent-suggestions', className].filter(Boolean).join(' ')} role="group" aria-label="Suggested messages">
      {suggestions.slice(0, 4).map((suggestion) => (
        <Button key={suggestion} variant="secondary" size="sm" label={suggestion} onClick={() => onSelect(suggestion)} />
      ))}
    </div>
  );
}
