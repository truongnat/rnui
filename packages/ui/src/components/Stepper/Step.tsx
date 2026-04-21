import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStepperContext } from './context';
import { StepIcon } from './StepIcon';
import type { StepInternalProps, StepProps } from './types';

/**
 * Individual step container. Resolves active/completed state from StepperContext
 * and renders StepIcon + optional label and children.
 *
 * Falls back to legacy cloneElement-injected props when context is unavailable.
 */
export function Step({
  index,
  label,
  children,
  // Legacy injected props (kept for backward compat when used outside Stepper)
  activeStep: activeStepProp,
  orientation: orientationProp,
}: Partial<StepInternalProps> & StepProps) {
  const ctx = useStepperContext();

  const activeStep = ctx?.activeStep ?? activeStepProp ?? 0;
  const orientation = ctx?.orientation ?? orientationProp ?? 'horizontal';

  const {
    components: { stepper },
  } = useTheme();

  const isActive = index === activeStep;
  const isCompleted = ctx?.completed
    ? ctx.completed[index] ?? false
    : index < activeStep;

  const { activeColor, completedColor, pendingColor } = useMemo(
    () => ({
      activeColor: stepper.step.active.color,
      completedColor: stepper.step.completed.color,
      pendingColor: stepper.step.pending.color,
    }),
    [stepper]
  );

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        flexDirection: orientation === 'horizontal'
          ? ('column' as const)
          : ('row' as const),
      },
    ],
    [orientation]
  );

  const labelTextStyle = useMemo(
    () => ({
      color: isActive ? activeColor : pendingColor,
      fontSize: 14,
    }),
    [isActive, activeColor, pendingColor]
  );

  return (
    <View style={containerStyle}>
      <StepIcon
        index={index}
        isActive={isActive}
        isCompleted={isCompleted}
        activeColor={activeColor}
        completedColor={completedColor}
        pendingColor={pendingColor}
      />
      {label != null && <Text style={labelTextStyle}>{label}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: 'center',
  },
});
