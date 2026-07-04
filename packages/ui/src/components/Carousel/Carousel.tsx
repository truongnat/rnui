import { useCarousel, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';
import { Icon } from '../Icon';

function defaultKeyExtractor<T>(_item: T, index: number): string {
  return `carousel-${index}`;
}

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

function getActiveIndex(
  x: number,
  itemStep: number,
  isLoop: boolean,
  n: number
): number {
  if (n <= 0 || itemStep <= 0) return 0;

  let displayIndex = Math.round(x / itemStep);
  if (isLoop) {
    displayIndex -= 1;
    if (displayIndex < 0) displayIndex = n - 1;
    if (displayIndex >= n) displayIndex = 0;
  }

  return Math.max(0, Math.min(n - 1, displayIndex));
}

type ScrollEdgeState = {
  atStart: boolean;
  atEnd: boolean;
  hasOverflow: boolean;
};

function getScrollEdges(
  contentOffsetX: number,
  contentWidth: number,
  viewportWidth: number
): ScrollEdgeState {
  const maxScrollX = Math.max(0, contentWidth - viewportWidth);
  const threshold = 2;

  return {
    atStart: contentOffsetX <= threshold,
    atEnd: contentOffsetX >= maxScrollX - threshold,
    hasOverflow: maxScrollX > threshold,
  };
}

export interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  height?: number;
  /**
   * Size the carousel to its tallest slide instead of a fixed `height`.
   * Use for text-heavy cards where descriptions vary in length. When enabled,
   * slides must not rely on percentage heights (e.g. images need pixel heights).
   */
  autoHeight?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  fadeEdges?: boolean;
  /** Color the edge fades blend into. Defaults to the theme surface color. */
  edgeColor?: string;
  snap?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onIndexChange?: (index: number) => void;
  keyExtractor?: (item: T, index: number) => string;
}

const NAV_BUTTON_SIZE = 40;

export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  gap = 0,
  height = 200,
  autoHeight = false,
  accessibilityLabel,
  accessibilityHint,
  showPagination = true,
  showNavigation = true,
  fadeEdges = true,
  edgeColor,
  snap = true,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  onIndexChange,
  keyExtractor = defaultKeyExtractor,
}: CarouselProps<T>) {
  const { width: windowWidthPx } = useWindowDimensions();
  const { tokens, components } = useTheme();
  const windowWidth = Math.max(
    1,
    typeof windowWidthPx === 'number' && windowWidthPx > 0 ? windowWidthPx : 375
  );
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const effectiveViewport = viewportWidth ?? windowWidth;
  const resolvedItemWidth = Math.max(1, itemWidth ?? effectiveViewport);
  // Full-bleed = each slide fills the viewport (paged hero). Peek/rail = narrower slides.
  const isFullBleed = resolvedItemWidth >= effectiveViewport - 1;
  const edgeInset =
    snap && !isFullBleed
      ? Math.max(0, (effectiveViewport - resolvedItemWidth) / 2)
      : 0;
  const isLoop = loop && data.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Auto height: measure each slide's natural content and size the viewport to
  // the tallest one so every slide stays uniform (no per-slide height jumps).
  const slideHeightsRef = useRef<Record<number, number>>({});
  const [contentHeight, setContentHeight] = useState(0);
  const handleSlideLayout = useCallback(
    (index: number, measuredHeight: number) => {
      if (!autoHeight) return;
      const rounded = Math.ceil(measuredHeight);
      if (slideHeightsRef.current[index] === rounded) return;
      slideHeightsRef.current[index] = rounded;
      const max = Math.max(0, ...Object.values(slideHeightsRef.current));
      setContentHeight((prev) => (prev === max ? prev : max));
    },
    [autoHeight]
  );
  const [scrollEdges, setScrollEdges] = useState<ScrollEdgeState>({
    atStart: true,
    atEnd: false,
    hasOverflow: data.length > 1,
  });
  const {
    scrollViewRef,
    displayData,
    snapToOffsets,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    goToNextSlide,
    goToPreviousSlide,
    scrollToSlide,
    itemStep,
    n,
  } = useCarousel({
    data,
    itemWidth: resolvedItemWidth,
    gap,
    contentPaddingStart: edgeInset,
    loop: isLoop,
    autoPlay,
    autoPlayInterval,
  });

  // Re-anchor to the current slide whenever measured layout changes.
  // `scrollToSlide` changes identity when itemStep/loop/n change, so it covers
  // resize, gap, and item-width updates without extra dependencies.
  useEffect(() => {
    if (viewportWidth == null || n < 1) return;
    scrollToSlide(activeIndexRef.current, false);
  }, [viewportWidth, n, scrollToSlide]);

  // Reset cached slide heights so auto height re-measures when the data set or
  // slide dimensions change (prevents pinning to a stale tallest slide).
  // Render-time reset is the documented React pattern for reacting to changed
  // props without an effect.
  const layoutSignature = `${autoHeight}:${n}:${resolvedItemWidth}:${gap}`;
  const layoutSignatureRef = useRef(layoutSignature);
  if (layoutSignatureRef.current !== layoutSignature) {
    layoutSignatureRef.current = layoutSignature;
    slideHeightsRef.current = {};
    if (contentHeight !== 0) setContentHeight(0);
  }

  if (
    typeof __DEV__ !== 'undefined' &&
    __DEV__ &&
    !accessibilityLabel &&
    data.length > 0
  ) {
    console.warn(
      '[Carousel] Provide accessibilityLabel describing the slide content, e.g. "Featured products".'
    );
  }

  const handleViewportLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setViewportWidth((prev) => (prev === width ? prev : width));
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll(event);
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const nextIndex = getActiveIndex(contentOffset.x, itemStep, isLoop, n);
      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      setScrollEdges((prev) => {
        const next = getScrollEdges(
          contentOffset.x,
          contentSize.width,
          layoutMeasurement.width
        );
        if (
          prev.atStart === next.atStart &&
          prev.atEnd === next.atEnd &&
          prev.hasOverflow === next.hasOverflow
        ) {
          return prev;
        }
        return next;
      });
    },
    [isLoop, itemStep, n, onScroll]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onMomentumScrollEnd(event);
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const nextIndex = getActiveIndex(contentOffset.x, itemStep, isLoop, n);
      setActiveIndex(nextIndex);
      setScrollEdges(
        getScrollEdges(
          contentOffset.x,
          contentSize.width,
          layoutMeasurement.width
        )
      );
      onIndexChange?.(nextIndex);
    },
    [isLoop, itemStep, n, onIndexChange, onMomentumScrollEnd]
  );

  const handleDotPress = useCallback(
    (index: number) => {
      scrollToSlide(index, true);
      setActiveIndex(index);
      onIndexChange?.(index);
    },
    [onIndexChange, scrollToSlide]
  );

  if (data.length === 0) {
    return null;
  }

  const carousel = components.carousel;
  const resolvedEdgeColor = edgeColor ?? tokens.color.surface.default;
  const fadeWidth = tokens.spacing[8];
  // Fade only makes sense for peek/rail modes — a full-bleed hero would just
  // darken the photo edges. Chrome (fade + nav) mirrors real scroll position.
  const canShowChrome = !isLoop && scrollEdges.hasOverflow;
  const showStartChrome =
    canShowChrome && (snap ? activeIndex > 0 : !scrollEdges.atStart);
  const showEndChrome =
    canShowChrome && (snap ? activeIndex < n - 1 : !scrollEdges.atEnd);
  const showFade = fadeEdges && !isFullBleed;

  return (
    <View
      accessible={accessibilityLabel != null}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <View
        style={
          autoHeight
            ? {
                height: contentHeight > 0 ? contentHeight : undefined,
                overflow: 'hidden',
              }
            : { height, overflow: 'hidden' }
        }
        onLayout={handleViewportLayout}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          disableIntervalMomentum={snap}
          snapToOffsets={snap ? snapToOffsets : undefined}
          onScroll={handleScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          contentContainerStyle={{
            paddingHorizontal: edgeInset,
            gap,
          }}
        >
          {displayData.map((item: T, index: number) => {
            const dataIndex = isLoop ? (index - 1 + n) % n : index;
            if (autoHeight) {
              return (
                <View
                  key={getSlideKey(item, index, isLoop, n, keyExtractor)}
                  style={{
                    width: resolvedItemWidth,
                    minHeight: contentHeight > 0 ? contentHeight : undefined,
                  }}
                >
                  <View
                    style={styles.autoSlideContent}
                    onLayout={(event) =>
                      handleSlideLayout(index, event.nativeEvent.layout.height)
                    }
                  >
                    {renderItem(item, dataIndex)}
                  </View>
                </View>
              );
            }
            return (
              <View
                key={getSlideKey(item, index, isLoop, n, keyExtractor)}
                style={{ width: resolvedItemWidth, height, overflow: 'hidden' }}
              >
                {renderItem(item, dataIndex)}
              </View>
            );
          })}
        </ScrollView>

        {showFade ? (
          <>
            <View
              pointerEvents="none"
              style={[
                styles.fadeLeft,
                {
                  width: fadeWidth,
                  opacity: showStartChrome ? 1 : 0,
                  experimental_backgroundImage: `linear-gradient(to right, ${resolvedEdgeColor}, rgba(0, 0, 0, 0))`,
                },
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.fadeRight,
                {
                  width: fadeWidth,
                  opacity: showEndChrome ? 1 : 0,
                  experimental_backgroundImage: `linear-gradient(to left, ${resolvedEdgeColor}, rgba(0, 0, 0, 0))`,
                },
              ]}
            />
          </>
        ) : null}

        {showNavigation && data.length > 1 ? (
          <>
            <View
              pointerEvents={showStartChrome ? 'box-none' : 'none'}
              style={[
                styles.navSide,
                styles.navLeft,
                {
                  paddingLeft: tokens.spacing[2],
                  opacity: showStartChrome ? 1 : 0,
                },
              ]}
            >
              <Pressable
                onPress={goToPreviousSlide}
                disabled={!showStartChrome}
                accessibilityRole="button"
                accessibilityLabel="Previous slide"
                accessibilityState={{ disabled: !showStartChrome }}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.navButton,
                  tokens.shadow.md,
                  {
                    backgroundColor: tokens.color.surface.default,
                    borderRadius: tokens.radius.full,
                    opacity: pressed ? tokens.opacity[80] : 1,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <Icon
                  name="chevronLeft"
                  size={20}
                  color={tokens.color.text.primary}
                />
              </Pressable>
            </View>
            <View
              pointerEvents={showEndChrome ? 'box-none' : 'none'}
              style={[
                styles.navSide,
                styles.navRight,
                {
                  paddingRight: tokens.spacing[2],
                  opacity: showEndChrome ? 1 : 0,
                },
              ]}
            >
              <Pressable
                onPress={goToNextSlide}
                disabled={!showEndChrome}
                accessibilityRole="button"
                accessibilityLabel="Next slide"
                accessibilityState={{ disabled: !showEndChrome }}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.navButton,
                  tokens.shadow.md,
                  {
                    backgroundColor: tokens.color.surface.default,
                    borderRadius: tokens.radius.full,
                    opacity: pressed ? tokens.opacity[80] : 1,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <Icon
                  name="chevronRight"
                  size={20}
                  color={tokens.color.text.primary}
                />
              </Pressable>
            </View>
          </>
        ) : null}
      </View>

      {showPagination && n > 1 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: carousel.pagination.marginTop,
            gap: carousel.pagination.gap,
          }}
        >
          {data.map((_, index) => (
            <Pressable
              key={keyExtractor(data[index], index)}
              onPress={() => handleDotPress(index)}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${index + 1}`}
              accessibilityState={{ selected: index === activeIndex }}
              hitSlop={8}
            >
              <PaginationDot
                active={index === activeIndex}
                dot={carousel.dot}
              />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function PaginationDot({
  active,
  dot,
}: {
  active: boolean;
  dot: {
    active: { bg: string; width: number };
    inactive: { bg: string; width: number; opacity: number };
    height: number;
    borderRadius: number;
  };
}) {
  return (
    <View
      style={{
        width: active ? dot.active.width : dot.inactive.width,
        opacity: active ? 1 : dot.inactive.opacity,
        backgroundColor: dot.active.bg,
        height: dot.height,
        borderRadius: dot.borderRadius,
      }}
    />
  );
}

const styles = StyleSheet.create({
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  navSide: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  navLeft: {
    left: 0,
  },
  navRight: {
    right: 0,
  },
  navButton: {
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoSlideContent: {
    flexGrow: 1,
  },
});
