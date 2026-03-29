import React from "react";
export interface TextAreaProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    error?: string;
    helperText?: string;
    /** Minimum number of visible lines */
    minLines?: number;
    /** Maximum lines before scroll kicks in */
    maxLines?: number;
    /** Show character counter */
    maxLength?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    accessibilityLabel?: string;
}
export declare function TextArea({ label, placeholder, value, onChangeText, onBlur, onFocus, error, helperText, minLines, maxLines, maxLength, disabled, autoFocus, accessibilityLabel, }: TextAreaProps): React.JSX.Element;
//# sourceMappingURL=TextArea.d.ts.map