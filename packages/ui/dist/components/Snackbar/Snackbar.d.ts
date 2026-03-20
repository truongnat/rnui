import React from "react";
export interface SnackbarProps {
    open: boolean;
    message: React.ReactNode;
    autoHideDuration?: number | null;
    onClose?: () => void;
    action?: React.ReactNode;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}
export declare function Snackbar({ open, message, autoHideDuration, onClose, action, anchorOrigin, }: SnackbarProps): React.JSX.Element | null;
//# sourceMappingURL=Snackbar.d.ts.map