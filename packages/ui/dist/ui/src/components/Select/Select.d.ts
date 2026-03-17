import React from "react";
import type { UseSelectOptions } from "@rnui/headless";
export interface SelectProps<T = string> extends UseSelectOptions<T> {
    label?: string;
    placeholder?: string;
    searchable?: boolean;
    error?: string;
}
export declare function Select<T = string>({ label, placeholder, searchable, error, options, ...hookOptions }: SelectProps<T>): React.JSX.Element;
//# sourceMappingURL=Select.d.ts.map