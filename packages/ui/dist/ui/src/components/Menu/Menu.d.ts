import React from "react";
export interface MenuProps {
    open: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}
export interface MenuItemProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    selected?: boolean;
}
export declare function Menu({ open, onClose, children }: MenuProps): React.JSX.Element;
export declare function MenuItem({ children, onPress, disabled, selected }: MenuItemProps): React.JSX.Element;
//# sourceMappingURL=Menu.d.ts.map