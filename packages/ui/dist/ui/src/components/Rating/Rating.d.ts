import React from "react";
export interface RatingProps {
    value?: number;
    defaultValue?: number;
    max?: number;
    precision?: number;
    readOnly?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    emptyIcon?: React.ReactNode;
    onChange?: (value: number) => void;
}
export declare function Rating({ value, defaultValue, max, precision, readOnly, disabled, size, icon, emptyIcon, onChange, }: RatingProps): React.JSX.Element;
//# sourceMappingURL=Rating.d.ts.map