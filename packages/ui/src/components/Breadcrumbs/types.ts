import type { ReactNode } from 'react';

export interface BreadcrumbsProps {
  children?: ReactNode;
  separator?: ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

export interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  onPress?: () => void;
  /** Marks the current page. If omitted on all items, the last item is treated as current. */
  isCurrent?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
}

/** @internal Injected by Breadcrumbs when composing the trail. */
export interface BreadcrumbItemInternalProps extends BreadcrumbItemProps {
  showSeparator?: boolean;
}
