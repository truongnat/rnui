import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FadeInDown,
  FadeInRight,
  SlideInLeft,
  ZoomIn,
} from 'react-native-reanimated';
import type { AnimatedListRef } from '@truongdq01/ui';
import type { RemoveVariant } from './RemovableRow';

export type AnimationType =
  | 'default'
  | 'staggeredZoom'
  | 'directionalSlideLeft'
  | 'fadeFromRight';

export const ANIMATION_OPTIONS: { key: AnimationType; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'staggeredZoom', label: 'Staggered Zoom' },
  { key: 'directionalSlideLeft', label: 'Directional Slide (Left)' },
  { key: 'fadeFromRight', label: 'Fade from Right' },
];

const INSERT_BURST_MS = 200;
const BURST_IDLE_MS = 350;

// Disable FlashList v2's default MVCP so inserts always scroll back to the top
// instead of preserving the prior scroll position.
export const INSERT_AT_TOP_MVCP = { disabled: true } as const;

type UseAnimatedListControllerOptions<T> = {
  initialData: T[];
  createItem: (uniqueId: string, seq: number) => T;
  /** Namespace for generated ids, e.g. "contact" -> "insert-contact-3". */
  idPrefix: string;
};

/**
 * Encapsulates all per-list demo state: data, insert (with burst handling),
 * two-phase removal finalize, scroll-to-top, and the animation config derived
 * from the selected preset. Each demo owns its OWN instance, so state never
 * leaks between Contacts / Social / Timeline.
 */
export function useAnimatedListController<T extends { id: string }>({
  initialData,
  createItem,
  idPrefix,
}: UseAnimatedListControllerOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [type, setType] = useState<AnimationType>('default');
  const [suppressEnterAnimation, setSuppressEnterAnimation] = useState(false);

  const listRef = useRef<AnimatedListRef>(null);
  const insertSeqRef = useRef(0);
  const lastInsertAtRef = useRef(0);
  const burstIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const countRef = useRef(0);
  countRef.current = items.length;

  const scrollListToTop = useCallback(() => {
    listRef.current?.scrollToOffset?.({ offset: 0, animated: false });
  }, []);

  const scheduleScrollToTop = useCallback(() => {
    if (scrollDebounceTimerRef.current) {
      clearTimeout(scrollDebounceTimerRef.current);
    }
    scrollDebounceTimerRef.current = setTimeout(scrollListToTop, 64);
  }, [scrollListToTop]);

  const endBurstMode = useCallback(() => {
    setSuppressEnterAnimation(false);
    scrollListToTop();
  }, [scrollListToTop]);

  const touchBurstMode = useCallback(() => {
    if (burstIdleTimerRef.current) {
      clearTimeout(burstIdleTimerRef.current);
    }
    burstIdleTimerRef.current = setTimeout(endBurstMode, BURST_IDLE_MS);
  }, [endBurstMode]);

  useEffect(() => {
    return () => {
      if (burstIdleTimerRef.current) clearTimeout(burstIdleTimerRef.current);
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current);
      }
    };
  }, []);

  const insert = useCallback(() => {
    const now = Date.now();
    const isBurst = now - lastInsertAtRef.current < INSERT_BURST_MS;
    lastInsertAtRef.current = now;

    if (isBurst || suppressEnterAnimation) {
      if (!suppressEnterAnimation) setSuppressEnterAnimation(true);
      touchBurstMode();
    }

    insertSeqRef.current += 1;
    const seq = insertSeqRef.current;
    const uniqueId = `insert-${idPrefix}-${seq}`;

    setItems((prev) => {
      if (prev.some((item) => item.id === uniqueId)) return prev;
      return [createItem(uniqueId, seq), ...prev];
    });

    if (!isBurst && !suppressEnterAnimation) scheduleScrollToTop();
  }, [
    createItem,
    idPrefix,
    scheduleScrollToTop,
    suppressEnterAnimation,
    touchBurstMode,
  ]);

  // Phase 2 of two-phase removal: drop the row after its collapse finishes.
  const finalizeRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Only entering here — exit is handled by RemovableRow (two-phase removal).
  const listConfig = useMemo(() => {
    switch (type) {
      case 'staggeredZoom':
        return {
          itemEntering: ZoomIn.duration(450),
          staggerEntering: true,
          staggerDelay: 80,
        };
      case 'directionalSlideLeft':
        return { itemEntering: SlideInLeft.duration(500) };
      case 'fadeFromRight':
        return { itemEntering: FadeInRight.duration(500) };
      default:
        return { itemEntering: FadeInDown.duration(420) };
    }
  }, [type]);

  const activeListConfig = useMemo(() => {
    if (suppressEnterAnimation) {
      return { ...listConfig, itemEntering: undefined, staggerEntering: false };
    }
    return listConfig;
  }, [listConfig, suppressEnterAnimation]);

  const removeVariant = useMemo<RemoveVariant>(() => {
    switch (type) {
      case 'directionalSlideLeft':
        return 'slide';
      case 'staggeredZoom':
        return 'zoom';
      default:
        return 'fade';
    }
  }, [type]);

  const keyExtractor = useCallback((item: T) => item.id, []);

  return {
    items,
    setItems,
    type,
    setType,
    listRef,
    countRef,
    insert,
    finalizeRemove,
    activeListConfig,
    removeVariant,
    keyExtractor,
  };
}
