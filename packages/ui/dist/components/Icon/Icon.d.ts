import React from "react";
export declare const ICON_MAP: {
    readonly star: import("lucide-react-native").LucideIcon;
    readonly heart: import("lucide-react-native").LucideIcon;
    readonly check: import("lucide-react-native").LucideIcon;
    readonly info: import("lucide-react-native").LucideIcon;
    readonly warning: import("lucide-react-native").LucideIcon;
    readonly error: import("lucide-react-native").LucideIcon;
    readonly checkCircle: import("lucide-react-native").LucideIcon;
    readonly close: import("lucide-react-native").LucideIcon;
    readonly closeCircle: import("lucide-react-native").LucideIcon;
    readonly menu: import("lucide-react-native").LucideIcon;
    readonly moreVertical: import("lucide-react-native").LucideIcon;
    readonly moreHorizontal: import("lucide-react-native").LucideIcon;
    readonly search: import("lucide-react-native").LucideIcon;
    readonly settings: import("lucide-react-native").LucideIcon;
    readonly bell: import("lucide-react-native").LucideIcon;
    readonly home: import("lucide-react-native").LucideIcon;
    readonly user: import("lucide-react-native").LucideIcon;
    readonly plus: import("lucide-react-native").LucideIcon;
    readonly minus: import("lucide-react-native").LucideIcon;
    readonly edit: import("lucide-react-native").LucideIcon;
    readonly trash: import("lucide-react-native").LucideIcon;
    readonly share: import("lucide-react-native").LucideIcon;
    readonly download: import("lucide-react-native").LucideIcon;
    readonly upload: import("lucide-react-native").LucideIcon;
    readonly refresh: import("lucide-react-native").LucideIcon;
    readonly externalLink: import("lucide-react-native").LucideIcon;
    readonly chevronUp: import("lucide-react-native").LucideIcon;
    readonly chevronDown: import("lucide-react-native").LucideIcon;
    readonly chevronLeft: import("lucide-react-native").LucideIcon;
    readonly chevronRight: import("lucide-react-native").LucideIcon;
    readonly arrowUp: import("lucide-react-native").LucideIcon;
    readonly arrowDown: import("lucide-react-native").LucideIcon;
    readonly arrowLeft: import("lucide-react-native").LucideIcon;
    readonly arrowRight: import("lucide-react-native").LucideIcon;
    readonly eye: import("lucide-react-native").LucideIcon;
    readonly eyeOff: import("lucide-react-native").LucideIcon;
    readonly lock: import("lucide-react-native").LucideIcon;
    readonly unlock: import("lucide-react-native").LucideIcon;
    readonly calendar: import("lucide-react-native").LucideIcon;
    readonly clock: import("lucide-react-native").LucideIcon;
    readonly mapPin: import("lucide-react-native").LucideIcon;
    readonly camera: import("lucide-react-native").LucideIcon;
    readonly image: import("lucide-react-native").LucideIcon;
    readonly video: import("lucide-react-native").LucideIcon;
    readonly file: import("lucide-react-native").LucideIcon;
    readonly copy: import("lucide-react-native").LucideIcon;
    readonly layout: import("lucide-react-native").LucideIcon;
    readonly grid: import("lucide-react-native").LucideIcon;
    readonly list: import("lucide-react-native").LucideIcon;
    readonly layers: import("lucide-react-native").LucideIcon;
    readonly box: import("lucide-react-native").LucideIcon;
    readonly package: import("lucide-react-native").LucideIcon;
    readonly cart: import("lucide-react-native").LucideIcon;
    readonly card: import("lucide-react-native").LucideIcon;
    readonly mail: import("lucide-react-native").LucideIcon;
    readonly phone: import("lucide-react-native").LucideIcon;
    readonly message: import("lucide-react-native").LucideIcon;
    readonly send: import("lucide-react-native").LucideIcon;
    readonly zap: import("lucide-react-native").LucideIcon;
    readonly flame: import("lucide-react-native").LucideIcon;
    readonly starHalf: import("lucide-react-native").LucideIcon;
    readonly thumbsUp: import("lucide-react-native").LucideIcon;
    readonly thumbsDown: import("lucide-react-native").LucideIcon;
};
export type IconName = keyof typeof ICON_MAP;
export interface IconProps {
    /** The name of the icon. Can also be passed as children. */
    name?: IconName | string;
    /** The name of the icon as text children. */
    children?: IconName | string | React.ReactNode;
    /** Size of the icon. Can be a number or a theme preset. */
    size?: number | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "small" | "medium" | "large";
    /** Color of the icon. Can be a raw hex or a theme preset. */
    color?: string;
    style?: any;
}
/**
 * A standardized Icon component that wraps lucide-react-native icons.
 * Provides theme-aware sizing and colors.
 */
export declare function Icon({ name, children, size, color, style }: IconProps): React.JSX.Element;
/**
 * A helper to wrap any icon with standard sizing and colors.
 */
export declare function IconWrapper({ children, size, color }: {
    children: React.ReactNode;
    size?: number;
    color?: string;
}): React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
//# sourceMappingURL=Icon.d.ts.map