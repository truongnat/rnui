import { useState, useCallback } from "react";

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

export function useStepper(options: UseStepperOptions): UseStepperReturn {
  const { steps, initialStep = 0, onChange, onComplete, linear = true } = options;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const next = useCallback(async (): Promise<boolean> => {
    const step = steps[currentStep];
    if (step.validate) {
      const valid = await step.validate();
      if (!valid) return false;
    }
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (!isLast) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onChange?.(next);
    }
    return true;
  }, [currentStep, isLast, steps, onChange]);

  const prev = useCallback(() => {
    if (!isFirst) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onChange?.(prev);
    }
  }, [currentStep, isFirst, onChange]);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalSteps) return;
    if (linear && index > currentStep && !completedSteps.has(index - 1)) return;
    setCurrentStep(index);
    onChange?.(index);
  }, [totalSteps, linear, currentStep, completedSteps, onChange]);

  const complete = useCallback(() => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    onComplete?.();
  }, [currentStep, onComplete]);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(new Set());
  }, [initialStep]);

  const getStepProps = useCallback((index: number) => ({
    active: index === currentStep,
    completed: completedSteps.has(index),
    accessible: true,
    accessibilityRole: "tab" as const,
    accessibilitySelected: index === currentStep,
    accessibilityLabel: `${steps[index]?.label}${completedSteps.has(index) ? ", completed" : ""}${index === currentStep ? ", current" : ""}`,
  }), [currentStep, completedSteps, steps]);

  return { currentStep, totalSteps, isFirst, isLast, completedSteps, next, prev, goTo, complete, reset, getStepProps };
}
