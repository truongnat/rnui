import { useCallback, useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';

export interface UseSkeletonOptions {
  isLoaded: boolean;
  animationDuration?: number;
  staggerDelay?: number;
  count?: number;
}

export interface UseSkeletonReturn {
  isLoading: boolean;
  animationStyle: ViewStyle;
  getStaggerDelay: (index: number) => number;
}

export function useSkeleton(options: UseSkeletonOptions): UseSkeletonReturn {
  const { isLoaded, staggerDelay = 100 } = options;

  const isLoading = !isLoaded;
  const animationRef = useRef<{ stop?: () => void } | null>(null);

  useEffect(() => {
    if (isLoaded && animationRef.current) {
      animationRef.current = null;
    }
  }, [isLoaded]);

  const getStaggerDelay = useCallback(
    (index: number) => {
      return index * staggerDelay;
    },
    [staggerDelay]
  );

  const animationStyle = isLoading
    ? {
        opacity: 1,
      }
    : {
        opacity: 1,
      };

  return {
    isLoading,
    animationStyle,
    getStaggerDelay,
  };
}
