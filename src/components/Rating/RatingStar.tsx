import { Icon } from '../Icon';

export type RatingStarValue = 'full' | 'half' | 'empty';

interface RatingStarProps {
  value: RatingStarValue;
  size: number;
  disabled?: boolean;
}

export function RatingStar({ value, size, disabled = false }: RatingStarProps) {
  return (
    <span className="rating-star" data-value={value} data-disabled={disabled || undefined} aria-hidden="true" style={{ width: size, height: size }}>
      {value === 'full' ? (
        <Icon className="rating-star__filled" name="star-filled" size={size} />
      ) : (
        <>
          <Icon className="rating-star__empty" name="star" size={size} />
          {value === 'half' && <span className="rating-star__half"><Icon className="rating-star__filled" name="star-filled" size={size} /></span>}
        </>
      )}
    </span>
  );
}
