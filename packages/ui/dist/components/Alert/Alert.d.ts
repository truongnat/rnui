import React from "react";
export type AlertSeverity = "error" | "warning" | "info" | "success";
export type AlertVariant = "standard" | "filled" | "outlined";
export interface AlertProps {
    /** Severity of the alert */
    severity?: AlertSeverity;
    /** Visual variant */
    variant?: AlertVariant;
    /** Custom icon or false to hide */
    icon?: React.ReactNode | false;
    /** Action element (e.g. Button) */
    action?: React.ReactNode;
    /** Callback on close button press */
    onClose?: () => void;
    /** Content of the alert */
    children?: React.ReactNode;
}
export interface AlertTitleProps {
    children?: React.ReactNode;
}
export declare function Alert({ severity, variant, icon, action, onClose, children, }: AlertProps): React.JSX.Element;
export declare function AlertTitle({ children }: AlertTitleProps): React.JSX.Element;
//# sourceMappingURL=Alert.d.ts.map