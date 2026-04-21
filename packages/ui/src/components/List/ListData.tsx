import { useId } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { List } from './List';
import type { ListDataProps } from './types';

/**
 * Convenience wrapper that renders a List backed by FlatList (or FlashList when
 * @shopify/flash-list is available in the host project).
 */
export function ListData<T>({
  id: idProp,
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}: ListDataProps<T>) {
  const id = useId(idProp, 'list-data');

  const ListImpl: React.ComponentType<any> = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@shopify/flash-list') as {
        FlashList?: React.ComponentType<any>;
      };
      return mod?.FlashList ?? FlatList;
    } catch {
      return FlatList;
    }
  }, []);

  return (
    <List id={id} {...listProps}>
      <ListImpl
        data={data}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        {...listProps}
        keyExtractor={keyExtractor}
      />
    </List>
  );
}
