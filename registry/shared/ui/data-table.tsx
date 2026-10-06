import { useMemo, useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react-native';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface DataTableColumn<T> {
  key: keyof T & string;
  header: string;
  /** Custom cell renderer — defaults to String(row[key]). */
  render?: (row: T) => React.ReactNode;
  /** Enable header tap-to-sort. */
  sortable?: boolean;
  /** Flex weight for the column. */
  flex?: number;
  align?: 'left' | 'right';
}

export interface DataTableProps<T> extends ViewProps {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Row key extractor. */
  rowKey: (row: T) => string;
  onRowPress?: (row: T) => void;
  emptyText?: string;
  className?: string;
}

type SortDir = 'asc' | 'desc';

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowPress,
  emptyText = 'No data',
  className,
  ...props
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const iconColor = useIconColor();

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number')
        return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir('asc');
    }
  };

  return (
    <View className={cn('w-full', className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} flex={col.flex}>
                {col.sortable ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => toggleSort(col.key)}
                    className="flex-row items-center gap-1"
                  >
                    <Text className="text-xs font-medium text-muted-foreground">
                      {col.header}
                    </Text>
                    {sortKey === col.key ? (
                      sortDir === 'asc' ? (
                        <ArrowUp size={12} color={iconColor} />
                      ) : (
                        <ArrowDown size={12} color={iconColor} />
                      )
                    ) : (
                      <ArrowUpDown size={12} color={iconColor} />
                    )}
                  </Pressable>
                ) : (
                  <Text className="text-xs font-medium text-muted-foreground">
                    {col.header}
                  </Text>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell>
                <Text className="py-4 text-center text-sm text-muted-foreground">
                  {emptyText}
                </Text>
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((row) => (
              <TableRow
                key={rowKey(row)}
                onPress={onRowPress ? () => onRowPress(row) : undefined}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} flex={col.flex}>
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <Text
                        className={cn(
                          'text-sm text-foreground',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {String(row[col.key] ?? '')}
                      </Text>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </View>
  );
}
