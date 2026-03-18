import React from "react";
export type ImageListVariant = "standard" | "woven" | "masonry" | "quilted";
export interface ImageListProps {
    children?: React.ReactNode;
    cols?: number;
    gap?: number;
    rowHeight?: number | "auto";
    variant?: ImageListVariant;
    style?: object;
}
export declare function ImageList({ children, cols, gap, rowHeight, variant, style, }: ImageListProps): React.JSX.Element;
export interface ImageListItemProps {
    children?: React.ReactNode;
    cols?: number;
    rows?: number;
    style?: object;
}
export declare function ImageListItem({ children, cols, rows, style }: ImageListItemProps): React.JSX.Element;
export interface ImageListItemBarProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    actionIcon?: React.ReactNode;
    position?: "top" | "bottom";
    style?: object;
}
export declare function ImageListItemBar({ title, subtitle, actionIcon, position, style, }: ImageListItemBarProps): React.JSX.Element;
//# sourceMappingURL=ImageList.d.ts.map