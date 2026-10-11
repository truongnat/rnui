import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  Pressable,
  type ViewProps,
} from 'react-native';
import Reanimated, {
  FadeIn,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/**
 * Positioned inside its parent, not portaled to the window. The host owns safe
 * bounds; place screen-edge snackbars inside a margin-mode SafeAreaView so
 * custom top/left/right anchors and embedded placements share those bounds.
 */
export interface SnackbarProps extends ViewProps {
  open: boolean;
  onDismiss?: () => void;
  /** Auto-dismiss after ms — 0 disables. */
  duration?: number;
  /** Trailing action — e.g. <SnackbarAction label="Undo" onPress={...}/>. */
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Snackbar({
  open,
  onDismiss,
  duration = 4000,
  action,
  className,
  children,
  style,
  ...props
}: SnackbarProps) {
  const [present, setPresent] = useState(open);
  const progress = useRef(new Animated.Value(0)).current;
  const reducedMotion = useReducedMotion();
  const dismiss = useRef(onDismiss);
  useEffect(() => {
    dismiss.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (open && typeof children === 'string' && Platform.OS === 'ios')
      AccessibilityInfo.announceForAccessibility(children);
  }, [open, children]);

  useEffect(() => {
    if (
      !open ||
      children == null ||
      duration <= 0 ||
      !Number.isFinite(duration)
    )
      return;
    const timer = setTimeout(() => dismiss.current?.(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, children]);

  useEffect(() => {
    if (open) setPresent(true);
    const animation = Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: reducedMotion ? 0 : open ? 220 : 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && !open) setPresent(false);
    });
    return () => animation.stop();
  }, [open, progress, reducedMotion]);

  if (!present && !open) return null;

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityElementsHidden={!open}
      importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
      onAccessibilityEscape={() => dismiss.current?.()}
      pointerEvents={open ? 'auto' : 'none'}
      className={cn(
        'absolute bottom-6 left-4 right-4 flex-row flex-wrap items-center gap-3 rounded-xl bg-foreground px-4 py-3',
        className
      )}
      style={[
        {
          borderCurve: 'continuous',
          opacity: progress,
          transform: [
            {
              translateY: reducedMotion
                ? 0
                : progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
            },
          ],
        },
        style,
      ]}
      {...props}
    >
      <Reanimated.View
        key={typeof children === 'string' ? children : 'content'}
        entering={FadeIn.duration(150).reduceMotion(ReduceMotion.System)}
        className="flex-1 min-w-0"
      >
        {typeof children === 'string' ? (
          <Text className="text-sm leading-5 text-background">{children}</Text>
        ) : (
          children
        )}
      </Reanimated.View>
      {action}
    </Animated.View>
  );
}

export function SnackbarAction({
  label,
  onPress,
  className,
}: {
  label: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={cn(
        'min-h-11 min-w-11 items-center justify-center rounded-md px-3 active:opacity-60',
        className
      )}
    >
      <Text className="text-sm font-semibold text-background">{label}</Text>
    </Pressable>
  );
}
