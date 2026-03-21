import React from "react";
import { type ViewStyle } from "react-native";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
export interface AvatarProps {
    /** Image URI */
    src?: string;
    /** Fallback initials if no src */
    initials?: string;
    /** Fallback when no src and no initials */
    fallbackIcon?: React.ReactNode;
    size?: AvatarSize;
    status?: AvatarStatus;
    shape?: "circle" | "rounded";
    /** Accessible label */
    accessibilityLabel?: string;
    style?: ViewStyle | ViewStyle[];
}
export declare function Avatar({ src, initials, fallbackIcon, size, status, shape, accessibilityLabel, style, }: AvatarProps): React.JSX.Element;
export interface AvatarGroupProps {
    avatars: AvatarProps[];
    max?: number;
    size?: AvatarSize;
    overlap?: number;
}
export declare function AvatarGroup({ avatars, max, size, overlap, }: AvatarGroupProps): React.JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map