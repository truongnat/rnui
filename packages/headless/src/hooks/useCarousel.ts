import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface UseCarouselOptions<T> {
  data: T[];
  itemWidth?: number;
  gap?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function useCarousel<T>({
  data,
  itemWidth = SCREEN_WIDTH,
  gap = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
}: UseCarouselOptions<T>) {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isJumping = useRef(false);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const n = data.length;
  const itemStep = itemWidth + gap;

  // ─── Data Preparation ───────────────────────────────────────────
  const displayData = useMemo(() => {
    if (!loop || n < 2) return data;
    // Prepend clone of last item, append clone of first item for seamless loop
    return [data[n - 1], ...data, data[0]];
  }, [data, loop, n]);

  const snapToOffsets = useMemo(() => {
    return displayData.map((_, i) => i * itemStep);
  }, [displayData, itemStep]);

  // ─── Initial Position ───────────────────────────────────────────
  useEffect(() => {
    if (loop && n >= 2) {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
        scrollX.value = itemStep;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Navigation ─────────────────────────────────────────────────
  const goToNextSlide = useCallback(() => {
    if (!loop || n < 2) {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * itemStep, animated: true });
    } else {
      const currentIndex = Math.round(scrollX.value / itemStep);
      const nextX = (currentIndex + 1) * itemStep;
      if (nextX < displayData.length * itemStep) {
        scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
      }
    }
  }, [loop, n, itemStep, scrollX, displayData.length]);

  const goToPreviousSlide = useCallback(() => {
    const currentIndex = Math.round(scrollX.value / itemStep);
    const prevIndex = currentIndex <= 0 ? (loop ? 0 : n - 1) : currentIndex - 1;
    scrollViewRef.current?.scrollTo({ x: prevIndex * itemStep, animated: true });
  }, [loop, n, itemStep, scrollX]);

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
    if (autoPlay) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [autoPlay, startTimer, stopTimer]);

  // ─── Event Handlers ─────────────────────────────────────────────
  const onScroll = useCallback((e: any) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    if (autoPlay) {
      startTimer();
    }
  }, [autoPlay, startTimer, scrollX]);

  const onMomentumScrollEnd = useCallback((e: any) => {
    if (!loop || n < 2 || isJumping.current) return;

    const x = Math.round(e.nativeEvent.contentOffset.x);
    const lastCloneX = (displayData.length - 1) * itemStep;

    if (x <= 0) {
      // Jump from first clone to real last item
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: n * itemStep, animated: false });
      scrollX.value = n * itemStep;
      setTimeout(() => { isJumping.current = false; }, 50);
    } else if (x >= lastCloneX) {
      // Jump from last clone to real first item
      isJumping.current = true;
      scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
      scrollX.value = itemStep;
      setTimeout(() => { isJumping.current = false; }, 50);
    }
  }, [loop, n, itemStep, displayData.length, scrollX]);

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
  };
}
