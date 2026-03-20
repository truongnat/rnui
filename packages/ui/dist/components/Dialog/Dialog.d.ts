import React from "react";
export interface DialogProps {
    open: boolean;
    onClose?: () => void;
    fullWidth?: boolean;
    fullScreen?: boolean;
    maxWidth?: number;
    children?: React.ReactNode;
}
export interface DialogTitleProps {
    children?: React.ReactNode;
}
export interface DialogContentProps {
    children?: React.ReactNode;
}
export interface DialogActionsProps {
    children?: React.ReactNode;
}
export declare function Dialog({ open, onClose, fullWidth, fullScreen, maxWidth, children }: DialogProps): React.JSX.Element;
export declare function DialogTitle({ children }: DialogTitleProps): React.JSX.Element;
export declare function DialogContent({ children }: DialogContentProps): React.JSX.Element;
export declare function DialogActions({ children }: DialogActionsProps): React.JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map