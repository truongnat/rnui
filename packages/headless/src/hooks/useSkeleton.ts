import { useState, useCallback, useEffect, useRef } from "react";

export interface UseSkeletonOptions {
  isLoaded: boolean;
  animationDuration?: number;
  staggerDelay?: number;
  count?: number;
}

export interface UseSkeletonReturn {
  isLoading: boolean;
  animationStyle: any;
  getStaggerDelay: (index: number) => number;
}

export function useSkeleton(options: UseSkeletonOptions): UseSkeletonReturn {
  const {
    isLoaded,
    animationDuration = 1000,
    staggerDelay = 100,
    count = 1,
  } = options;

  const isLoading = !isLoaded;
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (isLoaded && animationRef.current) {
      animationRef.current = null;
    }
  }, [isLoaded]);

  const getStaggerDelay = useCallback((index: number) => {
    return index * staggerDelay;
  }, [staggerDelay]);

  const animationStyle = isLoading ? {
    opacity: 1,
  } : {
    opacity: 1,
  };

  return {
    isLoading,
    animationStyle,
    getStaggerDelay,
  };
}
