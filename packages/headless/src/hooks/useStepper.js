'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useStepper = useStepper;
const react_1 = require('react');
function useStepper(options) {
  const {
    steps,
    initialStep = 0,
    onChange,
    onComplete,
    linear = true,
  } = options;
  const [currentStep, setCurrentStep] = (0, react_1.useState)(initialStep);
  const [completedSteps, setCompletedSteps] = (0, react_1.useState)(new Set());
  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const next = (0, react_1.useCallback)(async () => {
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
  const prev = (0, react_1.useCallback)(() => {
    if (!isFirst) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onChange?.(prev);
    }
  }, [currentStep, isFirst, onChange]);
  const goTo = (0, react_1.useCallback)(
    (index) => {
      if (index < 0 || index >= totalSteps) return;
      if (linear && index > currentStep && !completedSteps.has(index - 1))
        return;
      setCurrentStep(index);
      onChange?.(index);
    },
    [totalSteps, linear, currentStep, completedSteps, onChange]
  );
  const complete = (0, react_1.useCallback)(() => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    onComplete?.();
  }, [currentStep, onComplete]);
  const reset = (0, react_1.useCallback)(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(new Set());
  }, [initialStep]);
  const getStepProps = (0, react_1.useCallback)(
    (index) => ({
      active: index === currentStep,
      completed: completedSteps.has(index),
      accessible: true,
      accessibilityRole: 'tab',
      accessibilitySelected: index === currentStep,
      accessibilityLabel: `${steps[index]?.label}${completedSteps.has(index) ? ', completed' : ''}${index === currentStep ? ', current' : ''}`,
    }),
    [currentStep, completedSteps, steps]
  );
  return {
    currentStep,
    totalSteps,
    isFirst,
    isLast,
    completedSteps,
    next,
    prev,
    goTo,
    complete,
    reset,
    getStepProps,
  };
}
//# sourceMappingURL=useStepper.js.map
