import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ListItemLeadingProps } from './types';

/**
 * Left-side slot for an avatar or icon within a ListItem.
 * Provides fixed minimum width and right spacing so content is always aligned.
 */
export function ListItemLeading({ id: idProp, children }: ListItemLeadingProps) {
  const id = useId(idProp, 'list-item-leading');
  const { tokens } = useTheme();

  const containerStyle = useMemo(
    () => ({ marginRight: tokens.spacing[4] }),
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
    minWidth: 24,
    alignItems: 'center',
  },
});

/**
 * @deprecated Use ListItemLeading instead
 */
export { ListItemLeading as ListItemIcon };
