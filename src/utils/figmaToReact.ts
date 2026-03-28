/**
 * Figma → React naming convention utilities.
 * Handles mapping between Figma prop names/values and React conventions.
 */

/**
 * Known manual prop-name overrides.
 * "style" is a reserved HTML/CSS attribute, so it becomes "variant".
 */
export const PROP_MAP: Record<string, string> = {
  style: 'variant',
  Status: 'status',
  Type: 'type',
  State: 'state',
};

/**
 * Convert a string to PascalCase.
 * Used for component names: "nav item" → "NavItem"
 */
export function toPascalCase(name: string): string {
  return name
    .trim()
    .split(/[\s\-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert a string to camelCase.
 * Used for prop names: "Border Radius" → "borderRadius"
 */
export function toCamelCase(name: string): string {
  const pascal = toPascalCase(name);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Convert a string to lowercase-kebab.
 * Used for variant values: "Date picker" → "date-picker", "Round" → "round"
 */
export function toKebabCase(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * Map a single Figma prop key to its React prop name.
 *
 * Priority:
 *  1. PROP_MAP override
 *  2. "Show X" pattern → "showX"
 *  3. General camelCase
 */
export function toReactPropName(key: string): string {
  if (key in PROP_MAP) return PROP_MAP[key];

  const showMatch = /^Show\s+(.+)$/.exec(key);
  if (showMatch) {
    return 'show' + toPascalCase(showMatch[1]);
  }

  return toCamelCase(key);
}

/**
 * Convert a record of Figma props (all string values) to React-ready props.
 *
 * Rules applied:
 *  - Prop names: PROP_MAP overrides → "Show X" → "showX" → camelCase
 *  - "true" / "false" string values → boolean
 *  - All other values → lowercase-kebab (variant values)
 */
export function convertFigmaProps(
  props: Record<string, string>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    const reactKey = toReactPropName(key);
    let reactValue: unknown;

    if (value === 'true') {
      reactValue = true;
    } else if (value === 'false') {
      reactValue = false;
    } else {
      reactValue = toKebabCase(value);
    }

    result[reactKey] = reactValue;
  }

  return result;
}
