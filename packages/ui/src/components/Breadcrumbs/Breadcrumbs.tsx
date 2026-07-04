import { useTheme } from '@truongdq01/headless';
import {
  cloneElement,
  isValidElement,
  memo,
  useMemo,
  type ReactNode,
} from 'react';
import { View } from 'react-native';
import { BreadcrumbContext } from './BreadcrumbContext';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import type { BreadcrumbsProps } from './types';
import {
  isBreadcrumbItemElement,
  useBreadcrumbsDisplayItems,
} from './useBreadcrumbsDisplayItems';

function breadcrumbRowKey(child: ReactNode, idx: number): string {
  if (isValidElement(child) && child.key != null && child.key !== '') {
    return String(child.key);
  }
  return `breadcrumb-row-${idx}`;
}

function hasExplicitCurrentItem(items: ReactNode[]): boolean {
  return items.some(
    (child) =>
      isBreadcrumbItemElement(child) && child.props.isCurrent === true
  );
}

function BreadcrumbsInner({
  children,
  separator = '/',
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
}: BreadcrumbsProps) {
  const {
    components: { breadcrumbs },
  } = useTheme();

  const contextValue = useMemo(() => ({ separator }), [separator]);

  const displayItems = useBreadcrumbsDisplayItems(children, {
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    ellipsisStyle: breadcrumbs.separator.text,
    ellipsisContainerStyle: breadcrumbs.separator.container,
  });

  const explicitCurrent = hasExplicitCurrentItem(displayItems);
  const lastIndex = displayItems.length - 1;

  const trail = displayItems.map((child, idx) => {
    const showSeparator = idx > 0;
    const isCurrent = !explicitCurrent && idx === lastIndex;
    const key = breadcrumbRowKey(child, idx);

    if (isBreadcrumbItemElement(child)) {
      return cloneElement(child, {
        key,
        showSeparator,
        isCurrent: child.props.isCurrent ?? isCurrent,
      });
    }

    return (
      <View key={key} style={breadcrumbs.item.row}>
        {showSeparator ? <BreadcrumbSeparator separator={separator} /> : null}
        <View style={breadcrumbs.item.content}>{child}</View>
      </View>
    );
  });

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <View style={breadcrumbs.container} accessibilityRole="none">
        {trail}
      </View>
    </BreadcrumbContext.Provider>
  );
}

export const Breadcrumbs = memo(BreadcrumbsInner);
Breadcrumbs.displayName = 'Breadcrumbs';
