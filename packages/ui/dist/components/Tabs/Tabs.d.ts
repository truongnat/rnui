import React from "react";
export interface TabsProps<T = string> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    variant?: "standard" | "scrollable" | "fullWidth";
    centered?: boolean;
    orientation?: "horizontal" | "vertical";
    children?: React.ReactNode;
}
export interface TabProps<T = string> {
    value: T;
    label?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export declare function Tabs<T = string>({ value, defaultValue, onChange, variant, centered, orientation, children, }: TabsProps<T>): React.JSX.Element;
export declare function Tab<T = string>({ value, label, icon, disabled }: TabProps<T>): React.JSX.Element | null;
//# sourceMappingURL=Tabs.d.ts.map