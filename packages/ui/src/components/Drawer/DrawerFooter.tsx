import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { DrawerFooterProps } from './types';

/**
 * Optional layout helper that renders an action area at the bottom of the drawer.
 */
export function DrawerFooter({ children }: DrawerFooterProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
