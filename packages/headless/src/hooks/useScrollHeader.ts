import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export interface UseScrollHeaderOptions {
  /** Maximum height of the header when fully expanded */
  headerMaxHeight: number;
  /** Minimum height of the header when fully collapsed (usually navbar height like 60 or insets.top + 44) */
  headerMinHeight: number;
}

export function useScrollHeader({
  headerMaxHeight,
  headerMinHeight,
}: UseScrollHeaderOptions) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const scrollDistance = headerMaxHeight - headerMinHeight;

  // Header container style (collapses from max to min)
  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, scrollDistance],
      [headerMaxHeight, headerMinHeight],
      Extrapolation.CLAMP
    );
    return { height };
  });

  // Image parallax effect (moves up slightly slower than the scroll, and scales up when pulling down)
  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-headerMaxHeight, 0, scrollDistance],
      [-headerMaxHeight / 2, 0, scrollDistance * 0.5], // Moves at half speed relative to scroll
      Extrapolation.CLAMP
    );
    const scale = interpolate(scrollY.value, [-headerMaxHeight, 0], [2, 1], {
      extrapolateLeft: Extrapolation.EXTEND,
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [{ translateY }, { scale }] as any,
    };
  });

  // Header Title style (fades in as header collapses)
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance * 0.9],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [scrollDistance * 0.6, scrollDistance],
      [10, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // Useful for blending backgrounds or top navigation color
  const headerBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, scrollDistance],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return {
    scrollY,
    scrollHandler,
    headerStyle,
    imageStyle,
    titleStyle,
    headerBgStyle,
  };
}
