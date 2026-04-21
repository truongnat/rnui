import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ListDividerProps } from './types';

/**
 * Thin horizontal separator between list items.
 * The `inset` prop adds left padding to align with item content.
 */
export function ListDivider({ inset = false }: ListDividerProps) {
  const { tokens } = useTheme();

  const dividerStyle = useMemo(
    () => ({
      borderBottomColor: tokens.color.border.subtle,
      marginLeft: inset ? tokens.spacing[10] : 0,
    }),
    [tokens, inset]
  );

  return <View style={[styles.divider, dividerStyle]} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
