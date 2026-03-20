import React from "react";
import { type TextStyle } from "react-native";
export interface LinkProps {
    children?: React.ReactNode;
    href?: string;
    onPress?: () => void;
    color?: string;
    underline?: "always" | "hover" | "none";
    style?: TextStyle | TextStyle[];
}
export declare function Link({ children, href, onPress, color, underline, style, }: LinkProps): React.JSX.Element;
//# sourceMappingURL=Link.d.ts.map