import React from "react";
export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";
export interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    icon?: React.ReactNode;
}
export declare function Badge({ label, variant, icon }: BadgeProps): React.JSX.Element;
//# sourceMappingURL=Badge.d.ts.map