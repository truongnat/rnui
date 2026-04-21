import { useCarousel, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

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
  const contentPaddingStart = (windowWidth - resolvedItemWidth) / 2;

  // Automatically disable loop if we only have 1 item.
  const isLoop = loop && data.length > 1;

  const {
    components: { carousel },
  } = useTheme();
  const {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    itemStep,
    n,
    contentPaddingStart: snapPad,
  } = useCarousel({
    data,
    itemWidth: resolvedItemWidth,
    gap,
    contentPaddingStart,
    loop: isLoop,
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
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: contentPaddingStart,
          gap,
        }}
      >
        {displayData.map((item: T, index: number) => {
          return (
            <View
              key={getSlideKey(item, index, isLoop, n, keyExtractor)}
              style={{ width: resolvedItemWidth, height }}
            >
              {renderItem(item, isLoop ? (index - 1 + n) % n : index)}
            </View>
          );
        })}
      </ScrollView>

      {showPagination && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
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
                contentPaddingStart={snapPad}
                isLoop={isLoop}
                n={n}
                dot={carousel.dot}
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
  contentPaddingStart,
  isLoop,
  n,
  dot,
}: {
  index: number;
  scrollX: SharedValue<number>;
  itemStep: number;
  contentPaddingStart: number;
  isLoop: boolean;
  n: number;
  dot: any;
}) {
  const dotStyle = useAnimatedStyle(() => {
    let activeIndex = (scrollX.value - contentPaddingStart) / itemStep;
    if (isLoop) {
      activeIndex = activeIndex - 1;
      if (activeIndex < 0) activeIndex = n - 1;
      if (activeIndex >= n) activeIndex = 0;
    }

    const opacity = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.opacity, 1, dot.inactive.opacity],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      activeIndex,
      [index - 1, index, index + 1],
      [dot.inactive.width, dot.active.width, dot.inactive.width],
      Extrapolation.CLAMP
    );

    return {
      width,
      opacity,
      backgroundColor: dot.active.bg,
      height: dot.height,
      borderRadius: dot.borderRadius,
    };
  });

  return <Animated.View style={dotStyle} />;
}
