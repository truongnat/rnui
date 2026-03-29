import React from "react";
import type { UseCheckboxOptions } from "@truongdq01/headless";
export interface CheckboxProps extends UseCheckboxOptions {
    label?: string;
    description?: string;
    size?: "sm" | "md" | "lg";
}
export declare function Checkbox({ label, description, size, ...hookOptions }: CheckboxProps): React.JSX.Element;
//# sourceMappingURL=Checkbox.d.ts.map