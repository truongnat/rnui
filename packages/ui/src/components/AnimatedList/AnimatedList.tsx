import { useId, useReduceMotionEnabled, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { forwardRef, useCallback, useMemo } from 'react';
import {
  FlatList,
  type ListRenderItem,
  type ListRenderItemInfo,
} from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { AnimatedCell } from './AnimatedCell';
import type { AnimatedListProps } from './types';

const ReanimatedListImpl = Animated.createAnimatedComponent(FlatList);

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
    itemEntering = FadeInDown.duration(300),
    itemExiting,
    itemLayout = LinearTransition.duration(250),
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

  const ListImpl = useMemo(() => {
    try {
      // Use require for optional peer dependency
      // Cast to unknown first then Record to avoid direct 'any' from require
      const mod = require('@shopify/flash-list') as Record<string, unknown>;
      const Impl =
        (mod?.FlashList as React.ComponentType<Record<string, unknown>>) ??
        FlatList;
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

  const contentContainerStyle = useMemo(
    () => [animatedList.container, flashListProps.contentContainerStyle],
    [animatedList.container, flashListProps.contentContainerStyle]
  );

  return (
    <ListImpl
      ref={ref as React.Ref<FlatList>}
      nativeID={id}
      data={data as unknown as unknown[] | null | undefined}
      renderItem={internalRenderItem as unknown as ListRenderItem<unknown>}
      {...(flashListProps as Record<string, unknown>)}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

const _AnimatedList = forwardRef(
  AnimatedListInner as React.ForwardRefRenderFunction<
    unknown,
    Omit<AnimatedListProps<unknown>, 'ref'>
  >
);

(_AnimatedList as unknown as Record<string, unknown>).displayName = 'AnimatedList';

export const AnimatedList = _AnimatedList as <T>(
  props: AnimatedListProps<T> & { ref?: React.Ref<unknown> }
) => React.ReactElement;
