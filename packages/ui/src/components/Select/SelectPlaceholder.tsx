import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SkeletonListItem } from '../Skeleton';
import type { SelectPlaceholderProps } from './types';

export function SelectPlaceholder({
  loading,
  query,
  optionCount,
}: SelectPlaceholderProps) {
  const { tokens } = useTheme();

  const emptyTextStyle = useMemo(
    () => ({
      color: tokens.color.text.tertiary,
      fontSize: tokens.fontSize.sm,
      textAlign: 'center' as const,
      paddingVertical: tokens.spacing[6],
    }),
    [tokens.color.text.tertiary, tokens.fontSize.sm, tokens.spacing]
  );

  const skeletonWrapperStyle = useMemo(
    () => ({ paddingVertical: tokens.spacing[2] }),
    [tokens.spacing]
  );

  if (loading && optionCount === 0) {
    return (
      <View style={skeletonWrapperStyle}>
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </View>
    );
  }

  const message = loading
    ? 'Loading\u2026'
    : query
      ? `No results for \u201c${query}\u201d`
      : 'No options';

  return <Text style={emptyTextStyle}>{message}</Text>;
}
