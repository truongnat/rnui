import React, { forwardRef, useMemo } from "react";
import { View, StyleProp, ViewStyle, StyleSheet, ListRenderItemInfo } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { useComponentTokens } from "@truongdq01/headless";

// Wrapping FlashList with Reanimated to allow layout animations and entering/exiting
const ReanimatedFlashList = Animated.createAnimatedComponent(FlashList as any) as any;

export interface AnimatedListProps<T> extends Omit<FlashListProps<T>, "renderItem"> {
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
// eslint-disable-next-line react/display-name
export const AnimatedList = forwardRef(<T extends any>(
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
) => {
    const { animatedList } = useComponentTokens();

    const AnimatedCell = (info: any) => {
        const { index } = info;
        // If staggering, delay the entering animation by index * staggerDelay
        const enteringAnim = staggerEntering && itemEntering?.delay
            ? itemEntering.delay(Math.min(index * staggerDelay, 500))
            : itemEntering;

        return (
            <Animated.View
                entering={enteringAnim}
                exiting={itemExiting}
                layout={itemLayout}
                style={[animatedList.item, itemContainerStyle, styles.itemWrapper]}
            >
                {renderItem(info as unknown as ListRenderItemInfo<T>)}
            </Animated.View>
        );
    };

    return (
        <ReanimatedFlashList
            ref={ref}
            data={data}
            renderItem={(info: any) => <AnimatedCell {...info} />}
            {...flashListProps}
            contentContainerStyle={useMemo(() => [
                animatedList.container,
                flashListProps.contentContainerStyle
            ], [animatedList.container, flashListProps.contentContainerStyle])}
        />
    );
}) as <T>(props: AnimatedListProps<T> & { ref?: React.Ref<any> }) => React.ReactElement;

const styles = StyleSheet.create({
    itemWrapper: {
        overflow: "hidden",
    },
});
