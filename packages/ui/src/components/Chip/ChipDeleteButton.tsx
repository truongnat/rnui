import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { ChipDeleteButtonProps } from './types';

/**
 * Delete (X) button rendered on the right side of the Chip.
 */
export function ChipDeleteButton({
  deleteIcon,
  onDelete,
  textColor,
  spacing,
  radius,
}: ChipDeleteButtonProps) {
  return (
    <Pressable
      onPress={onDelete}
      hitSlop={8}
      style={[styles.button, { marginLeft: spacing, borderRadius: radius }]}
      accessibilityRole="button"
      accessibilityLabel="Remove"
    >
      {deleteIcon ?? (
        <Text style={[styles.defaultIcon, { color: textColor }]}>×</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    minWidth: 28,
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.7,
  },
});
