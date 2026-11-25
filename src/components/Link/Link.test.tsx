import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Link } from './Link';

afterEach(cleanup);

describe('Link download', () => {
  it.each([
    [true, ''],
    ['CV.pdf', 'CV.pdf'],
    [false, null],
  ] as const)('renders the native download attribute for %s', (download, attribute) => {
    render(<Link label="Download CV" href="/cv.pdf" download={download} />);

    const link = screen.getByRole('link', { name: 'Download CV' });
    expect(link.getAttribute('href')).toBe('/cv.pdf');
    expect(link.getAttribute('download')).toBe(attribute);
  });
});
