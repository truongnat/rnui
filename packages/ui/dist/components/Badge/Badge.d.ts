import React from "react";
export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";
export interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: React.ReactNode;
}
export declare const Badge: React.MemoExoticComponent<({ label, variant, size, icon }: BadgeProps) => React.JSX.Element>;
//# sourceMappingURL=Badge.d.ts.map