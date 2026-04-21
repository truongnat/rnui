import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { TableContainerProps } from './types';

/**
 * Horizontally scrollable wrapper for Table.
 * Applies theme-driven container styles and ensures the table fills available width.
 */
export function TableContainer({ children, style }: TableContainerProps) {
  const {
    components: { table },
  } = useTheme();

  return (
    <ScrollView horizontal style={[table.container, style]}>
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inner: {
    minWidth: '100%' as any,
  },
});
