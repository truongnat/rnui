import React from "react";
export type PopoverOriginVertical = "top" | "center" | "bottom" | number;
export type PopoverOriginHorizontal = "left" | "center" | "right" | number;
export interface PopoverOrigin {
    vertical: PopoverOriginVertical;
    horizontal: PopoverOriginHorizontal;
}
export interface PopoverProps {
    open: boolean;
    anchorEl?: {
        x: number;
        y: number;
        width?: number;
        height?: number;
    } | null;
    anchorPosition?: {
        top: number;
        left: number;
    };
    onClose?: () => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    elevation?: number;
    PaperProps?: {
        style?: object;
    };
    marginThreshold?: number;
    children?: React.ReactNode;
}
export declare function Popover({ open, anchorEl, anchorPosition, onClose, anchorOrigin, transformOrigin, PaperProps, marginThreshold, children, }: PopoverProps): React.JSX.Element | null;
//# sourceMappingURL=Popover.d.ts.map