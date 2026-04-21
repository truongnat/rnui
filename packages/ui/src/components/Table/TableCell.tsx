import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTableContext } from './context';
import type { TableCellProps } from './types';

/**
 * A single table cell (header or data). Resolves padding and size from nearest
 * TableContext, with per-cell overrides supported.
 */
export function TableCell({
  children,
  align = 'left',
  padding,
  size,
  variant = 'body',
  style,
}: TableCellProps) {
  const {
    components: { table },
    tokens,
  } = useTheme();

  const ctx = useTableContext();
  const resolvedPadding = padding ?? ctx?.padding ?? 'normal';
  const resolvedSize = size ?? ctx?.size ?? 'medium';

  const cellContainerStyle = useMemo(() => {
    const paddingX = {
      normal: tokens.spacing[4],
      checkbox: tokens.spacing[2],
      none: 0,
    }[resolvedPadding];

    const paddingY =
      resolvedSize === 'small' ? tokens.spacing[2] : tokens.spacing[3];

    return [
      {
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
        flexShrink: 0 as const,
      },
      style,
    ];
  }, [resolvedPadding, resolvedSize, tokens, style]);

  const textStyle = useMemo(
    () => [
      table.cell,
      { textAlign: align },
      variant === 'head'
        ? { fontWeight: tokens.fontWeight.semibold }
        : null,
      resolvedSize === 'small'
        ? { fontSize: tokens.fontSize.sm }
        : null,
    ],
    [table.cell, align, variant, resolvedSize, tokens]
  );

  return (
    <View style={cellContainerStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
