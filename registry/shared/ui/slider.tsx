import { useRef, useState } from 'react';
import { PanResponder, View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface SliderProps extends ViewProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

/** PanResponder-based slider — no gesture-handler dependency. */
export function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled,
  className,
  trackClassName,
  thumbClassName,
  ...props
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const trackRef = useRef<View>(null);
  const trackX = useRef(0);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snapped = (v: number) => Math.round(v / step) * step;
  const pct = width > 0 ? ((clamp(value) - min) / (max - min)) * 100 : 0;

  const update = (pageX: number) => {
    if (width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (pageX - trackX.current) / width));
    onValueChange?.(snapped(min + ratio * (max - min)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e) => {
        trackRef.current?.measureInWindow((x) => {
          trackX.current = x;
          update(e.nativeEvent.pageX);
        });
      },
      onPanResponderMove: (e) => update(e.nativeEvent.pageX),
    })
  ).current;

  return (
    <View
      ref={trackRef}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: clamp(value) }}
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
          'h-1.5 w-full overflow-hidden rounded-full bg-secondary',
          trackClassName
        )}
      >
        <View className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </View>
      <View
        className={cn(
          'absolute h-5 w-5 rounded-full border border-primary/50 bg-background shadow',
          thumbClassName
        )}
        style={{ left: `${pct}%`, marginLeft: -10 }}
      />
    </View>
  );
}
