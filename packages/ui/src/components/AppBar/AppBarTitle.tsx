import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';
import type { AppBarTitleProps } from './types';

export function AppBarTitle({ children, subtitle, style }: AppBarTitleProps) {
  const { tokens } = useTheme();

  const subtitleStyle = useMemo(
    () => ({ color: tokens.color.text.secondary }),
    [tokens],
  );

  return (
    <View style={[styles.container, style]}>
      {typeof children === 'string' ? (
        <Typography variant="h6" numberOfLines={1}>
          {children}
        </Typography>
      ) : (
        children
      )}
      {subtitle ? (
        <Typography variant="caption" numberOfLines={1} style={subtitleStyle}>
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
