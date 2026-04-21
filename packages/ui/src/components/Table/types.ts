import type React from 'react';

/**
 * Available table size variants
 */
export type TableSize = 'small' | 'medium';

/**
 * Available table cell padding options
 */
export type TablePadding = 'normal' | 'checkbox' | 'none';

/**
 * Internal table context value
 */
export interface TableContextValue {
  size: TableSize;
  padding: TablePadding;
  stickyHeader: boolean;
}

/**
 * Sort context shared with TableSortLabel
 */
export interface TableSortContextValue {
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

/**
 * Props for the Table component
 */
export interface TableProps {
  children?: React.ReactNode;
  size?: TableSize;
  padding?: TablePadding;
  stickyHeader?: boolean;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  style?: object;
}

export interface TableContainerProps {
  children?: React.ReactNode;
  style?: object;
}

export interface TableHeadProps {
  children?: React.ReactNode;
}

export interface TableBodyProps {
  children?: React.ReactNode;
}

export interface TableFooterProps {
  children?: React.ReactNode;
}

export interface TableRowProps {
  children?: React.ReactNode;
  selected?: boolean;
  style?: object;
}

export interface TableCellProps {
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  padding?: TablePadding;
  size?: TableSize;
  variant?: 'head' | 'body' | 'footer';
  style?: object;
}

export interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  labelRowsPerPage?: string;
}

export interface TableSortLabelProps {
  active?: boolean;
  direction?: 'asc' | 'desc';
  onClick?: () => void;
  children?: React.ReactNode;
}
