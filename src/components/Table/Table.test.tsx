import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Table } from './Table';
import type { ReactNode } from 'react';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'team', label: 'Team', sortable: true },
];
const rows = [
  { id: 'a', name: 'Mina', team: 'Design' },
  { id: 'b', name: 'Ari', team: 'Engineering' },
  { id: 'c', name: 'Zoë', team: 'Design' },
];
const rowKey = (row: Record<string, ReactNode>) => String(row.id);
afterEach(cleanup);

function rowNames() {
  return screen.getAllByText(/^(Mina|Ari|Zoë)$/).map((node) => node.textContent);
}

describe('Table', () => {
  it('filters text values and resets pagination to page one', () => {
    render(<Table columns={columns} data={rows} searchable pageSize={1} getRowKey={rowKey} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Ari')).toBeTruthy();
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'Zoë' } });
    expect(screen.getByText('Zoë')).toBeTruthy();
    expect(screen.queryByText('Ari')).toBeNull();
  });

  it('cycles sort ascending, descending, then unsorted', () => {
    render(<Table columns={columns} data={rows} getRowKey={rowKey} />);
    const sortButton = screen.getByRole('button', { name: /Name/ });
    fireEvent.click(sortButton);
    expect(rowNames()).toEqual(['Ari', 'Mina', 'Zoë']);
    expect(screen.getByRole('columnheader', { name: /Name/ }).getAttribute('aria-sort')).toBe('ascending');
    fireEvent.click(sortButton);
    expect(rowNames()).toEqual(['Zoë', 'Mina', 'Ari']);
    expect(screen.getByRole('columnheader', { name: /Name/ }).getAttribute('aria-sort')).toBe('descending');
    fireEvent.click(sortButton);
    expect(rowNames()).toEqual(['Mina', 'Ari', 'Zoë']);
    expect(screen.getByRole('columnheader', { name: /Name/ }).hasAttribute('aria-sort')).toBe(false);
  });

  it('selects only current-page rows and exposes the indeterminate state', () => {
    const onSelectionChange = vi.fn();
    render(<Table columns={columns} data={rows} selectable pageSize={2} getRowKey={rowKey} onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
    const selectAll = screen.getByRole('checkbox', { name: 'Select all rows on this page' });
    expect(selectAll).toHaveProperty('indeterminate', true);
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a']);
    fireEvent.click(selectAll);
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a', 'b']);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows on this page' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a', 'b', 'c']);
  });

  it('shows an empty state and omits the footer when there are no results', () => {
    render(<Table columns={columns} data={rows} searchable searchValue="missing" getRowKey={rowKey} />);
    expect(screen.getByText('No results')).toBeTruthy();
    expect(screen.queryByRole('navigation', { name: 'Table pages' })).toBeNull();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy();
  });
});
