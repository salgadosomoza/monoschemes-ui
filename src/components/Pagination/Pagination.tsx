import { useState } from 'react';
import { Button } from '../Button';
import { ButtonText } from '../ButtonText';
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
    <div className="pagination">
      {showPrevNext && (
        <Button
          variant="secondary"
          iconPosition="left"
          iconName="chevron_left"
          label="Prev"
          disabled={current === 1}
          onClick={() => goTo(current - 1)}
        />
      )}
      <div className="pagination-pages">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page =>
          page === current ? (
            <Button key={page} variant="secondary" label={String(page)} onClick={() => goTo(page)} />
          ) : (
            <ButtonText key={page} state="default" label={String(page)} onClick={() => goTo(page)} />
          )
        )}
      </div>
      {showPrevNext && (
        <Button
          variant="secondary"
          iconPosition="right"
          iconName="chevron_right"
          label="Next"
          disabled={current === totalPages}
          onClick={() => goTo(current + 1)}
        />
      )}
    </div>
  );
}
