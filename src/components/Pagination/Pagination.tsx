import { useState } from 'react';
import { Button } from '../Button';
import './Pagination.css';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPrevNext?: boolean;
}

export function Pagination({
  currentPage: controlledPage,
  totalPages = 5,
  onPageChange,
  showPrevNext = true,
}: PaginationProps) {
  const isControlled = controlledPage !== undefined;
  const [internalPage, setInternalPage] = useState(1);
  const current = isControlled ? controlledPage : internalPage;

  function goTo(page: number) {
    if (page < 1 || page > totalPages) return;
    if (!isControlled) setInternalPage(page);
    onPageChange?.(page);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      {showPrevNext && (
        <Button
          variant="secondary"
          iconLeft="chevron-left"
          label="Prev"
          disabled={current === 1}
          onClick={() => goTo(current - 1)}
        />
      )}
      <div className="pagination-pages" role="group" aria-label="Page numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            variant={page === current ? 'secondary' : 'link'}
            aria-current={page === current ? 'page' : undefined}
            className="pagination-page"
            label={String(page)}
            onClick={() => goTo(page)}
          />
        ))}
      </div>
      {showPrevNext && (
        <Button
          variant="secondary"
          iconRight="chevron-right"
          label="Next"
          disabled={current === totalPages}
          onClick={() => goTo(current + 1)}
        />
      )}
    </nav>
  );
}
