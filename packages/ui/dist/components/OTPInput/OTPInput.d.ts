import React from "react";
export interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
}
export declare function OTPInput({ length, value, onChange, onComplete, disabled, }: OTPInputProps): React.JSX.Element;
//# sourceMappingURL=OTPInput.d.ts.map