import { useId, useReduceMotionEnabled, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { forwardRef, useCallback, useMemo } from 'react';
import type { ListRenderItem, ListRenderItemInfo } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';
import { AnimatedCell } from './AnimatedCell';
import { getAnimatedListImpl } from './listImpl';
import type { AnimatedListProps, AnimatedListRef } from './types';

const ListImpl = getAnimatedListImpl();

/**
 * Sensible defaults for animated feeds.
 *
 * FlashList v2 auto-measures and manages its own recycle window, so legacy
 * FlatList tuning props (removeClippedSubviews, windowSize, maxToRenderPerBatch,
 * initialNumToRender, updateCellsBatchingPeriod) are intentionally omitted —
 * they are ignored by FlashList v2 and only add noise.
 */
const LIST_PERFORMANCE_DEFAULTS = {
  scrollEventThrottle: 16,
} as const;

/**
 * AnimatedList wraps @shopify/flash-list with Reanimated to provide
 * ultra-fast performance combined with smooth layout and entry animations.
 *
 * Prefer a **stable** `renderItem` (`useCallback`) and `keyExtractor` so FlashList does not recycle unnecessarily.
 *
 * When FlashList is available, call `ref.prepareForLayoutAnimationRender()` on the list ref
 * immediately before mutating `data` (add/remove/reorder) for reliable enter/exit/layout animations.
 */
function AnimatedListInner<T>(
  {
    id: idProp,
    data,
    renderItem,
    itemEntering = FadeInDown.duration(300),
    itemExiting,
    itemLayout,
    staggerEntering = false,
    staggerDelay = 50,
    itemContainerStyle,
    style,
    contentContainerStyle: contentContainerStyleProp,
    ...flashListProps
  }: AnimatedListProps<T>,
  ref: React.ForwardedRef<AnimatedListRef>
) {
  const {
    keyExtractor: keyExtractorProp,
    // Dropped: FlashList v2 auto-measures and rejects these v1-era props.
    estimatedItemSize: _estimatedItemSize,
    getEstimatedItemSize: _getEstimatedItemSize,
    ...restFlashListProps
  } = flashListProps as {
    keyExtractor?: (item: T, index: number) => string;
    estimatedItemSize?: number;
    getEstimatedItemSize?: unknown;
  };

  const id = useId(idProp, 'animated-list');
  const {
    components: { animatedList },
  } = useTheme();
  const reduceMotion = useReduceMotionEnabled();

  const effectiveEntering = useMemo(
    () => (reduceMotion ? undefined : itemEntering),
    [reduceMotion, itemEntering]
  );
  const effectiveExiting = useMemo(
    () => (reduceMotion ? undefined : itemExiting),
    [reduceMotion, itemExiting]
  );
  const effectiveLayout = useMemo(
    () => (reduceMotion ? undefined : itemLayout),
    [reduceMotion, itemLayout]
  );

  const internalRenderItem = useCallback(
    (info: ListRenderItemInfo<T>) => (
      <AnimatedCell
        info={info}
        renderItem={renderItem}
        effectiveEntering={effectiveEntering}
        effectiveExiting={effectiveExiting}
        effectiveLayout={effectiveLayout}
        staggerEntering={staggerEntering}
        staggerDelay={staggerDelay}
        animatedListStyle={animatedList.item}
        itemContainerStyle={itemContainerStyle}
      />
    ),
    [
      renderItem,
      effectiveEntering,
      effectiveExiting,
      effectiveLayout,
      staggerEntering,
      staggerDelay,
      animatedList.item,
      itemContainerStyle,
    ]
  );

  const listStyle = useMemo(
    () => [animatedList.container, style],
    [animatedList.container, style]
  );

  return (
    <ListImpl
      ref={ref}
      nativeID={id}
      data={data as unknown as unknown[] | null | undefined}
      renderItem={internalRenderItem as unknown as ListRenderItem<unknown>}
      {...LIST_PERFORMANCE_DEFAULTS}
      {...(restFlashListProps as Record<string, unknown>)}
      keyExtractor={keyExtractorProp}
      style={listStyle}
      contentContainerStyle={contentContainerStyleProp}
    />
  );
}

const _AnimatedList = forwardRef(
  AnimatedListInner as React.ForwardRefRenderFunction<
    AnimatedListRef,
    Omit<AnimatedListProps<unknown>, 'ref'>
  >
);

(_AnimatedList as unknown as Record<string, unknown>).displayName = 'AnimatedList';

export const AnimatedList = _AnimatedList as <T>(
  props: AnimatedListProps<T> & { ref?: React.Ref<AnimatedListRef> }
) => React.ReactElement;
