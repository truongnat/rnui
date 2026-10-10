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
  const containerRef = useRef<View>(null);
  const trackWidthRef = useRef(0);
  trackWidthRef.current = trackWidth;

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
      // Capture touch immediately on start to prevent parent ScrollView / iOS swipe from canceling
      onStartShouldSetPanResponder: () => !disabledRef.current,
      onStartShouldSetPanResponderCapture: () => !disabledRef.current,

      onMoveShouldSetPanResponder: (_, gestureState) =>
        !disabledRef.current &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        !disabledRef.current &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

      onPanResponderGrant: (e) => {
        if (disabledRef.current) return;
        startValueRef.current = latestValueRef.current;
        onSlidingStart?.(latestValueRef.current);
      },

      onPanResponderMove: (_, gestureState) => {
        if (disabledRef.current || trackWidthRef.current <= 0) return;
        const deltaValue =
          (gestureState.dx / trackWidthRef.current) * (max - min);
        const nextValue = snap(clamp(startValueRef.current + deltaValue));
        commitValue(nextValue);
      },

      // Crucial: lock touch responder so parent ScrollView / iOS back gesture cannot steal it
      onPanResponderTerminationRequest: () => false,

      onPanResponderRelease: (e, gestureState) => {
        if (disabledRef.current) return;

        // If it was a quick tap with minimal drag (dx < 3), calculate tap target position
        if (
          Math.abs(gestureState.dx) < 3 &&
          trackWidthRef.current > 0 &&
          containerRef.current
        ) {
          containerRef.current.measure((_x, _y, w, _h, pageX) => {
            const tapX = e.nativeEvent.pageX - pageX;
            const ratio = Math.min(1, Math.max(0, tapX / w));
            const tapValue = snap(min + ratio * (max - min));
            commitValue(tapValue);
            onSlidingComplete?.(tapValue);
          });
        } else {
          onSlidingComplete?.(latestValueRef.current);
        }
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
      ref={containerRef}
      accessibilityRole="adjustable"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityValue={{ min, max, now: clamp(current) }}
      className={cn(
        'w-full justify-center',
        disabled && 'opacity-50',
        className
      )}
      style={[styles.container, style]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        setTrackWidth(w);
        trackWidthRef.current = w;
      }}
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
    height: 38,
    justifyContent: 'center',
  },
});
