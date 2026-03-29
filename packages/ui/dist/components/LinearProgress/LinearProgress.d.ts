import React from "react";
export type LinearProgressVariant = "indeterminate" | "determinate" | "buffer" | "query";
export type LinearProgressColor = "primary" | "secondary" | "success" | "error" | "info" | "warning" | "brand" | "accent" | "inherit";
export interface LinearProgressProps {
    value?: number;
    variant?: LinearProgressVariant;
    valueBuffer?: number;
    color?: LinearProgressColor;
    trackColor?: string;
    thickness?: number;
    style?: any;
}
export declare function LinearProgress({ value, variant, valueBuffer, color, trackColor, thickness, style, }: LinearProgressProps): React.JSX.Element;
//# sourceMappingURL=LinearProgress.d.ts.map