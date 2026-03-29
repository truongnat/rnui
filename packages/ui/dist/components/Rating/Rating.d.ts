import React from "react";
export interface RatingProps {
    value?: number;
    defaultValue?: number;
    max?: number;
    precision?: number;
    readOnly?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    onChange?: (value: number) => void;
}
export declare function Rating({ value, defaultValue, max, precision, readOnly, disabled, size, onChange, }: RatingProps): React.JSX.Element;
//# sourceMappingURL=Rating.d.ts.map