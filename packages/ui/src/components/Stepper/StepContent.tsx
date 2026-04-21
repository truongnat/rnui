import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StepContentProps } from './types';

/**
 * Expandable content area displayed below a vertical Step's label.
 * Visible only when the step is active (the parent Step handles rendering logic).
 */
export function StepContent({ children }: StepContentProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
