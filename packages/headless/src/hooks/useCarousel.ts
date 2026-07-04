import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export interface UseCarouselOptions<T> {
  data: T[];
  /** Defaults to current window width (from `useWindowDimensions`). */
  itemWidth?: number;
  gap?: number;
  /**
   * Horizontal inset on the scroll content container (e.g. to center slides).
   * Does not affect snap offsets — those are always `index * (itemWidth + gap)`.
   */
  contentPaddingStart?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

function getDisplayIndexFromOffset(
  offsetX: number,
  itemStep: number
): number {
  if (itemStep <= 0) return 0;
  return Math.round(offsetX / itemStep);
}

function getOffsetForDisplayIndex(
  displayIndex: number,
  itemStep: number
): number {
  return displayIndex * itemStep;
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
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);

  const snapToOffsets = useMemo(() => {
    return displayData.map((_, i) => getOffsetForDisplayIndex(i, itemStep));
  }, [displayData, itemStep]);

  const scrollToDisplayIndex = useCallback(
    (displayIndex: number, animated: boolean) => {
      const x = getOffsetForDisplayIndex(displayIndex, itemStep);
      scrollViewRef.current?.scrollTo({ x, animated });
      scrollX.set(x);
    },
    [itemStep, scrollX]
  );

  const scrollToSlide = useCallback(
    (slideIndex: number, animated: boolean) => {
      if (n < 1) return;
      const clamped = Math.max(0, Math.min(n - 1, slideIndex));
      const displayIndex = loop && n >= 2 ? clamped + 1 : clamped;
      scrollToDisplayIndex(displayIndex, animated);
    },
    [loop, n, scrollToDisplayIndex]
  );

  // ─── Initial Position ───────────────────────────────────────────
  useEffect(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollToDisplayIndex(1, false);
      });
    }
  }, [loop, n, scrollToDisplayIndex]);

  // ─── Navigation ─────────────────────────────────────────────────
  const goToNextSlide = useCallback(() => {
    if (n < 1 || itemStep <= 0) return;

    const displayIndex = getDisplayIndexFromOffset(scrollX.get(), itemStep);

    if (loop && n >= 2) {
      const nextDisplayIndex = displayIndex + 1;
      if (nextDisplayIndex < displayData.length) {
        scrollToDisplayIndex(nextDisplayIndex, true);
      }
      return;
    }

    const nextIndex = Math.min(displayIndex + 1, n - 1);
    if (nextIndex === displayIndex) return;
    scrollToDisplayIndex(nextIndex, true);
  }, [loop, n, itemStep, scrollX, displayData.length, scrollToDisplayIndex]);

  const goToPreviousSlide = useCallback(() => {
    if (n < 1 || itemStep <= 0) return;

    const displayIndex = getDisplayIndexFromOffset(scrollX.get(), itemStep);

    if (loop && n >= 2) {
      if (displayIndex <= 0) {
        scrollToDisplayIndex(n, true);
      } else {
        scrollToDisplayIndex(displayIndex - 1, true);
      }
      return;
    }

    const prevIndex = Math.max(displayIndex - 1, 0);
    if (prevIndex === displayIndex) return;
    scrollToDisplayIndex(prevIndex, true);
  }, [loop, n, itemStep, scrollX, scrollToDisplayIndex]);

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
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.set(e.nativeEvent.contentOffset.x);
    },
    [scrollX]
  );

  const onScrollBeginDrag = useCallback(() => {
    stopTimer();
  }, [stopTimer]);

  const onScrollEndDrag = useCallback(() => {
    if (autoPlay) startTimer();
  }, [autoPlay, startTimer]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (autoPlay) startTimer();
      if (!loop || n < 2 || isJumping.current) return;

      const displayIndex = getDisplayIndexFromOffset(
        Math.round(e.nativeEvent.contentOffset.x),
        itemStep
      );
      const lastDisplayIndex = displayData.length - 1;

      if (displayIndex <= 0) {
        isJumping.current = true;
        scrollToDisplayIndex(n, false);
        const id = setTimeout(() => {
          isJumping.current = false;
        }, 50);
        jumpTimers.current.push(id);
      } else if (displayIndex >= lastDisplayIndex) {
        isJumping.current = true;
        scrollToDisplayIndex(1, false);
        const id = setTimeout(() => {
          isJumping.current = false;
        }, 50);
        jumpTimers.current.push(id);
      }
    },
    [loop, n, itemStep, displayData.length, scrollToDisplayIndex, autoPlay, startTimer]
  );

  return {
    scrollViewRef,
    scrollX,
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
    contentPaddingStart: pad,
  };
}
