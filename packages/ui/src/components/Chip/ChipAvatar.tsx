import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ChipAvatarProps } from './types';

const AVATAR_SIZE: Record<string, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

/**
 * Small avatar slot rendered on the left side of the Chip.
 */
export function ChipAvatar({ children, size, spacing }: ChipAvatarProps) {
  const dimension = AVATAR_SIZE[size] ?? AVATAR_SIZE.md;

  return (
    <View
      style={[
        styles.avatar,
        { width: dimension, height: dimension, marginRight: spacing },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
