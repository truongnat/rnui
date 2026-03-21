import { useState, useCallback, useMemo } from "react";

export interface UseTableOptions<T> {
  data: T[];
  rowsPerPage?: number;
  initialPage?: number;
  initialSort?: { key: keyof T; direction: "asc" | "desc" };
}

export interface UseTableReturn<T> {
  // State
  page: number;
  rowsPerPage: number;
  sort: { key: keyof T; direction: "asc" | "desc" } | null;
  selected: Set<any>;
  
  // Computed
  processedData: T[];
  paginatedData: T[];
  totalPages: number;
  
  // Handlers
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  handleSort: (key: keyof T) => void;
  toggleSelect: (id: any) => void;
  toggleSelectAll: (ids: any[]) => void;
  isSelected: (id: any) => boolean;
}

export function useTable<T>({
  data,
  rowsPerPage: initialRowsPerPage = 10,
  initialPage = 0,
  initialSort = null as any,
}: UseTableOptions<T>): UseTableReturn<T> {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sort, setSort] = useState(initialSort);
  const [selected, setSelected] = useState<Set<any>>(new Set());

  // 1. Processing (Sort)
  const processedData = useMemo(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
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
    setSort((prev: any) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const toggleSelect = useCallback((id: any) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((ids: any[]) => {
    setSelected((prev) => {
      if (prev.size === ids.length) return new Set();
      return new Set(ids);
    });
  }, []);

  const isSelected = useCallback((id: any) => selected.has(id), [selected]);

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
