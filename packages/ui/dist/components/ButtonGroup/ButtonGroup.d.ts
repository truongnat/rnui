import React from "react";
export interface ButtonGroupProps {
    children?: React.ReactNode;
    variant?: "solid" | "outline" | "ghost" | "destructive" | "text" | "contained" | "outlined";
    size?: "sm" | "md" | "lg";
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    fullWidth?: boolean;
}
export declare function ButtonGroup({ children, variant, size, orientation, disabled, fullWidth, }: ButtonGroupProps): React.JSX.Element;
//# sourceMappingURL=ButtonGroup.d.ts.map