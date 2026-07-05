import type React from 'react';
import type { ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
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

export interface AnimatedListRef {
  /**
   * FlashList only — call immediately before mutating `data` when using
   * enter, exit, or layout animations so recycled cells animate correctly.
   */
  prepareForLayoutAnimationRender?: () => void;
  scrollToOffset?: (params: { offset: number; animated?: boolean }) => void;
  scrollToIndex?: (params: {
    index: number;
    animated?: boolean;
    viewOffset?: number;
  }) => void;
}

export interface AnimatedListProps<T>
  extends Omit<FlashListProps<T>, 'renderItem' | 'contentContainerStyle'> {
  /** Optional ID for testing or automation */
  id?: string;
  /** The items to render */
  data: readonly T[] | null | undefined;
  /** Function to render each item. Use `index` to stagger entering animations if desired. */
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  /**
   * @deprecated FlashList v2 auto-measures item sizes; this prop is ignored and
   * no longer forwarded. Kept optional for backward compatibility only.
   */
  estimatedItemSize?: number;
  /** Apply entering animation to items as they appear. Recommended: FadeInDown */
  itemEntering?: AnimationProp;
  /** Apply exiting animation to items as they disappear */
  itemExiting?: AnimationProp;
  /**
   * Layout animation when items move (reorder / insert). Expensive on long lists —
   * prefer enter/exit only for prepend/remove. Omit for best scroll FPS.
   */
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
  /** Style for the scroll viewport (list shell). */
  style?: StyleProp<ViewStyle>;
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
