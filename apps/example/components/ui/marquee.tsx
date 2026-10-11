import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Easing,
  ScrollView,
  View,
  type ViewProps,
} from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { cn } from '@/lib/utils';

export interface MarqueeProps extends ViewProps {
  /** Pixels per second. */
  speed?: number;
  className?: string;
  children?: ReactNode;
}

/** Seamless horizontal marquee — measures its content and loops two copies. */
export function Marquee({
  speed = 40,
  className,
  children,
  onLayout,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...props
}: MarqueeProps) {
  const x = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const initialReducedMotion = useReducedMotion();
  const [reducedMotion, setReducedMotion] = useState(initialReducedMotion);
  const [screenReader, setScreenReader] = useState(false);
  const [active, setActive] = useState(AppState.currentState === 'active');
  const [touching, setTouching] = useState(false);
  const staticContent = reducedMotion || screenReader;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (mounted) setScreenReader(enabled);
    });
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReducedMotion(enabled);
    });
    const motionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion
    );
    const readerSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReader
    );
    const appSubscription = AppState.addEventListener('change', (state) =>
      setActive(state === 'active')
    );
    return () => {
      mounted = false;
      motionSubscription.remove();
      readerSubscription.remove();
      appSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (contentWidth <= 0 || speed <= 0 || staticContent || !active || touching)
      return;
    let cancelled = false;
    const animate = (start: number) => {
      if (cancelled) return;
      x.setValue(start);
      Animated.timing(x, {
        toValue: -contentWidth,
        duration: ((contentWidth + start) / speed) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }).start(({ finished }) => {
        if (finished && !cancelled) animate(0);
      });
    };
    x.stopAnimation((value) => animate(value % contentWidth));
    return () => {
      cancelled = true;
      x.stopAnimation();
    };
  }, [active, contentWidth, speed, staticContent, touching, x]);

  const copies =
    contentWidth > 0
      ? Math.max(2, Math.ceil(containerWidth / contentWidth) + 1)
      : 1;
  const duplicateIds = useMemo(
    () =>
      Array.from(
        { length: copies - 1 },
        (_, position) => `copy-${position + 1}`
      ),
    [copies]
  );

  return (
    <View
      className={cn('w-full overflow-hidden', className)}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
        onLayout?.(event);
      }}
      onTouchStart={(event) => {
        setTouching(true);
        onTouchStart?.(event);
      }}
      onTouchEnd={(event) => {
        setTouching(false);
        onTouchEnd?.(event);
      }}
      onTouchCancel={(event) => {
        setTouching(false);
        onTouchCancel?.(event);
      }}
      {...props}
    >
      {staticContent ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <Animated.View
          style={{ flexDirection: 'row', transform: [{ translateX: x }] }}
        >
          <View
            style={{ flexShrink: 0 }}
            onLayout={(event) =>
              setContentWidth(event.nativeEvent.layout.width)
            }
          >
            {children}
          </View>
          {duplicateIds.map((id) => (
            <View
              key={id}
              style={{ flexShrink: 0 }}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              pointerEvents="none"
            >
              {children}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}
