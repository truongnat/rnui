import type { ComponentType } from 'react';
import { FlatList } from 'react-native';

export type AnimatedListImpl = ComponentType<Record<string, unknown>>;

let cachedFlashListImpl: AnimatedListImpl | null | undefined;

function loadFlashList(): AnimatedListImpl | null {
  if (cachedFlashListImpl !== undefined) {
    return cachedFlashListImpl;
  }

  try {
    const mod = require('@shopify/flash-list') as {
      FlashList?: ComponentType<Record<string, unknown>>;
    };
    cachedFlashListImpl = mod.FlashList ?? null;
  } catch {
    cachedFlashListImpl = null;
  }

  return cachedFlashListImpl;
}

/**
 * Prefer FlashList when installed; otherwise plain FlatList.
 *
 * The list itself is not animated — per-item enter/exit/layout animations live
 * inside each cell's `Animated.View`, so wrapping the list in
 * `Animated.createAnimatedComponent` is unnecessary overhead and is avoided.
 */
export function getAnimatedListImpl(): AnimatedListImpl {
  return (loadFlashList() ?? FlatList) as AnimatedListImpl;
}
