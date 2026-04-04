import React, { forwardRef, useMemo } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { FlatList } from 'react-native';
import Animated, {
  FadeInDown,
  Layout,
  ReduceMotion,
} from 'react-native-reanimated';
import {
  useComponentTokens,
  useReduceMotionEnabled,
} from '@truongdq01/headless';

type FlashListProps<T> = {
  data: T[] | null | undefined;
  renderItem: (info: any) => React.ReactElement | null;
  estimatedItemSize?: number;
  contentContainerStyle?: any;
  [key: string]: any;
};

const ReanimatedListImpl = Animated.createAnimatedComponent(
  FlatList as any
) as any;

export interface AnimatedListProps<T> extends Omit<
  FlashListProps<T>,
  'renderItem'
> {
  /** The items to render */
  data: T[] | null | undefined;
  /** Function to render each item. Use `index` to stagger entering animations if desired. */
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  /**
   * Average main-axis size of one item (usually **height** in a vertical list), in dp.
   * FlashList uses this to size the scroll window and recycle views; **pick a value close to the real
   * rendered row height** (± a few px). If this is far off, you may see scroll jumps or degraded
   * performance with little warning.
   * @see https://shopify.github.io/flash-list/docs/estimated-item-size
   */
  estimatedItemSize: number;
  /** Apply entering animation to items as they appear. Recommended: FadeInDown */
  itemEntering?: any;
  /** Apply exiting animation to items as they disappear */
  itemExiting?: any;
  /** Apply layout animation when items are reordered. Recommended: Layout.springify() */
  itemLayout?: any;
  /**
   * Automatically stagger item entry animations.
   * Note: This wraps items in an Animated.View.
   */
  staggerEntering?: boolean;
  /** Delay between staggered items in ms. Default 50 */
  staggerDelay?: number;
  /** Container style for the wrapper Animated.View */
  itemContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * AnimatedList wraps @shopify/flash-list with Reanimated to provide
 * ultra-fast performance combined with smooth layout and entry animations.
 *
 * Prefer a **stable** `renderItem` (`useCallback`) and `keyExtractor` so FlashList does not recycle unnecessarily.
 */
function AnimatedListInner<T>(
  {
    data,
    renderItem,
    itemEntering = FadeInDown,
    itemExiting,
    itemLayout = Layout.springify().damping(16).stiffness(150),
    staggerEntering = false,
    staggerDelay = 50,
    itemContainerStyle,
    ...flashListProps
  }: AnimatedListProps<T>,
  ref: any
) {
  const { animatedList } = useComponentTokens();
  const reduceMotion = useReduceMotionEnabled();

  const effectiveEntering = reduceMotion ? undefined : itemEntering;
  const effectiveExiting = reduceMotion ? undefined : itemExiting;
  const effectiveLayout = reduceMotion ? undefined : itemLayout;

  const ListImpl: any = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@shopify/flash-list') as { FlashList?: any };
      const Impl = mod?.FlashList ?? FlatList;
      return Animated.createAnimatedComponent(Impl as any);
    } catch {
      return ReanimatedListImpl;
    }
  }, []);

  const AnimatedCell = (info: any) => {
    const { index } = info;
    const enteringAnim =
      staggerEntering && effectiveEntering?.delay
        ? effectiveEntering.delay(Math.min(index * staggerDelay, 500))
        : effectiveEntering;

    return (
      <Animated.View
        entering={enteringAnim}
        exiting={effectiveExiting}
        layout={effectiveLayout}
        style={[animatedList.item, itemContainerStyle, styles.itemWrapper]}
      >
        {renderItem(info as unknown as ListRenderItemInfo<T>)}
      </Animated.View>
    );
  };

  return (
    <ListImpl
      ref={ref}
      data={data}
      renderItem={(info: any) => <AnimatedCell {...info} />}
      {...flashListProps}
      contentContainerStyle={useMemo(
        () => [animatedList.container, flashListProps.contentContainerStyle],
        [animatedList.container, flashListProps.contentContainerStyle]
      )}
    />
  );
}

// eslint-disable-next-line react/display-name
export const AnimatedList = forwardRef(AnimatedListInner as any) as <T>(
  props: AnimatedListProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;

const styles = StyleSheet.create({
  itemWrapper: {
    overflow: 'hidden',
  },
});
