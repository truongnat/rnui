import React from "react";
export interface DividerProps {
    /** Label shown centered in the divider */
    label?: string;
    orientation?: "horizontal" | "vertical";
    /** Use a stronger border color */
    emphasis?: boolean;
    /** Extra vertical margin around horizontal dividers */
    spacing?: "none" | "sm" | "md" | "lg";
}
export declare function Divider({ label, orientation, emphasis, spacing, }: DividerProps): React.JSX.Element;
//# sourceMappingURL=Divider.d.ts.map