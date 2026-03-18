import React from "react";
export type PopperPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
export interface PopperProps {
    open: boolean;
    anchorEl?: {
        x: number;
        y: number;
        width?: number;
        height?: number;
    } | null;
    placement?: PopperPlacement;
    disablePortal?: boolean;
    transition?: boolean;
    keepMounted?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}
export declare function Popper({ open, anchorEl, placement, keepMounted, onClose, children, }: PopperProps): React.JSX.Element | null;
//# sourceMappingURL=Popper.d.ts.map