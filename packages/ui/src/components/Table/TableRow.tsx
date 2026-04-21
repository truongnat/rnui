import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { TableRowProps } from './types';

/**
 * A single table row. Applies selected highlight colour from brand tokens.
 */
export function TableRow({ children, selected = false, style }: TableRowProps) {
  const {
    components: { table },
    tokens,
  } = useTheme();

  const rowStyle = useMemo(
    () => [
      table.row,
      selected ? { backgroundColor: tokens.color.brand.subtle } : null,
      style,
    ],
    [table.row, selected, tokens.color.brand.subtle, style]
  );

  return <View style={rowStyle}>{children}</View>;
}
