import React from "react";
import { type ViewStyle } from "react-native";
export interface GridProps {
    children?: React.ReactNode;
    container?: boolean;
    size?: number | "auto" | "grow";
    columns?: number;
    spacing?: "sm" | "md" | "lg" | number;
    rowSpacing?: "sm" | "md" | "lg" | number;
    columnSpacing?: "sm" | "md" | "lg" | number;
    direction?: ViewStyle["flexDirection"];
    wrap?: ViewStyle["flexWrap"];
    offset?: number;
    style?: ViewStyle | ViewStyle[];
}
export declare function Grid({ children, container, size, columns, spacing, rowSpacing, columnSpacing, direction, wrap, offset, style, }: GridProps): React.JSX.Element;
//# sourceMappingURL=Grid.d.ts.map