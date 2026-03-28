import { Text } from '../Text/Text';
import './Tag.css';

export type TagType = 'default';

export interface TagProps {
  /** Tag variant type. */
  type?: TagType;
  /** Text label displayed inside the tag. */
  label?: string;
  /** Custom background color override. */
  color?: string;
}

export function Tag({
  type = 'default',
  label = 'Tag name',
  color,
}: TagProps) {
  return (
    <span
      className="tag"
      data-type={type}
      style={color ? { background: color } : undefined}
    >
      <Text style="caption" as="span">
        {label}
      </Text>
    </span>
  );
}
