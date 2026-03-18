import React from "react";
import { type ViewStyle } from "react-native";
export interface StackProps {
    children?: React.ReactNode;
    direction?: "column" | "column-reverse" | "row" | "row-reverse";
    spacing?: number;
    divider?: React.ReactNode;
    alignItems?: ViewStyle["alignItems"];
    justifyContent?: ViewStyle["justifyContent"];
    flexWrap?: ViewStyle["flexWrap"];
    style?: ViewStyle | ViewStyle[];
}
export declare function Stack({ children, direction, spacing, divider, alignItems, justifyContent, flexWrap, style, }: StackProps): React.JSX.Element;
//# sourceMappingURL=Stack.d.ts.map