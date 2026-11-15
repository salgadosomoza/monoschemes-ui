import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Text } from './Text';

describe('Text display scale', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it.each(['display-1', 'display-2', 'display-3'] as const)('sets data-style for %s', (style) => {
    render(<Text style={style}>660</Text>);
    expect(screen.getByText('660').getAttribute('data-style')).toBe(style);
  });

  it('keeps display as a working alias and warns only once in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { rerender } = render(<Text style="display">660</Text>);
    expect(screen.getByText('660').getAttribute('data-style')).toBe('display');
    rerender(<Text style="display">661</Text>);
    expect(screen.getByText('661').getAttribute('data-style')).toBe('display');
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
