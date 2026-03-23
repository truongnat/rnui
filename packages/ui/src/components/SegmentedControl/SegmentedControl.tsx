import React, { useState } from "react";
import { View, Pressable, Text, LayoutChangeEvent } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
} from "react-native-reanimated";
import { useTokens, useComponentTokens, useSegmentedControl } from "@truongnat/headless";
import { spring } from "@truongnat/tokens";

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
    const { segmentedControl } = useComponentTokens();
    const { isSelected, setSelectedIndex, getTabProps } = useSegmentedControl({
        value: selectedIndex,
        onChange: (val) => onChange(val as number),
        disabled,
    });

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

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: segmentWidth,
    }));

    return (
        <View
            onLayout={onLayout}
            style={[
                segmentedControl.container,
                { height, borderRadius: height / 2, opacity: disabled ? 0.6 : 1 }
            ]}
        >
            {containerWidth > 0 && (
                <Animated.View
                    style={[
                        segmentedControl.item.active,
                        { borderRadius: (height - 4) / 2 },
                        indicatorStyle,
                    ]}
                />
            )}

            {options.map((option, index) => {
                const selected = isSelected(index as any);
                return (
                    <Pressable
                        key={option}
                        disabled={disabled}
                        {...getTabProps(index as any, index)}
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
                                fontWeight: selected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
                                color: selected ? segmentedControl.item.activeText.color : segmentedControl.item.text.color,
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
