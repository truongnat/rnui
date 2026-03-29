import React from "react";
export interface ModalProps {
    open: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    keepMounted?: boolean;
    hideBackdrop?: boolean;
    disableAutoFocus?: boolean;
    disableEscapeKeyDown?: boolean;
    BackdropComponent?: React.ComponentType<any>;
    BackdropProps?: object;
    contentStyle?: object;
}
export declare function Modal({ open, onClose, children, keepMounted, hideBackdrop, disableEscapeKeyDown, BackdropComponent, BackdropProps, contentStyle, }: ModalProps): React.JSX.Element | null;
//# sourceMappingURL=Modal.d.ts.map