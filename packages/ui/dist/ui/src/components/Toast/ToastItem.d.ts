import React from "react";
import type { ToastItem as ToastItemType, ToastPosition } from "@rnui/headless";
interface ToastItemProps {
    item: ToastItemType;
    position: ToastPosition;
    onDismiss: (id: string) => void;
}
export declare function ToastItem({ item, position, onDismiss }: ToastItemProps): React.JSX.Element;
export {};
//# sourceMappingURL=ToastItem.d.ts.map