import { Text } from '../Text/Text';
import './Stat.css';

export type StatTone = 'default' | 'muted';

export interface StatProps {
  label: string;
  value: string;
  unit?: string;
  tone?: StatTone;
}

export function Stat({ label, value, unit, tone = 'default' }: StatProps) {
  const color = tone === 'muted' ? 'var(--color-text-muted)' : 'var(--color-text-strong)';

  return (
    <div className="stat" data-tone={tone}>
      <Text className="stat__label" style="caption" color={color}>{label}</Text>
      <div className="stat__value-row">
        <Text className="stat__value" style="h3" color={color}>{value}</Text>
        {unit ? <Text className="stat__unit" style="caption" color="var(--color-text-muted)">{unit}</Text> : null}
      </div>
    </div>
  );
}
