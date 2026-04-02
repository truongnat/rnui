import React from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useCarousel, useComponentTokens } from "@truongdq01/headless";

function defaultKeyExtractor<T>(_item: T, index: number): string {
  return `carousel-${index}`;
}

/** Stable React keys for slides; loop clones get `-loop-prev` / `-loop-next` suffixes. */
function getSlideKey<T>(
  item: T,
  indexInDisplay: number,
  loop: boolean,
  n: number,
  keyExtractor: (item: T, index: number) => string
): string {
  if (!loop || n < 2) {
    return keyExtractor(item, indexInDisplay);
  }
  if (indexInDisplay === 0) {
    return `${keyExtractor(item, n - 1)}-loop-prev`;
  }
  if (indexInDisplay === n + 1) {
    return `${keyExtractor(item, 0)}-loop-next`;
  }
  return keyExtractor(item, indexInDisplay - 1);
}

export interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  height?: number;
  showPagination?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  /** Stable key per data item; loop mode appends `-loop-prev` / `-loop-next` for edge clones. */
  keyExtractor?: (item: T, index: number) => string;
}

export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  gap = 0,
  height = 200,
  showPagination = true,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  keyExtractor = defaultKeyExtractor,
}: CarouselProps<T>) {
  const { width: windowWidthPx } = useWindowDimensions();
  const windowWidth = Math.max(1, windowWidthPx > 0 ? windowWidthPx : 375);
  const resolvedItemWidth = itemWidth ?? windowWidth;

  const { carousel } = useComponentTokens();
  const {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    itemStep,
    n,
  } = useCarousel({
    data,
    itemWidth: resolvedItemWidth,
    gap,
    loop,
    autoPlay,
    autoPlayInterval,
  });

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={{ height }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - resolvedItemWidth) / 2,
          gap,
        }}
      >
        {displayData.map((item: T, index: number) => {
          return (
            <View
              key={getSlideKey(item, index, loop, n, keyExtractor)}
              style={{ width: resolvedItemWidth, height }}
            >
              {renderItem(item, loop ? (index - 1 + n) % n : index)}
            </View>
          );
        })}
      </ScrollView>

      {showPagination && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: carousel.pagination.marginTop,
            gap: carousel.pagination.gap,
          }}
        >
          {data.map((_, i) => {
            return (
              <PaginationDot
                key={i}
                index={i}
                scrollX={scrollX}
                itemStep={itemStep}
                isLoop={loop}
                n={n}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

function PaginationDot({
  index,
  scrollX,
  itemStep,
  isLoop,
  n,
}: {
  index: number;
  scrollX: SharedValue<number>;
  itemStep: number;
  isLoop: boolean;
  n: number;
}) {
  const { carousel } = useComponentTokens();
  const dotStyle = useAnimatedStyle(() => {
    let activeIndex = scrollX.value / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }

    const opacity = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.opacity, 1, carousel.dot.inactive.opacity],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [carousel.dot.inactive.width, carousel.dot.active.width, carousel.dot.inactive.width],
      Extrapolation.CLAMP
    );

    return {
      width,
      opacity,
      backgroundColor: carousel.dot.active.bg,
      height: carousel.dot.height,
      borderRadius: carousel.dot.borderRadius,
    };
  });

  return <Animated.View style={dotStyle} />;
}
