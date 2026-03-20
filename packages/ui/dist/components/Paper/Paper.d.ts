import React from "react";
import { type ViewStyle } from "react-native";
export interface PaperProps {
    children?: React.ReactNode;
    variant?: "elevation" | "outlined";
    elevation?: 0 | 1 | 2 | 3 | 4;
    square?: boolean;
    style?: ViewStyle | ViewStyle[];
}
export declare function Paper({ children, variant, elevation, square, style, }: PaperProps): React.JSX.Element;
//# sourceMappingURL=Paper.d.ts.map