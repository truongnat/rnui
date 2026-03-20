import React from "react";
export interface BottomNavigationProps<T = string> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    showLabels?: boolean;
    children?: React.ReactNode;
}
export interface BottomNavigationActionProps<T = string> {
    value: T;
    label?: string;
    icon?: React.ReactNode;
}
export declare function BottomNavigation<T = string>({ value: controlledValue, defaultValue, onChange, showLabels, children, }: BottomNavigationProps<T>): React.JSX.Element;
export declare function BottomNavigationAction<T = string>({ value, label, icon }: BottomNavigationActionProps<T>): React.JSX.Element | null;
//# sourceMappingURL=BottomNavigation.d.ts.map