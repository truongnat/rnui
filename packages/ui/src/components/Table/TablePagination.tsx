import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import type { TablePaginationProps } from './types';

/**
 * Pagination toolbar rendered below a table, providing previous/next navigation
 * and a rows-per-page label.
 */
export function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  labelRowsPerPage = 'Rows per page',
}: TablePaginationProps) {
  const { tokens } = useTheme();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));

  const dynamicStyles = useMemo(
    () => ({
      container: {
        padding: tokens.spacing[3],
      },
      nav: {
        gap: tokens.spacing[2],
      },
      label: {
        color: tokens.color.text.secondary,
        fontSize: tokens.fontSize.sm,
      },
    }),
    [tokens]
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={dynamicStyles.label}>
        {labelRowsPerPage}: {rowsPerPage}
      </Text>
      <View style={[styles.nav, dynamicStyles.nav]}>
        <Text style={dynamicStyles.label}>
          Page {page + 1} of {totalPages}
        </Text>
        <Button
          size="sm"
          variant="outlined"
          disabled={page <= 0}
          onPress={() => onPageChange?.(Math.max(0, page - 1))}
          startIcon={<Icon size={16} name="chevronLeft" />}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outlined"
          disabled={page >= totalPages - 1}
          onPress={() => onPageChange?.(Math.min(totalPages - 1, page + 1))}
          endIcon={<Icon size={16} name="chevronRight" />}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
