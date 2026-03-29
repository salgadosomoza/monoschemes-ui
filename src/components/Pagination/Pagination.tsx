import { useState } from 'react';
import { Button } from '../Button';
import { ButtonText } from '../ButtonText';
import { ButtonWithIcon } from '../ButtonWithIcon';
import '../../styles/icons.css';
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
        <ButtonWithIcon
          variant="secondary"
          iconPosition="left"
          icon={<span className="material-symbols-outlined">chevron_left</span>}
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
        <ButtonWithIcon
          variant="secondary"
          iconPosition="right"
          icon={<span className="material-symbols-outlined">chevron_right</span>}
          label="Next"
          disabled={current === totalPages}
          onClick={() => goTo(current + 1)}
        />
      )}
    </div>
  );
}
