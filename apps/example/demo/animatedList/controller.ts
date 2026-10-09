import { useCallback, useEffect, useRef, useState } from 'react';
import type { FlatList } from 'react-native';

const INSERT_BURST_MS = 200;
const BURST_IDLE_MS = 350;
/** Stagger between item entrances (ms). */
const ITEM_DELAY_MS = 60;

type UseAnimatedListControllerOptions<T> = {
  initialData: T[];
  createItem: (uniqueId: string, seq: number) => T;
  /** Namespace for generated ids, e.g. "contact" -> "insert-contact-3". */
  idPrefix: string;
};

/**
 * Encapsulates all per-list demo state: data, insert (with burst handling),
 * two-phase removal finalize, and scroll-to-top. Each demo owns its OWN
 * instance, so state never leaks between Contacts / Social / Timeline.
 */
export function useAnimatedListController<T extends { id: string }>({
  initialData,
  createItem,
  idPrefix,
}: UseAnimatedListControllerOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [suppressEnterAnimation, setSuppressEnterAnimation] = useState(false);

  const listRef = useRef<FlatList<T>>(null);
  const insertSeqRef = useRef(0);
  const lastInsertAtRef = useRef(0);
  const burstIdleTimerRef = useRef<number | undefined>(undefined);
  const scrollDebounceTimerRef = useRef<number | undefined>(undefined);

  const scrollListToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, []);

  const scheduleScrollToTop = useCallback(() => {
    clearTimeout(scrollDebounceTimerRef.current);
    scrollDebounceTimerRef.current = setTimeout(scrollListToTop, 64);
  }, [scrollListToTop]);

  const endBurstMode = useCallback(() => {
    setSuppressEnterAnimation(false);
    scrollListToTop();
  }, [scrollListToTop]);

  const touchBurstMode = useCallback(() => {
    clearTimeout(burstIdleTimerRef.current);
    burstIdleTimerRef.current = setTimeout(endBurstMode, BURST_IDLE_MS);
  }, [endBurstMode]);

  useEffect(() => {
    return () => {
      clearTimeout(burstIdleTimerRef.current);
      clearTimeout(scrollDebounceTimerRef.current);
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

  const keyExtractor = useCallback((item: T) => item.id, []);

  return {
    items,
    setItems,
    listRef,
    insert,
    finalizeRemove,
    /** Disable the entrance animation while an insert burst is in flight. */
    animated: !suppressEnterAnimation,
    itemDelay: ITEM_DELAY_MS,
    keyExtractor,
  };
}
