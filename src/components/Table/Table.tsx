import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { FormCheckbox } from '../FormCheckbox';
import { FormSearch } from '../FormSearch';
import { FormSelect } from '../FormSelect';
import { Icon } from '../Icon';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';
import './Table.css';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right';
  sortable?: boolean;
}

export type TableSortDirection = 'ascending' | 'descending';
export interface TableSort { key: string; direction: TableSortDirection }
export type TableRow = Record<string, ReactNode>;
export type TableRowKey = string | number;

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  /** @deprecated Rows are never striped; retained for source compatibility. */
  striped?: boolean;
  /** @deprecated Table dividers follow the design system and cannot be disabled. */
  bordered?: boolean;
  onRowClick?: (row: TableRow) => void;
  'aria-label'?: string;
  sort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;
  selectable?: boolean;
  getRowKey?: (row: TableRow, index: number) => TableRowKey;
  selectedKeys?: TableRowKey[];
  onSelectionChange?: (keys: TableRowKey[]) => void;
  selectionActions?: ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterRow?: (row: TableRow, query: string) => boolean;
  actions?: ReactNode;
  pageSize?: number;
  pageSizeOptions?: number[];
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  emptyState?: ReactNode;
  loading?: boolean;
}

interface RowEntry { row: TableRow; sourceIndex: number; key: TableRowKey }
const defaultRowKey = (_row: TableRow, index: number) => index;

function compareValues(a: ReactNode, b: ReactNode): number | null {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  return null;
}

function nextSort(current: TableSort | null, key: string): TableSort | null {
  if (current?.key !== key) return { key, direction: 'ascending' };
  if (current.direction === 'ascending') return { key, direction: 'descending' };
  return null;
}

export function Table({
  columns,
  data,
  onRowClick,
  'aria-label': ariaLabel = 'Data table',
  sort: controlledSort,
  onSortChange,
  selectable = false,
  getRowKey = defaultRowKey,
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,
  selectionActions,
  searchable = false,
  searchPlaceholder = 'Search',
  searchValue: controlledSearch,
  onSearchChange,
  filterRow,
  actions,
  pageSize: pageSizeProp = 10,
  pageSizeOptions = [10, 25, 50],
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  onPageSizeChange,
  emptyState,
  loading = false,
}: TableProps) {
  const [internalSort, setInternalSort] = useState<TableSort | null>(null);
  const sort = controlledSort === undefined ? internalSort : controlledSort;
  const [internalKeys, setInternalKeys] = useState<TableRowKey[]>([]);
  const selectedKeys = controlledSelectedKeys ?? internalKeys;
  const [internalSearch, setInternalSearch] = useState('');
  const search = controlledSearch ?? internalSearch;
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = controlledPage ?? internalPage;
  const [pageSize, setInternalPageSize] = useState(Math.max(1, pageSizeProp));
  const filterCriteria = useRef({ data, search });

  useEffect(() => setInternalPageSize(Math.max(1, pageSizeProp)), [pageSizeProp]);
  useEffect(() => {
    const previous = filterCriteria.current;
    if (previous.data !== data || previous.search !== search) {
      setInternalPage(1);
      onPageChange?.(1);
    }
    filterCriteria.current = { data, search };
  }, [data, onPageChange, search]);

  const sourceRows = useMemo<RowEntry[]>(() => data.map((row, sourceIndex) => ({ row, sourceIndex, key: getRowKey(row, sourceIndex) })), [data, getRowKey]);
  const filteredRows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return sourceRows;
    return sourceRows.filter(({ row }) => {
      if (filterRow) return filterRow(row, search);
      const searchableValues = columns
        .filter((column) => column.align !== 'right')
        .map((column) => row[column.key])
        .filter((value): value is string => typeof value === 'string');
      return searchableValues.some((value) => String(value).toLocaleLowerCase().includes(query));
    });
  }, [columns, filterRow, search, sourceRows]);

  const sortedRows = useMemo(() => {
    if (!sort) return filteredRows;
    const column = columns.find((item) => item.key === sort.key);
    if (!column?.sortable) return filteredRows;
    const sign = sort.direction === 'ascending' ? 1 : -1;
    return [...filteredRows].sort((a, b) => sign * (compareValues(a.row[sort.key], b.row[sort.key]) ?? 0));
  }, [columns, filteredRows, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const pageRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const visibleKeys = pageRows.map((entry) => entry.key);
  const selectedOnPage = visibleKeys.filter((key) => selectedKeys.includes(key)).length;
  const allOnPageSelected = visibleKeys.length > 0 && selectedOnPage === visibleKeys.length;
  const partiallySelected = selectedOnPage > 0 && !allOnPageSelected;

  function setPage(next: number) {
    setInternalPage(next);
    onPageChange?.(next);
  }

  function setSearch(next: string) {
    setInternalSearch(next);
    onSearchChange?.(next);
  }

  function setPageSize(next: number) {
    const safePageSize = Math.max(1, next);
    setInternalPageSize(safePageSize);
    onPageSizeChange?.(safePageSize);
    setPage(1);
  }

  function changeSort(key: string) {
    const next = nextSort(sort, key);
    if (controlledSort === undefined) setInternalSort(next);
    onSortChange?.(next);
    setPage(1);
  }

  function changeSelection(next: TableRowKey[]) {
    if (controlledSelectedKeys === undefined) setInternalKeys(next);
    onSelectionChange?.(next);
  }

  function toggleAll(checked: boolean) {
    const visible = new Set(visibleKeys);
    changeSelection(checked
      ? [...new Set([...selectedKeys, ...visibleKeys])]
      : selectedKeys.filter((key) => !visible.has(key)));
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: TableRow) {
    if (!onRowClick || (event.target as HTMLElement).closest('button, a, input, select, textarea, [role="checkbox"], .form-checkbox')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  }

  const rangeStart = sortedRows.length ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(currentPage * pageSize, sortedRows.length);
  const sizeOptions = [...new Set([...pageSizeOptions, pageSize])].sort((a, b) => a - b);

  return (
    <section className="table-component">
      {(searchable || actions || (selectable && selectedKeys.length > 0)) && (
        <div className="table-toolbar">
          {searchable && <FormSearch aria-label={searchPlaceholder} placeholder={searchPlaceholder} value={search} onChange={setSearch} />}
          {selectable && selectedKeys.length > 0 ? (
            <div className="table-toolbar__selection" aria-live="polite">
              <span>{selectedKeys.length} selected</span>
              {selectionActions}
              <Button variant="tertiary" size="sm" label="Clear selection" onClick={() => changeSelection([])} />
            </div>
          ) : actions}
        </div>
      )}

      <div className="table-wrapper">
        <table className="table" aria-label={ariaLabel}>
          <thead>
            <tr>
              {selectable && <th className="table-th table-th--select" scope="col" aria-label="Select rows">
                <FormCheckbox type="icon" label="Select all rows on this page" status={allOnPageSelected ? 'active' : partiallySelected ? 'indeterminated' : 'inactive'} onChange={toggleAll} />
              </th>}
              {columns.map((column) => {
                const isSorted = sort?.key === column.key;
                return <th key={column.key} className="table-th" scope="col" aria-sort={isSorted ? sort.direction : undefined} data-align={column.align ?? 'left'} style={column.width ? { width: column.width } : undefined}>
                  {column.sortable ? <button type="button" className="table-sort" onClick={() => changeSort(column.key)}>
                    <span>{column.label}</span>
                    <Icon name={isSorted ? (sort.direction === 'ascending' ? 'arrow-up' : 'arrow-down') : 'arrows-sort'} size={16} data-active={isSorted || undefined} />
                  </button> : column.label}
                </th>;
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: Math.min(pageSize, 5) }, (_, index) => <tr className="table-row" key={`loading-${index}`}>
              {selectable && <td className="table-td table-td--select" />}
              {columns.map((column) => <td className="table-td" key={column.key}><Skeleton height={16} /></td>)}
            </tr>) : pageRows.map(({ row, key, sourceIndex }) => {
              const selected = selectedKeys.includes(key);
              return <tr key={String(key)} className="table-row" data-selected={selected || undefined} data-clickable={onRowClick ? 'true' : undefined} aria-selected={selectable ? selected : undefined} tabIndex={onRowClick ? 0 : undefined} onClick={onRowClick ? (event) => {
                if (!(event.target as HTMLElement).closest('button, a, input, select, textarea, [role="checkbox"], .form-checkbox')) onRowClick(row);
              } : undefined} onKeyDown={(event) => handleRowKeyDown(event, row)}>
                {selectable && <td className="table-td table-td--select"><FormCheckbox type="icon" label={`Select row ${sourceIndex + 1}`} status={selected ? 'active' : 'inactive'} onChange={(checked) => changeSelection(checked ? [...new Set([...selectedKeys, key])] : selectedKeys.filter((item) => item !== key))} /></td>}
                {columns.map((column) => <td key={column.key} className="table-td" data-align={column.align ?? 'left'}>{row[column.key]}</td>)}
              </tr>;
            })}
          </tbody>
        </table>
      </div>

      {!loading && sortedRows.length === 0 && (
        <div className="table-empty">{emptyState ?? <EmptyState title={search ? 'No results' : 'No data'} description={search ? 'Try changing or clearing your search.' : 'There is nothing to show yet.'} actions={search ? <Button variant="secondary" size="sm" label="Clear search" onClick={() => setSearch('')} /> : undefined} />}</div>
      )}

      {loading && <span className="table-sr-only" role="status" aria-live="polite">Loading rows</span>}
      {!loading && sortedRows.length > 0 && <footer className="table-footer">
        <div className="table-footer__details" aria-live="polite">
          <label className="table-page-size-label"><span className="table-sr-only">Rows per page</span>
            <span className="table-page-size"><FormSelect value={String(pageSize)} options={sizeOptions.map((size) => ({ value: String(size), label: String(size) }))} onChange={(value) => setPageSize(Number(value))} /></span>
          </label>
          <span className="table-range">{rangeStart}–{rangeEnd} of {sortedRows.length}</span>
        </div>
        <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} aria-label="Table pages" />
      </footer>}
    </section>
  );
}
