import React from "react";
export type CircularProgressVariant = "indeterminate" | "determinate";
export type CircularProgressColor = "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
export interface CircularProgressProps {
    size?: number | "small" | "medium" | "large";
    color?: CircularProgressColor;
    thickness?: number;
    value?: number;
    variant?: CircularProgressVariant;
    showLabel?: boolean;
    style?: object;
}
export declare function CircularProgress({ size, color, thickness: _thickness, value, variant, showLabel, style, }: CircularProgressProps): React.JSX.Element;
//# sourceMappingURL=CircularProgress.d.ts.map