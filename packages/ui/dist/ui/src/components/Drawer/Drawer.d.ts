import React from "react";
import { type ViewStyle } from "react-native";
export interface DrawerProps {
    open: boolean;
    onClose?: () => void;
    anchor?: "left" | "right" | "top" | "bottom";
    variant?: "temporary" | "persistent" | "permanent";
    width?: number;
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}
export declare function Drawer({ open, onClose, anchor, variant, width, children, style, }: DrawerProps): React.JSX.Element;
//# sourceMappingURL=Drawer.d.ts.map