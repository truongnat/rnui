import React from "react";
import type { UseSliderOptions } from "@truongnat/headless";
export interface SliderProps extends UseSliderOptions {
    label?: string;
    /** Show current value as tooltip above thumb */
    showValue?: boolean;
    /** Custom value formatter */
    formatValue?: (v: number) => string;
    /** Show min/max labels */
    showRange?: boolean;
    /** Show step tick marks */
    showMarks?: boolean;
}
export declare function Slider({ label, showValue, formatValue, showRange, showMarks, min, max, step, ...hookOptions }: SliderProps): React.JSX.Element;
//# sourceMappingURL=Slider.d.ts.map