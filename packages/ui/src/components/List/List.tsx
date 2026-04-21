import { useId, useTheme } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import { ListContext } from './context';
import { ListSubheader } from './ListSubheader';
import type { ListProps } from './types';

/**
 * Root list container. Provides dense/disablePadding context to children and
 * optionally renders a subheader above the list items.
 */
export function List({
  id: idProp,
  children,
  dense = false,
  disablePadding = false,
  subheader,
  style,
}: ListProps) {
  const id = useId(idProp, 'list');
  const {
    components: { list },
  } = useTheme();

  return (
    <ListContext.Provider value={{ dense, disablePadding }}>
      <View nativeID={id} style={[list.container, style]}>
        {subheader != null && (
          typeof subheader === 'string'
            ? <ListSubheader>{subheader}</ListSubheader>
            : <View style={list.subheader}>{subheader}</View>
        )}
        {children}
      </View>
    </ListContext.Provider>
  );
}
