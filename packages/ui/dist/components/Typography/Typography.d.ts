import React from "react";
import { type TextStyle } from "react-native";
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "inherit";
export interface TypographyProps {
    children?: React.ReactNode;
    variant?: TypographyVariant;
    align?: "left" | "right" | "center" | "justify" | "inherit";
    color?: string;
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    display?: "none" | "flex" | "contents" | "block" | "inline" | "inline-flex";
    style?: TextStyle | TextStyle[];
}
export declare function Typography({ children, variant, align, color, gutterBottom, noWrap, paragraph, display, style, }: TypographyProps): React.JSX.Element;
//# sourceMappingURL=Typography.d.ts.map