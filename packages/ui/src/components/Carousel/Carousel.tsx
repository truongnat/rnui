import React from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    SharedValue,
} from "react-native-reanimated";
import { useCarousel, useComponentTokens } from "@rnui/headless";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface CarouselProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemWidth?: number;
    gap?: number;
    height?: number;
    showPagination?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export function Carousel<T>({
    data,
    renderItem,
    itemWidth = SCREEN_WIDTH,
    gap = 0,
    height = 200,
    showPagination = true,
    loop = false,
    autoPlay = false,
    autoPlayInterval = 3000,
}: CarouselProps<T>) {
    const { carousel } = useComponentTokens();
    const {
        scrollViewRef,
        scrollX,
        displayData,
        snapToOffsets,
        onScroll,
        onMomentumScrollEnd,
        itemStep,
        n,
    } = useCarousel({
        data,
        itemWidth,
        gap,
        loop,
        autoPlay,
        autoPlayInterval,
    });

    return (
        <View style={{ height }}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToOffsets={snapToOffsets}
                snapToAlignment="start"
                onScroll={onScroll}
                scrollEventThrottle={16}
                onMomentumScrollEnd={onMomentumScrollEnd}
                contentContainerStyle={{
                    paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2,
                    gap,
                }}
            >
                {displayData.map((item: T, index: number) => {
                    return (
                        <View key={index} style={{ width: itemWidth, height }}>
                            {/* For loop mode, pass original data index */}
                            {renderItem(item, loop ? (index - 1 + n) % n : index)}
                        </View>
                    );
                })}
            </ScrollView>

            {showPagination && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: carousel.pagination.marginTop,
                        gap: carousel.pagination.gap,
                    }}
                >
                    {data.map((_, i) => {
                        return (
                            <PaginationDot
                                key={i}
                                index={i}
                                scrollX={scrollX}
                                itemStep={itemStep}
                                isLoop={loop}
                                n={n}
                            />
                        );
                    })}
                </View>
            )}
        </View>
    );
}

function PaginationDot({
    index,
    scrollX,
    itemStep,
    isLoop,
    n,
}: {
    index: number;
    scrollX: SharedValue<number>;
    itemStep: number;
    isLoop: boolean;
    n: number;
}) {
    const { carousel } = useComponentTokens();
    const dotStyle = useAnimatedStyle(() => {
        let activeIndex = scrollX.value / itemStep;
        if (isLoop) {
            activeIndex = activeIndex - 1;
            if (activeIndex < 0) activeIndex = n - 1;
            if (activeIndex >= n) activeIndex = 0;
        }

        const opacity = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [carousel.dot.inactive.opacity, 1, carousel.dot.inactive.opacity],
            Extrapolation.CLAMP
        );

        const width = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [carousel.dot.inactive.width, carousel.dot.active.width, carousel.dot.inactive.width],
            Extrapolation.CLAMP
        );

        return {
            width,
            opacity,
            backgroundColor: carousel.dot.active.bg,
            height: carousel.dot.height,
            borderRadius: carousel.dot.borderRadius,
        };
    });

    return <Animated.View style={dotStyle} />;
}
