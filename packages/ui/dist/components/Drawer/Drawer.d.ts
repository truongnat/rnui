import React from "react";
export type DrawerAnchor = "left" | "right" | "top" | "bottom";
export interface DrawerProps {
    open: boolean;
    onClose?: () => void;
    anchor?: DrawerAnchor;
    children?: React.ReactNode;
}
export declare function Drawer({ open, onClose, anchor, children, }: DrawerProps): React.JSX.Element | null;
//# sourceMappingURL=Drawer.d.ts.map