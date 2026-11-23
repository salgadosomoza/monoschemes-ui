import { Text } from '../Text';
import { RatingStar } from './RatingStar';
import './Rating.css';

export type RatingType = 'stars' | 'compact';
export type RatingSize = 'md' | 'sm';

export interface RatingProps {
  /** Score from zero to five. Displayed to the nearest half star. */
  value: number;
  /** Optional number of reviews. */
  count?: number;
  type?: RatingType;
  size?: RatingSize;
  showValue?: boolean;
  showCount?: boolean;
}

export function normalizeRating(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(Math.min(5, Math.max(0, value)) * 2) / 2;
}

function getStarValue(rating: number, index: number) {
  const remaining = rating - index;
  if (remaining >= 1) return 'full' as const;
  if (remaining >= 0.5) return 'half' as const;
  return 'empty' as const;
}

export function Rating({ value, count, type = 'stars', size = 'md', showValue = true, showCount = true }: RatingProps) {
  const rating = normalizeRating(value);
  const displayValue = rating.toFixed(1);
  const countText = count?.toLocaleString('en-US');
  const accessibleName = count === undefined
    ? `${displayValue} out of 5`
    : `${displayValue} out of 5, ${countText} reviews`;

  return (
    <div className="rating" data-type={type} data-size={size} role="img" aria-label={accessibleName}>
      <span className="rating__stars">
        {Array.from({ length: type === 'compact' ? 1 : 5 }, (_, index) => (
          <RatingStar key={index} value={type === 'compact' ? (rating > 0 ? 'full' : 'empty') : getStarValue(rating, index)} size={size === 'md' ? 20 : 16} />
        ))}
      </span>
      {showValue && <Text className="rating__value" style={size === 'md' ? 'subtitle-2' : 'caption'} as="span">{displayValue}</Text>}
      {showCount && count !== undefined && (
        <Text className="rating__count" style={size === 'md' ? 'body-2' : 'caption'} color="var(--color-text-muted)" as="span">
          {type === 'compact' ? `· ${countText} reviews` : `(${countText})`}
        </Text>
      )}
    </div>
  );
}
