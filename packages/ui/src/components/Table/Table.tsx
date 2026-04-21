import type React from 'react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { TableContext, TableSortContext } from './context';
import type { TableProps } from './types';

/**
 * Root table component that provides context for child table elements.
 * Implements Material Design table patterns with accessibility support.
 *
 * @example
 * ```tsx
 * <Table size="medium" padding="normal">
 *   <TableHead>
 *     <TableRow>
 *       <TableCell>Name</TableCell>
 *       <TableCell>Email</TableCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     {data.map(row => (
 *       <TableRow key={row.id}>
 *         <TableCell>{row.name}</TableCell>
 *         <TableCell>{row.email}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 */
export function Table({
  children,
  size = 'medium',
  padding = 'normal',
  stickyHeader = false,
  sortColumn,
  sortDirection,
  onSort,
  style,
}: TableProps) {
  const tableCtx = useMemo(
    () => ({ size, padding, stickyHeader }),
    [size, padding, stickyHeader]
  );

  const sortCtx = useMemo(
    () => ({ sortColumn, sortDirection, onSort }),
    [sortColumn, sortDirection, onSort]
  );

  return (
    <TableContext.Provider value={tableCtx}>
      <TableSortContext.Provider value={sortCtx}>
        <View style={style}>{children}</View>
      </TableSortContext.Provider>
    </TableContext.Provider>
  );
}
