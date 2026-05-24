import { useId, useTheme } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import { ListContext } from './context';
import { ListSubheader } from './ListSubheader';
import type { ListProps } from './types';

/** JSX whitespace between items becomes text nodes and crashes RN if rendered in a View. */
function filterWhitespaceChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).filter((child) => {
    if (typeof child === 'string') {
      return child.trim().length > 0;
    }
    return true;
  });
}

/**
 * Root list container. Provides dense/disablePadding context to children and
 * optionally renders a subheader above the list items.
 */
export function List({
  id: idProp,
  children,
  dense = false,
  disablePadding = false,
  variant = 'plain',
  subheader,
  style,
}: ListProps) {
  const id = useId(idProp, 'list');
  const {
    components: { list },
  } = useTheme();

  const items = filterWhitespaceChildren(children);

  return (
    <ListContext.Provider value={{ dense, disablePadding }}>
      <View
        nativeID={id}
        style={[list.container, variant === 'inset' && list.inset, style]}
      >
        {subheader != null &&
          (typeof subheader === 'string' ? (
            <ListSubheader>{subheader}</ListSubheader>
          ) : (
            <View style={list.subheader}>{subheader}</View>
          ))}
        {items}
      </View>
    </ListContext.Provider>
  );
}
