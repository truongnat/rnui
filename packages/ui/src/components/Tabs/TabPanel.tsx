import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTabsContext } from './context';
import type { TabPanelProps } from './types';

/**
 * Content panel associated with a specific tab value.
 * Renders its children only when the parent Tabs has that value selected.
 */
export function TabPanel<T = string>({ value, children }: TabPanelProps<T>) {
  const ctx = useTabsContext<T>();
  if (!ctx) return null;
  if (!ctx.isSelected(value)) return null;

  return (
    <View
      accessibilityRole="none"
      style={styles.panel}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
  },
});
