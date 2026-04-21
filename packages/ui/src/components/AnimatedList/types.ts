import type React from 'react';
import {
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
  ReanimatedKeyframe,
} from 'react-native-reanimated';

export type FlashListProps<T> = {
  data: readonly T[] | null | undefined;
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  estimatedItemSize?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  [key: string]: unknown;
};

export type AnimationProp =
  | BaseAnimationBuilder
  | EntryExitAnimationFunction
  | ReanimatedKeyframe
  | typeof BaseAnimationBuilder;

export type LayoutProp =
  | BaseAnimationBuilder
  | LayoutAnimationFunction
  | typeof BaseAnimationBuilder;

export interface AnimatedListProps<T> extends Omit<
  FlashListProps<T>,
  'renderItem' | 'contentContainerStyle'
> {
  /** Optional ID for testing or automation */
  id?: string;
  /** The items to render */
  data: readonly T[] | null | undefined;
  /** Function to render each item. Use `index` to stagger entering animations if desired. */
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  /**
   * Average main-axis size of one item (usually **height** in a vertical list), in dp.
   * FlashList uses this to size the scroll window and recycle views.
   */
  estimatedItemSize: number;
  /** Apply entering animation to items as they appear. Recommended: FadeInDown */
  itemEntering?: AnimationProp;
  /** Apply exiting animation to items as they disappear */
  itemExiting?: AnimationProp;
  /** Apply layout animation when items are reordered. Recommended: LinearTransition.springify() */
  itemLayout?: LayoutProp;
  /**
   * Automatically stagger item entry animations.
   * Note: This wraps items in an Animated.View.
   */
  staggerEntering?: boolean;
  /** Delay between staggered items in ms. Default 50 */
  staggerDelay?: number;
  /** Container style for the wrapper Animated.View */
  itemContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the content container */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export interface AnimatedCellProps<T> {
  info: ListRenderItemInfo<T>;
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  effectiveEntering?: AnimationProp;
  effectiveExiting?: AnimationProp;
  effectiveLayout?: LayoutProp;
  staggerEntering: boolean;
  staggerDelay: number;
  animatedListStyle: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
}
