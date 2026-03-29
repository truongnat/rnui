import React from "react";
import type { UseSwitchOptions } from "@truongdq01/headless";
export interface SwitchProps extends UseSwitchOptions {
    label?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
}
export declare const Switch: React.MemoExoticComponent<({ label, description, size, ...hookOptions }: SwitchProps) => React.JSX.Element>;
//# sourceMappingURL=Switch.d.ts.map