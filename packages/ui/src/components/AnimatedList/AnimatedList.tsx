import React, { forwardRef } from "react";
import { View, StyleProp, ViewStyle, LayoutChangeEvent, StyleSheet, ListRenderItemInfo } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";

// Wrapping FlashList with Reanimated to allow layout animations and entering/exiting
const ReanimatedFlashList = Animated.createAnimatedComponent(FlashList);

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

    const AnimatedCell = ({ item, index, target, ...props }: any) => {
        // If staggering, delay the entering animation by index * staggerDelay
        const enteringAnim = staggerEntering && itemEntering?.delay
            ? itemEntering.delay(Math.min(index * staggerDelay, 500))
            : itemEntering;

        return (
            <Animated.View
                entering={enteringAnim}
                exiting={itemExiting}
                layout={itemLayout}
                style={[itemContainerStyle, styles.itemWrapper]}
            >
                {renderItem({ item, index, target, separators: {} as any } as unknown as ListRenderItemInfo<T>)}
            </Animated.View>
        );
    };

    return (
        <ReanimatedFlashList
            ref={ref}
            data={data}
            renderItem={(info) => <AnimatedCell {...info} />}
            {...(flashListProps as any)}
        />
    );
}) as <T>(props: AnimatedListProps<T> & { ref?: React.Ref<any> }) => React.ReactElement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemWrapper: {
        overflow: "hidden",
    },
});
