import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import type {
  SliderValueLabelRangeProps,
  SliderValueLabelSingleProps,
} from './types';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/** Worklet snap — mirrors headless snapRatioWorklet for live labels. */
function snapSliderValueWorklet(
  raw: number,
  minV: number,
  maxV: number,
  stepV: number
): number {
  'worklet';
  if (stepV === 0 || maxV === minV) return Math.max(minV, Math.min(maxV, raw));
  const snapped = Math.round((raw - minV) / stepV) * stepV + minV;
  return Math.max(minV, Math.min(maxV, snapped));
}

/**
 * Animated live value display for single-thumb mode.
 */
export function SliderValueLabelSingle({
  show,
  thumbRatioShared,
  min,
  max,
  step,
  style,
}: SliderValueLabelSingleProps) {
  const animatedProps = useAnimatedProps(() => {
    const raw = thumbRatioShared.value * (max - min) + min;
    const s = snapSliderValueWorklet(raw, min, max, step);
    return { text: String(s) };
  });

  if (!show) return null;

  return (
    <AnimatedTextInput
      animatedProps={animatedProps as object}
      editable={false}
      pointerEvents="none"
      underlineColorAndroid="transparent"
      style={{
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 40,
        textAlign: 'right',
      }}
    />
  );
}

/**
 * Animated live value display for range (low–high) mode.
 */
export function SliderValueLabelRange({
  show,
  thumbRatioLowShared,
  thumbRatioHighShared,
  min,
  max,
  step,
  style,
}: SliderValueLabelRangeProps) {
  const animatedProps = useAnimatedProps(() => {
    const rawLo = thumbRatioLowShared.value * (max - min) + min;
    const rawHi = thumbRatioHighShared.value * (max - min) + min;
    const lo = snapSliderValueWorklet(rawLo, min, max, step);
    const hi = snapSliderValueWorklet(rawHi, min, max, step);
    return { text: `${lo} \u2013 ${hi}` };
  });

  if (!show) return null;

  return (
    <AnimatedTextInput
      animatedProps={animatedProps as object}
      editable={false}
      pointerEvents="none"
      underlineColorAndroid="transparent"
      style={{
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 56,
        textAlign: 'right',
      }}
    />
  );
}
