import { useReduceMotionEnabled, useTheme, useId } from '@truongdq01/headless';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  FlatList,
  type ListRenderItemInfo,
  type ListRenderItem,
} from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { AnimatedCell } from './AnimatedCell';
import type { AnimatedListProps } from './types';

const ReanimatedListImpl = Animated.createAnimatedComponent(
  FlatList
);

/**
 * AnimatedList wraps @shopify/flash-list with Reanimated to provide
 * ultra-fast performance combined with smooth layout and entry animations.
 *
 * Prefer a **stable** `renderItem` (`useCallback`) and `keyExtractor` so FlashList does not recycle unnecessarily.
 */
function AnimatedListInner<T>(
  {
    id: idProp,
    data,
    renderItem,
    itemEntering = FadeInDown,
    itemExiting,
    itemLayout = LinearTransition.springify().damping(16).stiffness(150),
    staggerEntering = false,
    staggerDelay = 50,
    itemContainerStyle,
    ...flashListProps
  }: AnimatedListProps<T>,
  ref: React.ForwardedRef<unknown>
) {
  const id = useId(idProp, 'animated-list');
  const {
    components: { animatedList },
  } = useTheme();
  const reduceMotion = useReduceMotionEnabled();

  const effectiveEntering = useMemo(() => (reduceMotion ? undefined : itemEntering), [reduceMotion, itemEntering]);
  const effectiveExiting = useMemo(() => (reduceMotion ? undefined : itemExiting), [reduceMotion, itemExiting]);
  const effectiveLayout = useMemo(() => (reduceMotion ? undefined : itemLayout), [reduceMotion, itemLayout]);

  const ListImpl = useMemo(() => {
    try {
      // Use require for optional peer dependency
      // Cast to unknown first then Record to avoid direct 'any' from require
      const mod = require('@shopify/flash-list') as Record<string, unknown>;
      const Impl = (mod?.FlashList as React.ComponentType<Record<string, unknown>>) ?? FlatList;
      return Animated.createAnimatedComponent(Impl);
    } catch {
      return ReanimatedListImpl;
    }
  }, []);

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

  return (
    <ListImpl
      ref={ref as React.Ref<FlatList>}
      nativeID={id}
      data={data as unknown as (unknown[] | null | undefined)}
      renderItem={internalRenderItem as unknown as ListRenderItem<unknown>}
      {...(flashListProps as Record<string, unknown>)}
      contentContainerStyle={useMemo(
        () => [animatedList.container, flashListProps.contentContainerStyle],
        [animatedList.container, flashListProps.contentContainerStyle]
      )}
    />
  );
}

// eslint-disable-next-line react/display-name
export const AnimatedList = forwardRef(
  AnimatedListInner as React.ForwardRefRenderFunction<
    unknown,
    Omit<AnimatedListProps<unknown>, 'ref'>
  >
) as <T>(
  props: AnimatedListProps<T> & { ref?: React.Ref<unknown> }
) => React.ReactElement;
