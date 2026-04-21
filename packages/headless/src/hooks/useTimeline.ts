import { useCallback, useState } from 'react';

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
}

export interface UseTimelineOptions {
  steps: TimelineStep[];
  activeStep?: number;
  expandable?: boolean;
  onStepChange?: (index: number) => void;
}

export interface UseTimelineReturn {
  steps: TimelineStep[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  expandedSteps: Set<number>;
  toggleStep: (index: number) => void;
  expandAll: () => void;
  collapseAll: () => void;
  isStepExpanded: (index: number) => boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isStepComplete: (index: number) => boolean;
  isStepActive: (index: number) => boolean;
  isStepPending: (index: number) => boolean;
  isStepError: (index: number) => boolean;
}

export function useTimeline(options: UseTimelineOptions): UseTimelineReturn {
  const {
    steps,
    activeStep: controlledActiveStep,
    expandable = true,
    onStepChange,
  } = options;

  const [internalActiveStep, setInternalActiveStep] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const isControlled = controlledActiveStep !== undefined;
  const activeStep = isControlled ? controlledActiveStep : internalActiveStep;

  const setActiveStep = useCallback(
    (index: number) => {
      if (steps.length === 0) return;
      const clamped = Math.max(0, Math.min(index, steps.length - 1));
      if (!isControlled) setInternalActiveStep(clamped);
      onStepChange?.(clamped);
    },
    [isControlled, onStepChange, steps.length]
  );

  const toggleStep = useCallback(
    (index: number) => {
      if (!expandable) return;
      setExpandedSteps((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [expandable]
  );

  const expandAll = useCallback(() => {
    if (!expandable) return;
    setExpandedSteps(new Set(steps.map((_, i) => i)));
  }, [expandable, steps.length]);

  const collapseAll = useCallback(() => {
    setExpandedSteps(new Set());
  }, []);

  const isStepExpanded = useCallback(
    (index: number) => {
      return expandedSteps.has(index);
    },
    [expandedSteps]
  );

  const goToNextStep = useCallback(() => {
    if (steps.length === 0) return;
    const next = Math.min(activeStep + 1, steps.length - 1);
    setActiveStep(next);
  }, [activeStep, steps.length, setActiveStep]);

  const goToPreviousStep = useCallback(() => {
    if (steps.length === 0) return;
    const prev = Math.max(activeStep - 1, 0);
    setActiveStep(prev);
  }, [activeStep, steps.length, setActiveStep]);

  const isStepComplete = useCallback(
    (index: number) => {
      return index < activeStep || steps[index]?.status === 'completed';
    },
    [activeStep, steps]
  );

  const isStepActive = useCallback(
    (index: number) => {
      return index === activeStep || steps[index]?.status === 'active';
    },
    [activeStep, steps]
  );

  const isStepPending = useCallback(
    (index: number) => {
      return (
        index > activeStep &&
        steps[index]?.status !== 'completed' &&
        steps[index]?.status !== 'active'
      );
    },
    [activeStep, steps]
  );

  const isStepError = useCallback(
    (index: number) => {
      return steps[index]?.status === 'error';
    },
    [steps]
  );

  return {
    steps,
    activeStep,
    setActiveStep,
    expandedSteps,
    toggleStep,
    expandAll,
    collapseAll,
    isStepExpanded,
    goToNextStep,
    goToPreviousStep,
    isStepComplete,
    isStepActive,
    isStepPending,
    isStepError,
  };
}
