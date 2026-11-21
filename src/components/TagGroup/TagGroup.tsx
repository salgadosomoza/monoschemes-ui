import { useState } from 'react';
import { Button } from '../Button';
import { Tag, type TagSize, type TagType } from '../Tag';
import './TagGroup.css';

export interface TagGroupItem {
  label: string;
}

export interface TagGroupProps {
  /** Labels displayed as tags. */
  tags: TagGroupItem[];
  /** Maximum number of tags shown while collapsed. */
  maxVisible?: number;
  /** Shared visual treatment for every tag in the group. */
  type?: TagType;
  /** Size passed to every tag. */
  size?: TagSize;
  /** Initial expanded state when the component is uncontrolled. */
  defaultExpanded?: boolean;
  /** Expanded state for controlled usage. */
  expanded?: boolean;
  /** Called whenever the overflow control requests a state change. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Localized visible label for the collapsed control. */
  moreLabel?: (hiddenCount: number) => string;
  /** Localized visible label for the expanded control. */
  lessLabel?: string;
  /** Localized accessible name for the collapsed control. */
  moreAriaLabel?: (hiddenCount: number) => string;
  /** Localized accessible name for the expanded control. */
  lessAriaLabel?: string;
}

/** A wrapping list of tags with an accessible control for revealing overflow. */
export function TagGroup({
  tags,
  maxVisible = 4,
  type = 'default',
  size = 'md',
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  moreLabel = (count) => `+${count}`,
  lessLabel = 'Show less',
  moreAriaLabel = (count) => `Show ${count} more tags`,
  lessAriaLabel = 'Show fewer tags',
}: TagGroupProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;
  const visibleCount = Math.max(0, Math.floor(maxVisible));
  const hiddenCount = Math.max(0, tags.length - visibleCount);
  const visibleTags = isExpanded ? tags : tags.slice(0, visibleCount);

  const toggleExpanded = () => {
    const nextExpanded = !isExpanded;
    if (!isControlled) setInternalExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };

  return (
    <ul className="tag-group" aria-label="Tags">
      {visibleTags.map((tag, index) => (
        <li className="tag-group__item" key={`${tag.label}-${index}`}>
          <Tag label={tag.label} type={type} size={size} />
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="tag-group__item tag-group__control">
          <Button
            variant="link"
            size="sm"
            label={isExpanded ? lessLabel : moreLabel(hiddenCount)}
            aria-label={isExpanded ? lessAriaLabel : moreAriaLabel(hiddenCount)}
            aria-expanded={isExpanded}
            onClick={toggleExpanded}
          />
        </li>
      )}
    </ul>
  );
}
