import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { DrawerHeaderProps } from './types';

/**
 * Optional layout helper that renders a title + trailing slot (e.g. close button)
 * at the top of the drawer. Can also accept arbitrary children instead.
 */
export function DrawerHeader({ title, trailing, children }: DrawerHeaderProps) {
  if (children) {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>{title}</View>
      {trailing != null && <View>{trailing}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    flex: 1,
  },
});
