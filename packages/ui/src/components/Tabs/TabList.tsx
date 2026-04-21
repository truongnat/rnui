import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTabsContext } from './context';
import type { TabListProps } from './types';

/**
 * Container for Tab buttons.
 * Renders as a horizontal ScrollView when variant is "scrollable",
 * otherwise as a plain View that respects centered / fullWidth layout.
 */
export function TabList({ children }: TabListProps) {
  const ctx = useTabsContext();
  if (!ctx) return null;

  if (ctx.variant === 'scrollable') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        accessibilityRole="tablist"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.row,
        ctx.centered ? styles.justifyCenter : styles.justifyStart,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
