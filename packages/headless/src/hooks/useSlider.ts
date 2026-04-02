import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture } from "react-native-gesture-handler";
import { spring } from "@truongdq01/tokens";

export type SliderOrientation = "horizontal" | "vertical";

type BaseSliderOptions = {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: SliderOrientation;
};

export type UseSliderOptionsSingle = BaseSliderOptions & {
  range?: false;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
};

export type UseSliderOptionsRange = BaseSliderOptions & {
  range: true;
  defaultValue?: [number, number];
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  onChangeEnd?: (value: [number, number]) => void;
};

export type UseSliderOptions = UseSliderOptionsSingle | UseSliderOptionsRange;

export interface UseSliderReturnSingle {
  mode: "single";
  currentValue: number;
  thumbAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  fillAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trackAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  panGesture: ReturnType<typeof Gesture.Pan>;
  onTrackLayout: (size: number) => void;
  percentage: number;
  orientation: SliderOrientation;
}

export interface UseSliderReturnRange {
  mode: "range";
  currentValue: [number, number];
  thumbLowAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  thumbHighAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  fillAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trackAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  panGestureLow: ReturnType<typeof Gesture.Pan>;
  panGestureHigh: ReturnType<typeof Gesture.Pan>;
  onTrackLayout: (size: number) => void;
  percentage: [number, number];
  orientation: SliderOrientation;
}

export type UseSliderReturn = UseSliderReturnSingle | UseSliderReturnRange;

function snapToStep(value: number, min: number, max: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}

function sortPair(a: number, b: number): [number, number] {
  return a <= b ? [a, b] : [b, a];
}

/** Worklet-safe snap (inline math only). */
function snapRatioWorklet(raw: number, min: number, max: number, step: number): number {
  "worklet";
  const snapped = Math.round((raw - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}

export function useSlider({
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  range = false,
  ...rest
}: UseSliderOptions = {}): UseSliderReturn {
  const isRange = range === true;
  const isVertical = orientation === "vertical";
  const trackLength = useSharedValue(0);
  const snappySpringConfig = spring.snappy;
  const minRatioGap = Math.max(step / (max - min), 1e-4);

  const singleRest = rest as UseSliderOptionsSingle;
  const rangeRest = rest as UseSliderOptionsRange;

  const defaultValueSingle = singleRest.defaultValue ?? min;
  const controlledSingle = singleRest.value;
  const onChangeSingle = singleRest.onChange;
  const onChangeEndSingle = singleRest.onChangeEnd;

  const dvRange = rangeRest.defaultValue ?? ([min, max] as [number, number]);
  const controlledPair = rangeRest.value;
  const onChangeRange = rangeRest.onChange;
  const onChangeEndRange = rangeRest.onChangeEnd;

  const sortedDefaultRange = sortPair(
    snapToStep(dvRange[0], min, max, step),
    snapToStep(dvRange[1], min, max, step)
  );
  const internalPairRef = useRef<[number, number]>(
    controlledPair ? sortPair(controlledPair[0], controlledPair[1]) : sortedDefaultRange
  );

  const currentPairResolved = useMemo(() => {
    if (!isRange) return [min, min] as [number, number];
    return controlledPair
      ? sortPair(
          snapToStep(controlledPair[0], min, max, step),
          snapToStep(controlledPair[1], min, max, step)
        )
      : internalPairRef.current;
  }, [isRange, controlledPair, min, max, step]);

  const internalValueRef = useRef(controlledSingle ?? defaultValueSingle);
  const currentSingle = controlledSingle ?? internalValueRef.current;

  const lowRatioInit = isRange ? (currentPairResolved[0] - min) / (max - min) : 0;
  const highRatioInit = isRange ? (currentPairResolved[1] - min) / (max - min) : 1;
  const singleRatioInit = !isRange ? (currentSingle - min) / (max - min) : 0;

  const thumbRatio = useSharedValue(singleRatioInit);
  const thumbRatioLow = useSharedValue(lowRatioInit);
  const thumbRatioHigh = useSharedValue(highRatioInit);

  const isDragging = useSharedValue(false);
  const dragStartRatio = useSharedValue(0);
  const thumbScale = useSharedValue(1);

  const isDraggingLow = useSharedValue(false);
  const isDraggingHigh = useSharedValue(false);
  const dragStartLow = useSharedValue(0);
  const dragStartHigh = useSharedValue(0);
  const thumbScaleLow = useSharedValue(1);
  const thumbScaleHigh = useSharedValue(1);

  const lastEmittedValue = useSharedValue(
    !isRange ? snapToStep(currentSingle, min, max, step) : min
  );
  const lastEmittedLow = useSharedValue(isRange ? currentPairResolved[0] : min);
  const lastEmittedHigh = useSharedValue(isRange ? currentPairResolved[1] : max);

  useEffect(() => {
    if (isRange || controlledSingle === undefined) return;
    const r = (controlledSingle - min) / (max - min);
    thumbRatio.value = Math.max(0, Math.min(1, r));
    lastEmittedValue.value = snapToStep(controlledSingle, min, max, step);
  }, [isRange, controlledSingle, min, max, step, thumbRatio, lastEmittedValue]);

  useEffect(() => {
    if (!isRange || controlledPair === undefined) return;
    const [lo, hi] = sortPair(
      snapToStep(controlledPair[0], min, max, step),
      snapToStep(controlledPair[1], min, max, step)
    );
    thumbRatioLow.value = (lo - min) / (max - min);
    thumbRatioHigh.value = (hi - min) / (max - min);
    lastEmittedLow.value = lo;
    lastEmittedHigh.value = hi;
  }, [isRange, controlledPair, min, max, step, thumbRatioLow, thumbRatioHigh, lastEmittedLow, lastEmittedHigh]);

  const onTrackLayout = useCallback(
    (size: number) => {
      trackLength.value = size;
    },
    [trackLength]
  );

  const emitChange = useCallback(
    (ratio: number) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      internalValueRef.current = snapped;
      onChangeSingle?.(snapped);
    },
    [min, max, step, onChangeSingle]
  );

  const emitChangeEnd = useCallback(
    (ratio: number) => {
      const raw = ratio * (max - min) + min;
      const snapped = snapToStep(raw, min, max, step);
      onChangeEndSingle?.(snapped);
    },
    [min, max, step, onChangeEndSingle]
  );

  const emitChangePair = useCallback(
    (rLow: number, rHigh: number) => {
      const rawLo = rLow * (max - min) + min;
      const rawHi = rHigh * (max - min) + min;
      const lo = snapToStep(rawLo, min, max, step);
      const hi = snapToStep(rawHi, min, max, step);
      const [a, b] = sortPair(lo, hi);
      internalPairRef.current = [a, b];
      onChangeRange?.([a, b]);
    },
    [min, max, step, onChangeRange]
  );

  const emitChangeEndPair = useCallback(
    (rLow: number, rHigh: number) => {
      const rawLo = rLow * (max - min) + min;
      const rawHi = rHigh * (max - min) + min;
      const lo = snapToStep(rawLo, min, max, step);
      const hi = snapToStep(rawHi, min, max, step);
      const [a, b] = sortPair(lo, hi);
      onChangeEndRange?.([a, b]);
    },
    [min, max, step, onChangeEndRange]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled && !isRange)
        .onStart(() => {
          "worklet";
          isDragging.value = true;
          thumbScale.value = withSpring(1.2, snappySpringConfig);
          dragStartRatio.value = thumbRatio.value;
        })
        .onUpdate((e) => {
          "worklet";
          const len = trackLength.value;
          if (len === 0) return;
          const delta = isVertical ? -e.translationY / len : e.translationX / len;
          const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
          thumbRatio.value = next;

          const raw = next * (max - min) + min;
          const snapped = snapRatioWorklet(raw, min, max, step);

          if (snapped !== lastEmittedValue.value) {
            lastEmittedValue.value = snapped;
            scheduleOnRN(emitChange, next);
          }
        })
        .onEnd(() => {
          "worklet";
          isDragging.value = false;
          thumbScale.value = withSpring(1, snappySpringConfig);

          const raw = thumbRatio.value * (max - min) + min;
          const finalSnapped = snapRatioWorklet(raw, min, max, step);
          const targetRatio = (finalSnapped - min) / (max - min);
          thumbRatio.value = withSpring(targetRatio, snappySpringConfig);

          scheduleOnRN(emitChangeEnd, targetRatio);
        }),
    [
      disabled,
      isRange,
      isVertical,
      max,
      min,
      step,
      snappySpringConfig,
      dragStartRatio,
      isDragging,
      lastEmittedValue,
      thumbRatio,
      thumbScale,
      trackLength,
      emitChange,
      emitChangeEnd,
    ]
  );

  const panGestureLow = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled && isRange)
        .onStart(() => {
          "worklet";
          isDraggingLow.value = true;
          thumbScaleLow.value = withSpring(1.15, snappySpringConfig);
          dragStartLow.value = thumbRatioLow.value;
        })
        .onUpdate((e) => {
          "worklet";
          const len = trackLength.value;
          if (len === 0) return;
          const delta = isVertical ? -e.translationY / len : e.translationX / len;
          const cap = thumbRatioHigh.value - minRatioGap;
          const next = Math.max(0, Math.min(cap, dragStartLow.value + delta));
          thumbRatioLow.value = next;

          const rawLo = next * (max - min) + min;
          const rawHi = thumbRatioHigh.value * (max - min) + min;
          const sLo = snapRatioWorklet(rawLo, min, max, step);
          const sHi = snapRatioWorklet(rawHi, min, max, step);

          if (sLo !== lastEmittedLow.value || sHi !== lastEmittedHigh.value) {
            lastEmittedLow.value = sLo;
            lastEmittedHigh.value = sHi;
            scheduleOnRN(emitChangePair, next, thumbRatioHigh.value);
          }
        })
        .onEnd(() => {
          "worklet";
          isDraggingLow.value = false;
          thumbScaleLow.value = withSpring(1, snappySpringConfig);

          const raw = thumbRatioLow.value * (max - min) + min;
          const snapped = snapRatioWorklet(raw, min, max, step);
          const capVal = thumbRatioHigh.value * (max - min) + min;
          const finalLo = Math.min(snapped, snapRatioWorklet(capVal - step, min, max, step));
          const targetR = (finalLo - min) / (max - min);
          thumbRatioLow.value = withSpring(targetR, snappySpringConfig);

          scheduleOnRN(emitChangeEndPair, targetR, thumbRatioHigh.value);
        }),
    [
      disabled,
      isRange,
      isVertical,
      max,
      min,
      minRatioGap,
      step,
      snappySpringConfig,
      dragStartLow,
      isDraggingLow,
      lastEmittedHigh,
      lastEmittedLow,
      thumbRatioHigh,
      thumbRatioLow,
      thumbScaleLow,
      trackLength,
      emitChangeEndPair,
      emitChangePair,
    ]
  );

  const panGestureHigh = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled && isRange)
        .onStart(() => {
          "worklet";
          isDraggingHigh.value = true;
          thumbScaleHigh.value = withSpring(1.15, snappySpringConfig);
          dragStartHigh.value = thumbRatioHigh.value;
        })
        .onUpdate((e) => {
          "worklet";
          const len = trackLength.value;
          if (len === 0) return;
          const delta = isVertical ? -e.translationY / len : e.translationX / len;
          const floor = thumbRatioLow.value + minRatioGap;
          const next = Math.max(floor, Math.min(1, dragStartHigh.value + delta));
          thumbRatioHigh.value = next;

          const rawLo = thumbRatioLow.value * (max - min) + min;
          const rawHi = next * (max - min) + min;
          const sLo = snapRatioWorklet(rawLo, min, max, step);
          const sHi = snapRatioWorklet(rawHi, min, max, step);

          if (sLo !== lastEmittedLow.value || sHi !== lastEmittedHigh.value) {
            lastEmittedLow.value = sLo;
            lastEmittedHigh.value = sHi;
            scheduleOnRN(emitChangePair, thumbRatioLow.value, next);
          }
        })
        .onEnd(() => {
          "worklet";
          isDraggingHigh.value = false;
          thumbScaleHigh.value = withSpring(1, snappySpringConfig);

          const raw = thumbRatioHigh.value * (max - min) + min;
          const snapped = snapRatioWorklet(raw, min, max, step);
          const floorVal = thumbRatioLow.value * (max - min) + min;
          const finalHi = Math.max(snapped, snapRatioWorklet(floorVal + step, min, max, step));
          const targetR = (finalHi - min) / (max - min);
          thumbRatioHigh.value = withSpring(targetR, snappySpringConfig);

          scheduleOnRN(emitChangeEndPair, thumbRatioLow.value, targetR);
        }),
    [
      disabled,
      isRange,
      isVertical,
      max,
      min,
      minRatioGap,
      step,
      snappySpringConfig,
      dragStartHigh,
      isDraggingHigh,
      lastEmittedHigh,
      lastEmittedLow,
      thumbRatioHigh,
      thumbRatioLow,
      thumbScaleHigh,
      trackLength,
      emitChangeEndPair,
      emitChangePair,
    ]
  );

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const len = trackLength.value;
    const ratio = thumbRatio.value;
    const scale = thumbScale.value;
    if (isVertical) {
      return { transform: [{ translateY: (1 - ratio) * len }, { scale }] as any };
    }
    return { transform: [{ translateX: ratio * len }, { scale }] as any };
  });

  const thumbLowAnimatedStyle = useAnimatedStyle(() => {
    const len = trackLength.value;
    const r = thumbRatioLow.value;
    const sc = thumbScaleLow.value;
    if (isVertical) {
      return { transform: [{ translateY: (1 - r) * len }, { scale: sc }] as any };
    }
    return { transform: [{ translateX: r * len }, { scale: sc }] as any };
  });

  const thumbHighAnimatedStyle = useAnimatedStyle(() => {
    const len = trackLength.value;
    const r = thumbRatioHigh.value;
    const sc = thumbScaleHigh.value;
    if (isVertical) {
      return { transform: [{ translateY: (1 - r) * len }, { scale: sc }] as any };
    }
    return { transform: [{ translateX: r * len }, { scale: sc }] as any };
  });

  const fillAnimatedStyleSingle = useAnimatedStyle(() => {
    const ratio = thumbRatio.value;
    if (isVertical) {
      return {
        position: "absolute" as const,
        left: 0,
        right: 0,
        bottom: 0,
        height: `${ratio * 100}%`,
      };
    }
    return { width: `${ratio * 100}%` };
  });

  const fillAnimatedStyleRange = useAnimatedStyle(() => {
    const lo = thumbRatioLow.value;
    const hi = thumbRatioHigh.value;
    if (isVertical) {
      return {
        position: "absolute" as const,
        left: 0,
        right: 0,
        bottom: `${lo * 100}%`,
        height: `${(hi - lo) * 100}%`,
      };
    }
    return {
      position: "absolute" as const,
      left: `${lo * 100}%`,
      width: `${(hi - lo) * 100}%`,
      top: 0,
      bottom: 0,
    };
  });

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.4 : 1,
  }));

  if (isRange) {
    return {
      mode: "range",
      currentValue: currentPairResolved,
      thumbLowAnimatedStyle,
      thumbHighAnimatedStyle,
      fillAnimatedStyle: fillAnimatedStyleRange,
      trackAnimatedStyle,
      panGestureLow,
      panGestureHigh,
      onTrackLayout,
      percentage: [
        (currentPairResolved[0] - min) / (max - min),
        (currentPairResolved[1] - min) / (max - min),
      ],
      orientation,
    };
  }

  return {
    mode: "single",
    currentValue: currentSingle,
    thumbAnimatedStyle,
    fillAnimatedStyle: fillAnimatedStyleSingle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage: (currentSingle - min) / (max - min),
    orientation,
  };
}
