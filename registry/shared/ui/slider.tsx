import { useContext, useRef, useState } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface SliderProps extends ViewProps {
  /** Controlled value. Omit and use `defaultValue` for uncontrolled. */
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  /** Mirrors shadcn `aria-invalid` — destructive tint. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

/** PanResponder-based slider with termination protection against parent scroll/navigation gestures. */
export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  disabled = false,
  invalid,
  className,
  trackClassName,
  thumbClassName,
  style,
  ...props
}: SliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  const current = value ?? innerValue;
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => {
    const stepped = Math.round((v - min) / step) * step + min;
    return Math.min(max, Math.max(min, stepped));
  };

  const pct =
    trackWidth > 0
      ? ((clamp(current) - min) / (max - min)) * 100
      : 0;

  const latestValueRef = useRef(current);
  latestValueRef.current = current;

  const startValueRef = useRef(current);
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  const commitValue = (val: number) => {
    const clamped = snap(clamp(val));
    if (value === undefined) {
      setInnerValue(clamped);
    }
    onValueChange?.(clamped);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabledRef.current,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        !disabledRef.current &&
        (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2),
      onMoveShouldSetPanResponderCapture: () => false,

      onPanResponderGrant: (e) => {
        if (disabledRef.current) return;
        const startVal = latestValueRef.current;
        startValueRef.current = startVal;
        onSlidingStart?.(startVal);

        // If user tapped directly on track, move thumb to tap position immediately
        const touchX = e.nativeEvent.locationX;
        if (trackWidth > 0 && touchX !== undefined) {
          const ratio = Math.min(1, Math.max(0, touchX / trackWidth));
          const tapValue = snap(min + ratio * (max - min));
          startValueRef.current = tapValue;
          commitValue(tapValue);
        }
      },

      onPanResponderMove: (_, gestureState) => {
        if (disabledRef.current || trackWidth <= 0) return;
        const deltaValue =
          (gestureState.dx / trackWidth) * (max - min);
        const nextValue = snap(clamp(startValueRef.current + deltaValue));
        commitValue(nextValue);
      },

      // Crucial: prevent parent ScrollView or iOS edge swipe from stealing gesture
      onPanResponderTerminationRequest: () => false,

      onPanResponderRelease: () => {
        onSlidingComplete?.(latestValueRef.current);
      },
      onPanResponderTerminate: () => {
        onSlidingComplete?.(latestValueRef.current);
      },
    })
  ).current;

  const activeColor = isInvalid
    ? colors.destructive
    : colors.primary;

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityValue={{ min, max, now: clamp(current) }}
      className={cn(
        'w-full justify-center',
        disabled && 'opacity-50',
        className
      )}
      style={[styles.container, style]}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
      {...props}
    >
      {/* Background Track */}
      <View
        className={cn('h-1.5 w-full rounded-full', trackClassName)}
        style={{ backgroundColor: colors.muted }}
      >
        {/* Active Filled Range */}
        <View
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: activeColor,
          }}
        />
      </View>

      {/* Draggable Thumb */}
      <View
        className={cn(
          'absolute h-5 w-5 rounded-full border shadow-sm',
          thumbClassName
        )}
        style={{
          left: `${pct}%`,
          marginLeft: -10,
          backgroundColor: colors.background,
          borderColor: activeColor,
          borderWidth: 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    justifyContent: 'center',
  },
});
