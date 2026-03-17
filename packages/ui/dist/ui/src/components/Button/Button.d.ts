import React from "react";
import type { PressFeedbackMode } from "@rnui/headless";
export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Button label */
    label: string;
    /** Called on press */
    onPress?: () => void;
    /** Called on long press */
    onLongPress?: () => void;
    /** Disable all interaction and apply disabled styles */
    disabled?: boolean;
    /** Show loading spinner, disable interaction */
    loading?: boolean;
    /** Slot for leading icon */
    leadingIcon?: React.ReactNode;
    /** Slot for trailing icon */
    trailingIcon?: React.ReactNode;
    /** Override press feedback mode */
    feedbackMode?: PressFeedbackMode;
    /** Fill container width */
    fullWidth?: boolean;
    /** Accessibility label override (defaults to label) */
    accessibilityLabel?: string;
    /** Accessibility hint */
    accessibilityHint?: string;
}
export declare function Button({ variant, size, label, onPress, onLongPress, disabled, loading, leadingIcon, trailingIcon, feedbackMode, fullWidth, accessibilityLabel, accessibilityHint, }: ButtonProps): React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map