import React from "react";
import { StyleProp, ViewStyle, ListRenderItemInfo } from "react-native";
import { FlashListProps } from "@shopify/flash-list";
export interface AnimatedListProps<T> extends Omit<FlashListProps<T>, "renderItem"> {
    /** The items to render */
    data: T[] | null | undefined;
    /** Function to render each item. Use `index` to stagger entering animations if desired. */
    renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
    /** The estimated height of an item in the list. Required for FlashList. */
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
 */
export declare const AnimatedList: <T>(props: AnimatedListProps<T> & {
    ref?: React.Ref<any>;
}) => React.ReactElement;
//# sourceMappingURL=AnimatedList.d.ts.map