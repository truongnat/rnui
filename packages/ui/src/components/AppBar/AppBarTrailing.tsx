import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { AppBarTrailingProps } from './types';

export function AppBarTrailing({ children, style }: AppBarTrailingProps) {
  const { tokens } = useTheme();

  const rowStyle = useMemo(
    () => ({ gap: tokens.spacing[1] }),
    [tokens],
  );

  return (
    <View style={[styles.container, rowStyle, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
