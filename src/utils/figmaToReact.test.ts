import { describe, it, expect } from 'vitest';
import {
  PROP_MAP,
  toPascalCase,
  toCamelCase,
  toKebabCase,
  toReactPropName,
  convertFigmaProps,
} from './figmaToReact';

describe('PROP_MAP', () => {
  it('maps "style" to "variant"', () => {
    expect(PROP_MAP['style']).toBe('variant');
  });

  it('maps "Type" to "type"', () => {
    expect(PROP_MAP['Type']).toBe('type');
  });
});

describe('toPascalCase', () => {
  it('converts space-separated words', () => {
    expect(toPascalCase('nav item')).toBe('NavItem');
  });

  it('handles a single word', () => {
    expect(toPascalCase('avatar')).toBe('Avatar');
  });

  it('converts "form input" to "FormInput"', () => {
    expect(toPascalCase('form input')).toBe('FormInput');
  });
});

describe('toCamelCase', () => {
  it('converts "Border Radius" to "borderRadius"', () => {
    expect(toCamelCase('Border Radius')).toBe('borderRadius');
  });

  it('converts a single word to lowercase', () => {
    expect(toCamelCase('Status')).toBe('status');
  });
});

describe('toKebabCase', () => {
  it('lowercases "Round"', () => {
    expect(toKebabCase('Round')).toBe('round');
  });

  it('lowercases "Rounded"', () => {
    expect(toKebabCase('Rounded')).toBe('rounded');
  });

  it('converts "Date picker" to "date-picker"', () => {
    expect(toKebabCase('Date picker')).toBe('date-picker');
  });

  it('trims surrounding whitespace', () => {
    expect(toKebabCase('  Round  ')).toBe('round');
  });
});

describe('toReactPropName', () => {
  it('applies PROP_MAP override for "style" → "variant"', () => {
    expect(toReactPropName('style')).toBe('variant');
  });

  it('applies PROP_MAP override for "Type" → "type"', () => {
    expect(toReactPropName('Type')).toBe('type');
  });

  it('converts "Show Icon" to "showIcon"', () => {
    expect(toReactPropName('Show Icon')).toBe('showIcon');
  });

  it('converts "Show Badge Count" to "showBadgeCount"', () => {
    expect(toReactPropName('Show Badge Count')).toBe('showBadgeCount');
  });

  it('converts general keys to camelCase', () => {
    expect(toReactPropName('Border Radius')).toBe('borderRadius');
  });
});

describe('convertFigmaProps', () => {
  it('maps "style" key to "variant" and value to kebab', () => {
    expect(convertFigmaProps({ style: 'Round' })).toEqual({ variant: 'round' });
  });

  it('converts multi-word variant values to lowercase-kebab', () => {
    expect(convertFigmaProps({ style: 'Date picker' })).toEqual({
      variant: 'date-picker',
    });
  });

  it('converts "true"/"false" string values to booleans', () => {
    expect(
      convertFigmaProps({ 'Show Icon': 'true', 'Show Label': 'false' })
    ).toEqual({ showIcon: true, showLabel: false });
  });

  it('applies all PROP_MAP overrides at once', () => {
    expect(
      convertFigmaProps({
        style: 'Round',
        Status: 'Active',
        Type: 'icon',
        State: 'hover',
      })
    ).toEqual({
      variant: 'round',
      status: 'active',
      type: 'icon',
      state: 'hover',
    });
  });

  it('handles mixed boolean and variant-value props', () => {
    expect(
      convertFigmaProps({
        style: 'Rounded',
        'Show Badge': 'true',
        Type: 'icon',
      })
    ).toEqual({
      variant: 'rounded',
      showBadge: true,
      type: 'icon',
    });
  });

  it('converts "Rounded" variant to "rounded" and "Square" to "square"', () => {
    expect(convertFigmaProps({ style: 'Rounded' })).toEqual({
      variant: 'rounded',
    });
    expect(convertFigmaProps({ style: 'Square' })).toEqual({
      variant: 'square',
    });
  });
});
