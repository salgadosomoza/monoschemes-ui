import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('centers the title and description', () => {
    render(<EmptyState title="No results" description="Try another search." showIcon={false} />);

    expect(screen.getByRole('region', { name: 'No results' }).className).toContain('empty-state');
    expect(screen.getByRole('heading', { name: 'No results' }).getAttribute('data-align')).toBe('center');
    expect(screen.getByText('Try another search.').getAttribute('data-align')).toBe('center');
  });
});
