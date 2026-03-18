import React from "react";
export interface TooltipProps {
    title: React.ReactNode;
    children: React.ReactElement;
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    arrow?: boolean;
    placement?: "top" | "bottom";
}
export declare function Tooltip({ title, children, open: controlledOpen, onOpen, onClose, placement }: TooltipProps): React.JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map