import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { type ListRenderItem } from "@shopify/flash-list";
export interface ListProps {
    children?: React.ReactNode;
    dense?: boolean;
    disablePadding?: boolean;
    subheader?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export declare function List({ children, dense, disablePadding, subheader, style }: ListProps): React.JSX.Element;
export interface ListItemProps {
    children?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    selected?: boolean;
    divider?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare function ListItem({ children, secondaryAction, onPress, disabled, selected, divider, style, }: ListItemProps): React.JSX.Element;
export interface ListItemTextProps {
    primary: React.ReactNode;
    secondary?: React.ReactNode;
}
export declare function ListItemText({ primary, secondary }: ListItemTextProps): React.JSX.Element;
export declare function ListItemIcon({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export interface ListDataProps<T> extends Omit<ListProps, "children"> {
    data: T[];
    renderItem: ListRenderItem<T>;
    estimatedItemSize: number;
    keyExtractor?: (item: T, index: number) => string;
}
export declare function ListData<T>({ data, renderItem, estimatedItemSize, keyExtractor, ...listProps }: ListDataProps<T>): React.JSX.Element;
//# sourceMappingURL=List.d.ts.map