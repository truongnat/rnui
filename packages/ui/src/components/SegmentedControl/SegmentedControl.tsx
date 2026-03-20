import React, { useState } from "react";
import { View, Pressable, Text, LayoutChangeEvent } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    interpolateColor,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";
import { spring } from "@rnui/tokens";

export interface SegmentedControlProps {
    options: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
    height?: number;
    disabled?: boolean;
}

export function SegmentedControl({
    options,
    selectedIndex,
    onChange,
    height = 36,
    disabled = false,
}: SegmentedControlProps) {
    const tokens = useTokens();
    const [containerWidth, setContainerWidth] = useState(0);

    const segmentWidth = containerWidth / options.length;
    const translateX = useSharedValue(selectedIndex * segmentWidth);

    React.useEffect(() => {
        if (segmentWidth > 0) {
            translateX.value = withSpring(selectedIndex * segmentWidth, spring.snappy);
        }
    }, [selectedIndex, segmentWidth, translateX]);

    const onLayout = (e: LayoutChangeEvent) => {
        setContainerWidth(e.nativeEvent.layout.width);
    };

    const indicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            width: segmentWidth,
        };
    });

    return (
        <View
            onLayout={onLayout}
            style={{
                flexDirection: "row",
                height,
                backgroundColor: tokens.color.bg.subtle,
                borderRadius: height / 2,
                padding: 2,
                position: "relative",
                opacity: disabled ? tokens.opacity[60] : 1,
            }}
        >
            {containerWidth > 0 && (
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: 2,
                            bottom: 2,
                            left: 2,
                            backgroundColor: tokens.color.surface.default,
                            borderRadius: (height - 4) / 2,
                            ...tokens.shadow.sm,
                        },
                        indicatorStyle,
                    ]}
                />
            )}

            {options.map((option, index) => {
                const isSelected = selectedIndex === index;
                return (
                    <Pressable
                        key={option}
                        disabled={disabled}
                        onPress={() => onChange(index)}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: tokens.fontSize.sm,
                                fontWeight: isSelected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
                                color: isSelected ? tokens.color.text.primary : tokens.color.text.secondary,
                            }}
                        >
                            {option}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
