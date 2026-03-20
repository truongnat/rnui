import React from "react";
import { type TextInputProps as RNTextInputProps } from "react-native";
export type InputSize = "sm" | "md" | "lg";
export interface InputProps extends Omit<RNTextInputProps, "style"> {
    /** Field label shown above input */
    label?: string;
    /** Error message shown below input */
    error?: string;
    /** Helper text shown below input (overridden by error) */
    helperText?: string;
    /** Size preset */
    size?: InputSize;
    /** Slot for leading icon/element inside input */
    leadingElement?: React.ReactNode;
    /** Slot for trailing icon/element inside input */
    trailingElement?: React.ReactNode;
    /** Disable input */
    disabled?: boolean;
    /** Callback when error should be cleared (called on first keystroke) */
    onClearError?: () => void;
}
export declare function Input({ label, error, helperText, size, leadingElement, trailingElement, disabled, onClearError, onFocus, onBlur, onChange, ...rest }: InputProps): React.JSX.Element;
//# sourceMappingURL=Input.d.ts.map