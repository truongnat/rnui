import React from "react";
export interface SnackbarProps {
    /** If true, the snackbar is shown */
    open: boolean;
    /** The message to display */
    message: React.ReactNode;
    /** Duration in ms before auto-hiding. Use null to disable. */
    autoHideDuration?: number | null;
    /** Callback on close */
    onClose?: () => void;
    /** Action element (e.g. Button) */
    action?: React.ReactNode;
    /** Position on screen */
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}
export declare function Snackbar({ open, message, autoHideDuration, onClose, action, anchorOrigin, }: SnackbarProps): React.JSX.Element | null;
//# sourceMappingURL=Snackbar.d.ts.map