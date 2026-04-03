import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export interface UseCarouselOptions<T> {
  data: T[];
  /** Defaults to current window width (from `useWindowDimensions`). */
  itemWidth?: number;
  gap?: number;
  /**
   * Leading inset inside scroll content (e.g. horizontal padding used to center slides).
   * Snap offsets are `contentPaddingStart + index * (itemWidth + gap)`.
   */
  contentPaddingStart?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Carousel scroll state. When `loop` is true and `data.length >= 2`, `displayData` is
 * `[last, ...data, first]` for infinite scroll. When `data.length === 1` and `loop` is true,
 * `displayData` is the single item (no clones) — same as non-loop.
 */
export function useCarousel<T>({
  data,
  itemWidth: itemWidthOption,
  gap = 0,
  contentPaddingStart: contentPaddingStartOption = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
}: UseCarouselOptions<T>) {
  const { width: windowWidthPx } = useWindowDimensions();
  const windowWidth = Math.max(1, windowWidthPx > 0 ? windowWidthPx : 375);
  const itemWidth = itemWidthOption ?? windowWidth;

  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isJumping = useRef(false);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const jumpTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const n = data.length;
  const itemStep = itemWidth + gap;
  const pad = contentPaddingStartOption;

  // ─── Data Preparation ───────────────────────────────────────────
  const displayData = useMemo(() => {
    if (!loop || n < 2) return data;
    // Prepend clone of last item, append clone of first item for seamless loop
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);

  const snapToOffsets = useMemo(() => {
    return displayData.map((_, i) => pad + i * itemStep);
  }, [displayData, itemStep, pad]);

  // ─── Initial Position ───────────────────────────────────────────
  useEffect(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        const x = pad + itemStep;
        scrollViewRef.current?.scrollTo({ x, animated: false });
        scrollX.value = x;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Navigation ─────────────────────────────────────────────────
  const goToNextSlide = useCallback(() => {
    if (n < 1 || itemStep <= 0) return;
    if (!loop || n < 2) {
      const currentIndex = Math.round((scrollX.value - pad) / itemStep);
      const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: pad + nextIndex * itemStep, animated: true });
    } else {
      const currentIndex = Math.round((scrollX.value - pad) / itemStep);
      const nextX = pad + (currentIndex + 1) * itemStep;
      if (currentIndex + 1 < displayData.length) {
        scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
      }
    }
  }, [loop, n, itemStep, scrollX, displayData.length, pad]);

  const goToPreviousSlide = useCallback(() => {
    if (n < 1 || itemStep <= 0) return;
    const i = Math.round((scrollX.value - pad) / itemStep);
    if (loop && n >= 2) {
      if (i <= 0) {
        scrollViewRef.current?.scrollTo({ x: pad + n * itemStep, animated: true });
      } else {
        scrollViewRef.current?.scrollTo({ x: pad + (i - 1) * itemStep, animated: true });
      }
      return;
    }
    const prevIndex = i <= 0 ? n - 1 : i - 1;
    scrollViewRef.current?.scrollTo({ x: pad + prevIndex * itemStep, animated: true });
  }, [loop, n, itemStep, scrollX, pad]);

  // ─── Auto-play ──────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = setInterval(() => {
      requestAnimationFrame(() => {
        goToNextSlide();
      });
    }, autoPlayInterval);
  }, [autoPlayInterval, goToNextSlide]);

  const stopTimer = useCallback(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (n < 1) {
      stopTimer();
      return;
    }
    if (autoPlay) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [autoPlay, startTimer, stopTimer, n]);

  useEffect(() => {
    return () => {
      jumpTimers.current.forEach(clearTimeout);
      jumpTimers.current = [];
    };
  }, []);

  // ─── Event Handlers ─────────────────────────────────────────────
  const onScroll = useCallback(
    (e: any) => {
      scrollX.value = e.nativeEvent.contentOffset.x;
      if (autoPlay && n >= 1) {
        startTimer();
      }
    },
    [autoPlay, startTimer, scrollX, n]
  );

  const onMomentumScrollEnd = useCallback(
    (e: any) => {
      if (!loop || n < 2 || isJumping.current) return;

      const x = Math.round(e.nativeEvent.contentOffset.x);
      const i = Math.round((x - pad) / itemStep);
      const lastIndex = displayData.length - 1;

      if (i <= 0) {
        isJumping.current = true;
        const target = pad + n * itemStep;
        scrollViewRef.current?.scrollTo({ x: target, animated: false });
        scrollX.value = target;
        const id = setTimeout(() => { isJumping.current = false; }, 50);
        jumpTimers.current.push(id);
      } else if (i >= lastIndex) {
        isJumping.current = true;
        const target = pad + itemStep;
        scrollViewRef.current?.scrollTo({ x: target, animated: false });
        scrollX.value = target;
        const id = setTimeout(() => { isJumping.current = false; }, 50);
        jumpTimers.current.push(id);
      }
    },
    [loop, n, itemStep, displayData.length, scrollX, pad]
  );

  return {
    scrollViewRef,
    scrollX,
    displayData,
    snapToOffsets,
    onScroll,
    onMomentumScrollEnd,
    goToNextSlide,
    goToPreviousSlide,
    itemStep,
    n,
    contentPaddingStart: pad,
  };
}
