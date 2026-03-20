import React, { useRef } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    SharedValue,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

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
    const tokens = useTokens();
    const scrollX = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const isJumping = useRef(false);
    const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    const n = data.length;

    // For loop mode, prepend clone of last item, append clone of first item
    const displayData = React.useMemo(() => {
        if (!loop || n < 2) return data;
        return [data[n - 1], ...data, data[0]];
    }, [data, loop, n]);

    const itemStep = itemWidth + gap;

    const snapToOffsets = displayData.map((_, i) => i * itemStep);

    // Set initial position to first real item (index=1 for loop mode)
    React.useEffect(() => {
        if (loop && n >= 2) {
            // Use requestAnimationFrame to ensure ScrollView is mounted
            requestAnimationFrame(() => {
                scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
                scrollX.value = itemStep;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-play functionality
    const goToNextSlide = React.useCallback(() => {
        if (!loop || n < 2) {
            // Non-loop mode: go to next or wrap to start
            const currentIndex = Math.round(scrollX.value / itemStep);
            const nextIndex = currentIndex >= n - 1 ? 0 : currentIndex + 1;
            scrollViewRef.current?.scrollTo({ x: nextIndex * itemStep, animated: true });
        } else {
            // Loop mode: just scroll right, momentum will handle wrapping
            const currentIndex = Math.round(scrollX.value / itemStep);
            const nextX = (currentIndex + 1) * itemStep;
            // Don't scroll if we're at the end (will be handled by momentum)
            if (nextX < displayData.length * itemStep) {
                scrollViewRef.current?.scrollTo({ x: nextX, animated: true });
            }
        }
    }, [loop, n, itemStep, scrollX, displayData.length]);

    React.useEffect(() => {
        if (autoPlay) {
            autoPlayTimer.current = setInterval(() => {
                requestAnimationFrame(() => {
                    goToNextSlide();
                });
            }, autoPlayInterval);
        }
        return () => {
            if (autoPlayTimer.current) {
                clearInterval(autoPlayTimer.current);
            }
        };
    }, [autoPlay, autoPlayInterval, goToNextSlide]);

    const handleScroll = (e: any) => {
        scrollX.value = e.nativeEvent.contentOffset.x;
        // Reset timer on manual scroll
        if (autoPlayTimer.current) {
            clearInterval(autoPlayTimer.current);
            autoPlayTimer.current = setInterval(goToNextSlide, autoPlayInterval);
        }
    };

    const handleMomentumScrollEnd = (e: any) => {
        if (!loop || n < 2 || isJumping.current) return;

        const x = Math.round(e.nativeEvent.contentOffset.x);
        const lastCloneX = (displayData.length - 1) * itemStep;

        if (x <= 0) {
            // At clone of last item (index 0) → jump to real last item
            isJumping.current = true;
            scrollViewRef.current?.scrollTo({ x: (n) * itemStep, animated: false });
            scrollX.value = n * itemStep;
            setTimeout(() => { isJumping.current = false; }, 50);
        } else if (x >= lastCloneX) {
            // At clone of first item (index n+1) → jump to real first item
            isJumping.current = true;
            scrollViewRef.current?.scrollTo({ x: itemStep, animated: false });
            scrollX.value = itemStep;
            setTimeout(() => { isJumping.current = false; }, 50);
        }
    };

    return (
        <View style={{ height }}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToOffsets={snapToOffsets}
                snapToAlignment="start"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                contentContainerStyle={{
                    paddingHorizontal: (SCREEN_WIDTH - itemWidth) / 2,
                    gap,
                }}
            >
                {displayData.map((item, index) => {
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
                        marginTop: tokens.spacing[4],
                        gap: 6,
                    }}
                >
                    {data.map((_, i) => {
                        return (
                            <PaginationDot
                                key={i}
                                index={i}
                                scrollX={scrollX}
                                itemStep={itemStep}
                                tokens={tokens}
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
    tokens,
    isLoop,
    n,
}: {
    index: number;
    scrollX: SharedValue<number>;
    itemStep: number;
    tokens: any;
    isLoop: boolean;
    n: number;
}) {
    const dotStyle = useAnimatedStyle(() => {
        // In loop mode, scrollX=0 is the clone of last item.
        // Real item i is at x = (i+1)*itemStep.
        // Active real index = scrollX/itemStep - 1 (in loop mode)
        let activeIndex = scrollX.value / itemStep;
        if (isLoop) {
            activeIndex = activeIndex - 1;
            // Normalize wrapping clones for dot display
            if (activeIndex < 0) activeIndex = n - 1;
            if (activeIndex >= n) activeIndex = 0;
        }

        const opacity = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [0.3, 1, 0.3],
            Extrapolation.CLAMP
        );

        const width = interpolate(
            activeIndex,
            [index - 1, index, index + 1],
            [8, 20, 8],
            Extrapolation.CLAMP
        );

        return {
            width,
            opacity,
            backgroundColor: tokens.color.brand.default,
            height: 8,
            borderRadius: 4,
        };
    });

    return <Animated.View style={dotStyle} />;
}
