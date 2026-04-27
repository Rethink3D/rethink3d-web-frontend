import React from "react";
import type { PaginationMeta } from "../../types/dtos";
import styles from "./Pagination.module.css";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
  className,
}) => {
  const { page, totalPages, total, limit } = meta;

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) pages.push(1, "...");
    else pages.push(1);

    pages.push(...range);

    if (page + delta < totalPages - 1) pages.push("...", totalPages);
    else if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className={`${styles.pagination} ${className || ""}`}>
      <span className={styles.info}>
        {from}–{to} de {total}
      </span>

      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
              onClick={() => onPageChange(p as number)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          className={styles.navBtn}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </div>
  );
};
