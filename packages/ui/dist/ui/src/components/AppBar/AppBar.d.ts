import React from "react";
import { type ViewStyle } from "react-native";
export interface AppBarProps {
    children?: React.ReactNode;
    color?: "default" | "inherit" | "primary" | "secondary" | "transparent";
    variant?: "elevation" | "outlined";
    position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
    elevation?: 0 | 1 | 2 | 3 | 4;
    style?: ViewStyle | ViewStyle[];
}
export declare function AppBar({ children, color, variant, position, elevation, style, }: AppBarProps): React.JSX.Element;
export interface ToolbarProps {
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}
export declare function Toolbar({ children, style }: ToolbarProps): React.JSX.Element;
//# sourceMappingURL=AppBar.d.ts.map