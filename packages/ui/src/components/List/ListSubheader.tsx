import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import type { ListSubheaderProps } from './types';

/**
 * Section header label displayed above a group of list items.
 */
export function ListSubheader({ id: idProp, children }: ListSubheaderProps) {
  const id = useId(idProp, 'list-subheader');
  const {
    components: { list },
    tokens,
  } = useTheme();

  const labelStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.sm,
      fontWeight: '600' as const,
      color: tokens.color.text.tertiary,
    }),
    [tokens]
  );

  return (
    <View nativeID={id} style={list.subheader}>
      <Text style={labelStyle}>{children}</Text>
    </View>
  );
}
