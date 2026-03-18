import React from "react";
export type AlertSeverity = "error" | "warning" | "info" | "success";
export type AlertVariant = "standard" | "filled" | "outlined";
export interface AlertProps {
    severity?: AlertSeverity;
    variant?: AlertVariant;
    icon?: React.ReactNode | false;
    action?: React.ReactNode;
    onClose?: () => void;
    children?: React.ReactNode;
}
export interface AlertTitleProps {
    children?: React.ReactNode;
}
export declare function Alert({ severity, variant, icon, action, onClose, children, }: AlertProps): React.JSX.Element;
export declare function AlertTitle({ children }: AlertTitleProps): React.JSX.Element;
//# sourceMappingURL=Alert.d.ts.map