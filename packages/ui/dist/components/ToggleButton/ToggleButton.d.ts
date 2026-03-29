import React from "react";
export interface ToggleButtonGroupProps<T = string> {
    value?: T | T[];
    defaultValue?: T | T[];
    exclusive?: boolean;
    onChange?: (value: T | T[] | undefined) => void;
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    children?: React.ReactNode;
}
export interface ToggleButtonProps<T = string> {
    value: T;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare function ToggleButtonGroup<T = string>({ value, defaultValue, exclusive, onChange, orientation, size, disabled, children, }: ToggleButtonGroupProps<T>): React.JSX.Element;
export declare function ToggleButton<T = string>({ value, disabled, children }: ToggleButtonProps<T>): React.JSX.Element;
//# sourceMappingURL=ToggleButton.d.ts.map