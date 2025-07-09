import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import React, { useMemo } from 'react';

interface Pagination {
  limit: number;
  offset: number;
}

interface PaginationTableProps extends Pagination {
  total: number;
  onChange: (filter: Pagination) => void;
  visiblePages?: number; // Opcional: cantidad de páginas visibles a la vez
}

export default function PaginationTable({
  limit,
  offset,
  total,
  onChange,
  visiblePages = 5,
}: PaginationTableProps) {
  // Página actual (1-based)
  const currentPage = useMemo(
    () => Math.floor(offset / limit) + 1,
    [offset, limit]
  );
  // Total de páginas
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  // Rango de páginas a mostrar
  const { startPage, endPage } = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);
    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }
    return { startPage: start, endPage: end };
  }, [currentPage, totalPages, visiblePages]);

  // Array de páginas a mostrar
  const pageNumbers = useMemo(
    () =>
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* Botón Anterior */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              onChange({ limit, offset: Math.max(0, offset - limit) })
            }
            // disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Primer página y ellipsis */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => onChange({ limit, offset: 0 })}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Números de página */}
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onChange({ limit, offset: (page - 1) * limit })}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Última página y ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  onChange({ limit, offset: (totalPages - 1) * limit })
                }
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Botón Siguiente */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              onChange({
                limit,
                offset: Math.min((totalPages - 1) * limit, offset + limit),
              })
            }
            // disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
