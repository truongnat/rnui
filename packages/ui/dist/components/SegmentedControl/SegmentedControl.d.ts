import React from "react";
export interface SegmentedControlProps {
    options: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
    height?: number;
    disabled?: boolean;
}
export declare function SegmentedControl({ options, selectedIndex, onChange, height, disabled, }: SegmentedControlProps): React.JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map