import React from "react";
export interface StepperProps {
    activeStep?: number;
    orientation?: "horizontal" | "vertical";
    children?: React.ReactNode;
}
export interface StepProps {
    index: number;
    label?: string;
    children?: React.ReactNode;
}
export interface StepLabelProps {
    children?: React.ReactNode;
    style?: object;
}
export declare function Stepper({ activeStep, orientation, children }: StepperProps): React.JSX.Element;
interface StepInternalProps extends StepProps {
    activeStep: number;
    orientation: "horizontal" | "vertical";
}
export declare function Step({ index, label, children, activeStep, orientation }: Partial<StepInternalProps> & StepProps): React.JSX.Element;
export declare function StepLabel({ children, style }: StepLabelProps): React.JSX.Element;
export {};
//# sourceMappingURL=Stepper.d.ts.map