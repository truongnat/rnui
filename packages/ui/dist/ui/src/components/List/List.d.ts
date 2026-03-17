import React from "react";
import { type FlashListProps } from "@shopify/flash-list";
import type { SwipeAction } from "@rnui/headless";
export interface ListItemProps {
    title: string;
    subtitle?: string;
    /** Leading element — avatar, icon, etc. */
    leading?: React.ReactNode;
    /** Trailing element — badge, chevron, value */
    trailing?: React.ReactNode;
    onPress?: () => void;
    onLongPress?: () => void;
    trailingActions?: SwipeAction[];
    leadingActions?: SwipeAction[];
    disabled?: boolean;
    /** Show bottom separator */
    showSeparator?: boolean;
}
export declare function ListItem({ title, subtitle, leading, trailing, onPress, onLongPress, trailingActions, leadingActions, disabled, showSeparator, }: ListItemProps): React.JSX.Element;
export interface SectionHeaderProps {
    title: string;
    trailing?: React.ReactNode;
}
export declare function SectionHeader({ title, trailing }: SectionHeaderProps): React.JSX.Element;
export interface ListProps<T> extends Omit<FlashListProps<T>, "renderItem" | "estimatedItemSize"> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactElement;
    estimatedItemSize?: number;
    /** Show divider between items */
    separator?: boolean;
    /** Empty state element */
    emptyComponent?: React.ReactElement;
    /** Loading skeleton count */
    loadingCount?: number;
    isLoading?: boolean;
}
export declare function List<T>({ data, renderItem, estimatedItemSize, separator, emptyComponent, isLoading, loadingCount, ...rest }: ListProps<T>): React.JSX.Element;
//# sourceMappingURL=List.d.ts.map