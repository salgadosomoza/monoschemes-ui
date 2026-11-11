import { Button } from '../Button';
import './Pagination.css';

export type PaginationItemState = 'default' | 'current' | 'ellipsis';

export interface PaginationItemProps {
  label?: string;
  state?: PaginationItemState;
  onClick?: () => void;
}

export function PaginationItem({ label = '1', state = 'default', onClick }: PaginationItemProps) {
  if (state === 'ellipsis') {
    return <span className="pagination-item pagination-item--ellipsis" aria-label="More pages">…</span>;
  }

  return (
    <button
      className="pagination-item"
      type="button"
      data-state={state}
      aria-current={state === 'current' ? 'page' : undefined}
      aria-label={state === 'current' ? 'Page ' + label + ', current page' : 'Go to page ' + label}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showPrev?: boolean;
  showNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

function pageRange(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

function getPageItems(page: number, pageCount: number, siblingCount: number): Array<number | 'ellipsis-left' | 'ellipsis-right'> {
  const totalNumbersToShow = siblingCount * 2 + 5;
  if (pageCount <= totalNumbersToShow) return pageRange(1, pageCount);

  const firstSibling = Math.max(page - siblingCount, 1);
  const lastSibling = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = firstSibling > 2;
  const showRightEllipsis = lastSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const visibleEnd = Math.min(3 + siblingCount * 2, pageCount - 1);
    return [...pageRange(1, visibleEnd), 'ellipsis-right', pageCount];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const visibleStart = Math.max(pageCount - (2 + siblingCount * 2), 2);
    return [1, 'ellipsis-left', ...pageRange(visibleStart, pageCount)];
  }
  return [1, 'ellipsis-left', ...pageRange(firstSibling, lastSibling), 'ellipsis-right', pageCount];
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showPrev = true,
  showNext = true,
  prevLabel = 'Prev',
  nextLabel = 'Next',
}: PaginationProps) {
  const safePageCount = Math.max(1, Math.floor(pageCount));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), safePageCount);
  const safeSiblingCount = Math.max(0, Math.floor(siblingCount));
  const items = getPageItems(currentPage, safePageCount, safeSiblingCount);

  return (
    <nav className="pagination" aria-label="Pagination">
      {showPrev ? (
        <Button
          variant="secondary"
          size="md"
          iconLeft="chevron-left"
          label={prevLabel}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
      ) : <span className="pagination__spacer" aria-hidden="true" />}
      <div className="pagination-pages" aria-label="Pages">
        {items.map((item, index) => item === 'ellipsis-left' || item === 'ellipsis-right'
          ? <PaginationItem key={item} state="ellipsis" />
          : (
            <PaginationItem
              key={String(item) + '-' + index}
              label={String(item)}
              state={item === currentPage ? 'current' : 'default'}
              onClick={() => onPageChange(item)}
            />
          ))}
      </div>
      {showNext ? (
        <Button
          variant="secondary"
          size="md"
          iconRight="chevron-right"
          label={nextLabel}
          disabled={currentPage === safePageCount}
          onClick={() => onPageChange(currentPage + 1)}
        />
      ) : <span className="pagination__spacer" aria-hidden="true" />}
    </nav>
  );
}
