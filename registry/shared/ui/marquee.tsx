import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface MarqueeProps extends ViewProps {
  /** Pixels per second. */
  speed?: number;
  /** Content width in px — measure it once and pass it for a seamless loop. */
  contentWidth?: number;
  className?: string;
  children?: ReactNode;
}

export function Marquee({
  speed = 40,
  contentWidth = 600,
  className,
  children,
  ...props
}: MarqueeProps) {
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = (contentWidth / speed) * 1000;
    const loop = Animated.loop(
      Animated.timing(x, {
        toValue: -contentWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [contentWidth, speed, x]);

  return (
    <View className={cn('w-full overflow-hidden', className)} {...props}>
      <Animated.View
        style={{ flexDirection: 'row', transform: [{ translateX: x }] }}
      >
        <View style={{ width: contentWidth }}>{children}</View>
        <View style={{ width: contentWidth }}>{children}</View>
      </Animated.View>
    </View>
  );
}
