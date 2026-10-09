import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, View, type ViewProps } from 'react-native';
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
  ...props
}: MarqueeProps) {
  const x = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (contentWidth <= 0) return;
    x.setValue(0);
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
        <View
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w > 0 && w !== contentWidth) setContentWidth(w);
          }}
        >
          {children}
        </View>
        {contentWidth > 0 && <View>{children}</View>}
      </Animated.View>
    </View>
  );
}
