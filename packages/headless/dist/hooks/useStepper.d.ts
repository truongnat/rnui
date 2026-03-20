export interface Step {
    id: string;
    label: string;
    optional?: boolean;
    validate?: () => boolean | Promise<boolean>;
}
export interface UseStepperOptions {
    steps: Step[];
    initialStep?: number;
    onChange?: (step: number) => void;
    onComplete?: () => void;
    linear?: boolean;
}
export interface UseStepperReturn {
    currentStep: number;
    totalSteps: number;
    isFirst: boolean;
    isLast: boolean;
    completedSteps: Set<number>;
    next: () => Promise<boolean>;
    prev: () => void;
    goTo: (index: number) => void;
    complete: () => void;
    reset: () => void;
    getStepProps: (index: number) => {
        active: boolean;
        completed: boolean;
        accessible: boolean;
        accessibilityRole: "tab";
        accessibilitySelected: boolean;
        accessibilityLabel: string;
    };
}
export declare function useStepper(options: UseStepperOptions): UseStepperReturn;
//# sourceMappingURL=useStepper.d.ts.map