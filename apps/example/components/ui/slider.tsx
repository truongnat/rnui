import { useContext, useRef, useState } from 'react';
import { PanResponder, View, type ViewProps } from 'react-native';
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

/** PanResponder-based slider — no gesture-handler dependency. */
export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  disabled,
  invalid,
  className,
  trackClassName,
  thumbClassName,
  ...props
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const [inner, setInner] = useState(defaultValue);
  const trackRef = useRef<View>(null);
  const trackX = useRef(0);
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  const current = value ?? inner;
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snapped = (v: number) => Math.round(v / step) * step;
  const pct = width > 0 ? ((clamp(current) - min) / (max - min)) * 100 : 0;

  const commit = (v: number) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
  };

  const update = (pageX: number) => {
    if (width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (pageX - trackX.current) / width));
    commit(snapped(min + ratio * (max - min)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e) => {
        trackRef.current?.measureInWindow((x) => {
          trackX.current = x;
          onSlidingStart?.(current);
          update(e.nativeEvent.pageX);
        });
      },
      onPanResponderMove: (e) => update(e.nativeEvent.pageX),
      onPanResponderRelease: () => onSlidingComplete?.(value ?? inner),
    })
  ).current;

  return (
    <View
      ref={trackRef}
      accessibilityRole="adjustable"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityValue={{ min, max, now: clamp(current) }}
      className={cn(
        'h-6 w-full justify-center',
        disabled && 'opacity-50',
        className
      )}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      {...pan.panHandlers}
      {...props}
    >
      <View
        className={cn(
          'h-1.5 w-full overflow-hidden rounded-full bg-muted',
          trackClassName
        )}
      >
        <View
          className="h-full"
          style={{
            width: `${pct}%`,
            backgroundColor: isInvalid ? colors.destructive : colors.primary,
          }}
        />
      </View>
      <View
        className={cn(
          'absolute h-5 w-5 rounded-full border bg-background shadow',
          thumbClassName
        )}
        style={{
          left: `${pct}%`,
          marginLeft: -10,
          borderColor: isInvalid ? colors.destructive : colors.primary,
          borderCurve: 'continuous',
        }}
      />
    </View>
  );
}
