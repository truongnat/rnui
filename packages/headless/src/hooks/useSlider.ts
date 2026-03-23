import { useCallback, useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture } from "react-native-gesture-handler";
import { spring } from "@truongnat/tokens";

export interface UseSliderOptions {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  disabled?: boolean;
}

export interface UseSliderReturn {
  currentValue: number;
  thumbAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  fillAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trackAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  panGesture: ReturnType<typeof Gesture.Pan>;
  /** Call with the track's measured pixel width */
  onTrackLayout: (width: number) => void;
  percentage: number;
}

function snapToStep(value: number, min: number, max: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}

export function useSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = min,
  value: controlledValue,
  onChange,
  onChangeEnd,
  disabled = false,
}: UseSliderOptions = {}): UseSliderReturn {
  const trackWidth = useSharedValue(0);
  const internalValue = useRef(controlledValue ?? defaultValue);
  const currentValue = controlledValue ?? internalValue.current;

  const percentage = (currentValue - min) / (max - min);

  // Thumb position as ratio [0..1] on the UI thread
  const thumbRatio = useSharedValue(percentage);
  const isDragging = useSharedValue(false);
  const dragStartRatio = useSharedValue(0);
  const thumbScale = useSharedValue(1);

  const onTrackLayout = useCallback(
    (width: number) => {
      trackWidth.value = width;
    },
    [trackWidth]
  );

  // JS-thread value emit
  const emitChange = useCallback(
    (ratio: number) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValue.current = snapped;
      onChange?.(snapped);
    },
    [min, max, step, onChange]
  );

  const emitChangeEnd = useCallback(
    (ratio: number) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEnd?.(snapped);
    },
    [min, max, step, onChangeEnd]
  );

  const snappySpringConfig = spring.snappy;

  // Track last emitted value to minimize runOnJS calls
  const lastEmittedValue = useSharedValue(currentValue);

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      "worklet";
      isDragging.value = true;
      thumbScale.value = withSpring(1.2, snappySpringConfig);
      dragStartRatio.value = thumbRatio.value;
    })
    .onUpdate((e) => {
      "worklet";
      if (trackWidth.value === 0) return;
      const delta = e.translationX / trackWidth.value;
      const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
      thumbRatio.value = next;

      // Optimization: Calculate snapped value on UI thread and only emit if changed
      const raw = next * (max - min) + min;
      const snapped = Math.round((raw - min) / step) * step + min;
      const finalSnapped = Math.max(min, Math.min(max, snapped));

      if (finalSnapped !== lastEmittedValue.value) {
        lastEmittedValue.value = finalSnapped;
        scheduleOnRN(emitChange, next);
      }
    })
    .onEnd(() => {
      "worklet";
      isDragging.value = false;
      thumbScale.value = withSpring(1, snappySpringConfig);

      const raw = thumbRatio.value * (max - min) + min;
      const snapped = Math.round((raw - min) / step) * step + min;
      const finalSnapped = Math.max(min, Math.min(max, snapped));

      const targetRatio = (finalSnapped - min) / (max - min);
      thumbRatio.value = withSpring(targetRatio, snappySpringConfig);

      scheduleOnRN(emitChangeEnd, targetRatio);
    });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    // Local copy of trackWidth to avoid capture issues
    const width = trackWidth.value;
    const ratio = thumbRatio.value;
    const scale = thumbScale.value;

    return {
      transform: [
        { translateX: ratio * width },
        { scale: scale },
      ] as any,
    };
  });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const ratio = thumbRatio.value;
    return {
      width: `${ratio * 100}%`,
    };
  });

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.4 : 1,
  }));

  return {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage,
  };
}