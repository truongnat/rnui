import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { AppBarLeadingProps } from './types';

export function AppBarLeading({ children, style }: AppBarLeadingProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
