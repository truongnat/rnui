import React from "react";
export interface SpeedDialProps {
    ariaLabel: string;
    icon?: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    hidden?: boolean;
    children?: React.ReactNode;
}
export interface SpeedDialActionProps {
    icon?: React.ReactNode;
    tooltipTitle?: string;
    onPress?: () => void;
}
export declare function SpeedDial({ ariaLabel, icon, direction, open: controlledOpen, onOpen, onClose, hidden, children, }: SpeedDialProps): React.JSX.Element | null;
export declare function SpeedDialAction({ icon, tooltipTitle, onPress }: SpeedDialActionProps): React.JSX.Element | null;
//# sourceMappingURL=SpeedDial.d.ts.map