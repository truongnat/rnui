import { Children, isValidElement, type ReactNode, useMemo } from 'react';
import { Text, View } from 'react-native';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemInternalProps } from './types';

type EllipsisStyle = {
  color: string;
  fontSize?: number;
  lineHeight?: number;
};

type Options = {
  maxItems: number;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
  ellipsisStyle: EllipsisStyle;
  ellipsisContainerStyle: { justifyContent: 'center'; alignItems: 'center' };
};

function isBreadcrumbItemElement(
  child: ReactNode
): child is React.ReactElement<BreadcrumbItemInternalProps> {
  return (
    isValidElement(child) &&
    (child.type === BreadcrumbItem ||
      (typeof child.type === 'function' &&
        'displayName' in child.type &&
        child.type.displayName === 'BreadcrumbItem'))
  );
}

/**
 * Collapses the middle segment with "..." when there are more than `maxItems` children.
 */
export function useBreadcrumbsDisplayItems(
  children: ReactNode | undefined,
  {
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    ellipsisStyle,
    ellipsisContainerStyle,
  }: Options
): ReactNode[] {
  return useMemo(() => {
    const items = Children.toArray(children);
    if (items.length <= maxItems) {
      return items;
    }
    return [
      ...items.slice(0, itemsBeforeCollapse),
      <View key="breadcrumbs-ellipsis" style={ellipsisContainerStyle}>
        <Text style={ellipsisStyle}>...</Text>
      </View>,
      ...items.slice(items.length - itemsAfterCollapse),
    ];
  }, [
    children,
    ellipsisContainerStyle,
    ellipsisStyle,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
  ]);
}

export { isBreadcrumbItemElement };
