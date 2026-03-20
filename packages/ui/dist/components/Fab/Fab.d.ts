import React from "react";
export interface FabProps {
    variant?: "circular" | "extended";
    size?: "sm" | "md" | "lg";
    color?: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    disabled?: boolean;
    label?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    accessibilityLabel?: string;
}
export declare function Fab({ variant, size, color, disabled, label, icon, onPress, accessibilityLabel, }: FabProps): React.JSX.Element;
//# sourceMappingURL=Fab.d.ts.map