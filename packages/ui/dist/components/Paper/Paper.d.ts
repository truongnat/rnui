import React from "react";
import { type ViewStyle } from "react-native";
export interface PaperProps {
    children?: React.ReactNode;
    variant?: "elevation" | "outlined" | "flat";
    elevation?: "none" | "sm" | "md" | "lg";
    square?: boolean;
    style?: ViewStyle | ViewStyle[];
}
export declare function Paper({ children, variant, elevation, square, style, }: PaperProps): React.JSX.Element;
//# sourceMappingURL=Paper.d.ts.map