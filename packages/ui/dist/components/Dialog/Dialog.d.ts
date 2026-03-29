import React from "react";
export interface DialogProps {
    open: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    fullWidth?: boolean;
}
export declare function Dialog({ open, onClose, title, children, actions, fullWidth, }: DialogProps): React.JSX.Element | null;
//# sourceMappingURL=Dialog.d.ts.map