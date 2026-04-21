import { createContext, useContext } from 'react';
import type { TableContextValue, TableSortContextValue } from './types';

/**
 * Context providing table-level configuration (size, padding, stickyHeader)
 * to all descendant cell and row components.
 */
export const TableContext = createContext<TableContextValue | null>(null);

export function useTableContext(): TableContextValue | null {
  return useContext(TableContext);
}

/**
 * Context providing sort state (sortColumn, sortDirection, onSort)
 * to TableSortLabel components within the table header.
 */
export const TableSortContext = createContext<TableSortContextValue | null>(null);

export function useTableSortContext(): TableSortContextValue | null {
  return useContext(TableSortContext);
}
