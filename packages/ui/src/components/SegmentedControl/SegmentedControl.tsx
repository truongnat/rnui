import React, { useState, useRef } from "react";
import { View, Pressable, Text, LayoutChangeEvent } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
} from "react-native-reanimated";
import { useTokens, useComponentTokens, useSegmentedControl } from "@truongdq01/headless";
import { spring } from "@truongdq01/tokens";

/** Must match `segmentedControlTokens().container.padding` (inset track for the sliding pill). */
const TRACK_PADDING = 2;

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
    const [layoutReady, setLayoutReady] = useState(false);

    const innerWidth = Math.max(0, containerWidth - TRACK_PADDING * 2);
    const segmentWidth = options.length > 0 ? innerWidth / options.length : 0;
    const translateX = useSharedValue(0);
    const didInitialLayout = useRef(false);

    React.useEffect(() => {
        if (segmentWidth <= 0) return;
        const target = selectedIndex * segmentWidth;
        if (!didInitialLayout.current) {
            didInitialLayout.current = true;
            translateX.value = target;
            return;
        }
        translateX.value = withSpring(target, spring.snappy);
    }, [selectedIndex, segmentWidth, translateX]);

    const onLayout = (e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        setContainerWidth(w);
        if (w > 0) setLayoutReady(true);
    };

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: segmentWidth,
    }));

    const showIndicator = layoutReady && segmentWidth > 0;

    return (
        <View
            onLayout={onLayout}
            style={[
                segmentedControl.container,
                { height, borderRadius: height / 2, opacity: disabled ? 0.6 : 1 }
            ]}
        >
            {showIndicator && (
                <Animated.View
                    style={[
                        segmentedControl.item.active,
                        {
                            position: "absolute",
                            left: TRACK_PADDING,
                            top: TRACK_PADDING,
                            bottom: TRACK_PADDING,
                            borderRadius: (height - TRACK_PADDING * 2) / 2,
                        },
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
