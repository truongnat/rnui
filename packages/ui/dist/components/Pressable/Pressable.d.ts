import React from "react";
import type { UsePressableOptions } from "@rnui/headless";
export interface PressableProps extends UsePressableOptions {
    children: React.ReactNode | ((state: {
        isPressed: boolean;
    }) => React.ReactNode);
    style?: object | object[];
}
export declare function Pressable({ children, style, ...hookOptions }: PressableProps): React.JSX.Element;
//# sourceMappingURL=Pressable.d.ts.map