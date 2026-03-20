import React from "react";
import type { UseSwitchOptions } from "@rnui/headless";
export interface SwitchProps extends UseSwitchOptions {
    label?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
}
export declare function Switch({ label, description, size, ...hookOptions }: SwitchProps): React.JSX.Element;
//# sourceMappingURL=Switch.d.ts.map