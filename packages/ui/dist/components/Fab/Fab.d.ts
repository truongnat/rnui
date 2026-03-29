import React from "react";
export interface FabProps {
    icon?: React.ReactNode;
    label?: string;
    onPress?: () => void;
    disabled?: boolean;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "circular" | "extended";
    accessibilityLabel?: string;
}
export declare function Fab({ icon, label, onPress, disabled, color, size, variant, accessibilityLabel, }: FabProps): React.JSX.Element;
//# sourceMappingURL=Fab.d.ts.map