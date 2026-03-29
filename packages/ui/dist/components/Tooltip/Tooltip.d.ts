import React from "react";
export type TooltipPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
export interface TooltipProps {
    title: React.ReactNode;
    children: React.ReactElement;
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    placement?: TooltipPlacement;
}
export declare function Tooltip({ title, children, open: controlledOpen, onOpen, onClose, placement, }: TooltipProps): React.JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map