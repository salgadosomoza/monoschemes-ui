import { Text } from '../Text/Text';
import './Tag.css';

export type TagType = 'default' | 'subtle' | 'inverse';
export type TagSize = 'md' | 'sm';

export interface TagProps {
  /** Tag variant type. */
  type?: TagType;
  /** Tag size. */
  size?: TagSize;
  /** Text label displayed inside the tag. */
  label?: string;
  /** Custom background color override. */
  color?: string;
}

export function Tag({
  type = 'default',
  size = 'md',
  label = 'Tag name',
  color,
}: TagProps) {
  return (
    <span
      className="tag"
      data-type={type}
      data-size={size}
      style={color ? { background: color } : undefined}
    >
      <Text style="caption" as="span">
        {label}
      </Text>
    </span>
  );
}
