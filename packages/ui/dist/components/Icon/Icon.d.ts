import React from "react";
export interface IconProps {
    children?: React.ReactNode;
    color?: string;
    size?: number | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
    fontSize?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
}
export interface SvgIconProps {
    children: React.ReactElement;
    color?: string;
    fontSize?: "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";
}
export declare function Icon({ children, color, size, fontSize }: IconProps): React.JSX.Element;
export declare function SvgIcon({ children, color, fontSize }: SvgIconProps): React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
//# sourceMappingURL=Icon.d.ts.map