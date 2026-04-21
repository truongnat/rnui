import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ListItemTrailingProps } from './types';

/**
 * Right-side slot for an action, icon, or value within a ListItem.
 */
export function ListItemTrailing({ id: idProp, children }: ListItemTrailingProps) {
  const id = useId(idProp, 'list-item-trailing');
  const { tokens } = useTheme();

  const containerStyle = useMemo(
    () => ({ marginLeft: tokens.spacing[2] }),
    [tokens]
  );

  return (
    <View nativeID={id} style={[styles.container, containerStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
