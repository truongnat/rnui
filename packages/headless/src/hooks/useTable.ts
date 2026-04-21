import { useCallback, useMemo, useState } from 'react';

export type TableRowId = string | number;

export interface UseTableOptions<T, Id extends TableRowId = TableRowId> {
  data: T[];
  rowsPerPage?: number;
  initialPage?: number;
  initialSort?: { key: keyof T; direction: 'asc' | 'desc' } | null;
}

export interface UseTableReturn<T, Id extends TableRowId = TableRowId> {
  // State
  page: number;
  rowsPerPage: number;
  sort: { key: keyof T; direction: 'asc' | 'desc' } | null;
  selected: Set<Id>;

  // Computed
  processedData: T[];
  paginatedData: T[];
  totalPages: number;

  // Handlers
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  handleSort: (key: keyof T) => void;
  toggleSelect: (id: Id) => void;
  toggleSelectAll: (ids: Id[]) => void;
  isSelected: (id: Id) => boolean;
}

export function useTable<T, Id extends TableRowId = TableRowId>({
  data,
  rowsPerPage: initialRowsPerPage = 10,
  initialPage = 0,
  initialSort,
}: UseTableOptions<T, Id>): UseTableReturn<T, Id> {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPageRaw] = useState(
    Math.max(1, initialRowsPerPage)
  );
  const setRowsPerPage = useCallback(
    (n: number) => setRowsPerPageRaw(Math.max(1, n)),
    []
  );
  const [sort, setSort] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(initialSort ?? null);
  const [selected, setSelected] = useState<Set<Id>>(new Set());

  // 1. Processing (Sort)
  const processedData = useMemo(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  // 2. Pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return processedData.slice(start, start + rowsPerPage);
  }, [processedData, page, rowsPerPage]);

  // 3. Handlers
  const handleSort = useCallback((key: keyof T) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const toggleSelect = useCallback((id: Id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((ids: Id[]) => {
    setSelected((prev) => {
      if (prev.size === ids.length) return new Set<Id>();
      return new Set(ids);
    });
  }, []);

  const isSelected = useCallback((id: Id) => selected.has(id), [selected]);

  return {
    page,
    rowsPerPage,
    sort,
    selected,
    processedData,
    paginatedData,
    totalPages,
    setPage,
    setRowsPerPage,
    handleSort,
    toggleSelect,
    toggleSelectAll,
    isSelected,
  };
}
