import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { TableSortLabelProps } from './types';

/**
 * Sort indicator for column headers. Shows active state and direction arrow.
 */
export function TableSortLabel({
  active = false,
  direction = 'asc',
  onClick,
  children,
}: TableSortLabelProps) {
  const { tokens } = useTheme();

  const labelStyle = useMemo(
    () => ({
      color: tokens.color.text.primary,
      fontWeight: active
        ? tokens.fontWeight.semibold
        : tokens.fontWeight.regular,
    }),
    [active, tokens]
  );

  return (
    <Pressable onPress={onClick} style={styles.container}>
      <Text style={labelStyle}>{children}</Text>
      {active ? (
        <Icon size={14} color={tokens.color.text.primary}>
          {direction === 'asc' ? 'arrowUp' : 'arrowDown'}
        </Icon>
      ) : (
        <View style={styles.placeholder} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  placeholder: {
    width: 14,
  },
});
