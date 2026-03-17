import React from "react";
export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";
export interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
}
export declare function Badge({ label, variant }: BadgeProps): React.JSX.Element;
//# sourceMappingURL=Badge.d.ts.map