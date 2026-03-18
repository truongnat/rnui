import React from "react";
import type { PressFeedbackMode } from "@rnui/headless";
export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive" | "text" | "contained" | "outlined";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
export interface ButtonProps {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Color theme */
    color?: ButtonColor;
    /** Size preset */
    size?: ButtonSize;
    /** Button label (optional for icon-only buttons) */
    label?: string;
    /** Optional children (preferred over label) */
    children?: React.ReactNode;
    /** Called on press */
    onPress?: () => void;
    /** Called on long press */
    onLongPress?: () => void;
    /** Disable all interaction and apply disabled styles */
    disabled?: boolean;
    /** Show loading spinner, disable interaction */
    loading?: boolean;
    /** Custom loading indicator */
    loadingIndicator?: React.ReactNode;
    /** Loading indicator placement */
    loadingPosition?: "start" | "end" | "center";
    /** Slot for leading icon */
    leadingIcon?: React.ReactNode;
    /** Slot for trailing icon */
    trailingIcon?: React.ReactNode;
    /** Alias for leadingIcon */
    startIcon?: React.ReactNode;
    /** Alias for trailingIcon */
    endIcon?: React.ReactNode;
    /** Override press feedback mode */
    feedbackMode?: PressFeedbackMode;
    /** Fill container width */
    fullWidth?: boolean;
    /** Render as link */
    href?: string;
    /** Remove drop shadow */
    disableElevation?: boolean;
    /** Additional style override */
    style?: object;
    /** Accessibility label override (defaults to label) */
    accessibilityLabel?: string;
    /** Accessibility hint */
    accessibilityHint?: string;
}
export declare function Button({ variant, color, size, label, children, onPress, onLongPress, disabled, loading, loadingIndicator, loadingPosition, leadingIcon, trailingIcon, startIcon, endIcon, feedbackMode, fullWidth, href, disableElevation, style, accessibilityLabel, accessibilityHint, }: ButtonProps): React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map