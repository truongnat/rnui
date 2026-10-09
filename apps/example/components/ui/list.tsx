import type { ReactNode } from 'react';
import {
  FlatList,
  View,
  type FlatListProps,
  type ListRenderItem,
  type ViewProps,
} from 'react-native';
import {
  ListItem,
  ListSectionTitle,
  ListSeparator,
} from '@/components/ui/list-item';
import { cn } from '@/lib/utils';

export { ListItem, ListSectionTitle, ListSeparator };
export type { ListItemProps } from '@/components/ui/list-item';

export interface ListProps<T>
  extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  /** When provided with `renderItem`, renders a FlatList. */
  data?: readonly T[];
  renderItem?: ListRenderItem<T>;
  /** String title rendered as a section header above the items. */
  sectionTitle?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * List container.
 *
 * - With `data` + `renderItem`: FlatList (extra props forwarded) with a
 *   default row separator and optional `sectionTitle` header.
 * - With `children` only: plain View grouping `<ListItem>` rows.
 */
export function List<T>({
  data,
  renderItem,
  sectionTitle,
  className,
  ItemSeparatorComponent,
  children,
  ...props
}: ListProps<T>) {
  const header = sectionTitle ? (
    <ListSectionTitle>{sectionTitle}</ListSectionTitle>
  ) : null;

  if (data && renderItem) {
    return (
      <FlatList
        data={data as T[]}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent ?? ListSeparator}
        ListHeaderComponent={header}
        {...props}
      />
    );
  }

  return (
    <View className={cn(className)} {...(props as ViewProps)}>
      {header}
      {children}
    </View>
  );
}
