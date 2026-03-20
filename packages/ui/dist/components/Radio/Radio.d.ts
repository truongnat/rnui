import React from "react";
import type { UseRadioGroupOptions } from "@rnui/headless";
export interface RadioItemProps<T = string> {
    value: T;
    label: string;
    description?: string;
    disabled?: boolean;
    isSelected: boolean;
    onPress: () => void;
    size?: "sm" | "md" | "lg";
}
export declare function RadioItem<T = string>({ label, description, disabled, isSelected, onPress, size, }: RadioItemProps<T>): React.JSX.Element;
export interface RadioOption<T = string> {
    value: T;
    label: string;
    description?: string;
    disabled?: boolean;
}
export interface RadioGroupProps<T = string> extends UseRadioGroupOptions<T> {
    options: RadioOption<T>[];
    label?: string;
    direction?: "vertical" | "horizontal";
    size?: "sm" | "md" | "lg";
}
export declare function RadioGroup<T = string>({ options, label, direction, size, ...hookOptions }: RadioGroupProps<T>): React.JSX.Element;
//# sourceMappingURL=Radio.d.ts.map