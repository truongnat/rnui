import React from "react";
import type { UseBottomSheetOptions } from "@truongdq01/headless";
export interface BottomSheetProps extends UseBottomSheetOptions {
    children: React.ReactNode;
    /** Show the pill-shaped drag handle at top */
    showHandle?: boolean;
    /** Horizontal border radius on the sheet. If not provided, uses theme token. */
    borderRadius?: number;
}
export interface BottomSheetRef {
    open: (snapIndex?: number) => void;
    close: () => void;
    snapTo: (index: number) => void;
}
export declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<BottomSheetRef>>;
//# sourceMappingURL=BottomSheet.d.ts.map