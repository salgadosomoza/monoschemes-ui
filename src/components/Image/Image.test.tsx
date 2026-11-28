import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Image } from './Image';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Image ratio', () => {
  it('defaults to 16:9 and applies ratio to the frame of a loaded image', () => {
    const { rerender } = render(<Image />);
    expect(screen.getByRole('img').getAttribute('data-ratio')).toBe('16:9');

    rerender(<Image ratio="1:1" src="/photo.png" alt="Courtyard" />);
    expect(screen.getByRole('img', { name: 'Courtyard' }).parentElement?.getAttribute('data-ratio')).toBe('1:1');
  });

  it('supports the deprecated type, preferring ratio and warning once', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { rerender } = render(<Image type="3:2" />);
    expect(screen.getByRole('img').getAttribute('data-ratio')).toBe('3:2');

    rerender(<Image type="3:2" ratio="4:5" />);
    expect(screen.getByRole('img').getAttribute('data-ratio')).toBe('4:5');
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
