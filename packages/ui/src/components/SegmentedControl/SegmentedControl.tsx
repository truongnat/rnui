import React, { useState, useRef } from "react";
import { View, Pressable, Text, type LayoutChangeEvent } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
} from "react-native-reanimated";
import { useTokens, useComponentTokens, useSegmentedControl } from "@truongdq01/headless";
const TRACK_PADDING = 2;

/** Critically damped — fast, no overshoot (replaces snappy spring for segment indicator). */
const INDICATOR_SPRING = { damping: 28, stiffness: 300, mass: 0.8 };

export type SegmentedControlSize = "sm" | "md" | "lg";

export type SegmentedOption = string | { label: string; icon?: React.ReactNode };

export interface SegmentedControlProps {
    options: SegmentedOption[];
    selectedIndex: number;
    onChange: (index: number) => void;
    /** sm = 32, md = 36, lg = 44. Overridden by explicit `height`. */
    size?: SegmentedControlSize;
    /** Explicit height (overrides size). */
    height?: number;
    disabled?: boolean;
}

const SIZE_HEIGHT: Record<SegmentedControlSize, number> = { sm: 32, md: 36, lg: 44 };
const SIZE_FONT: Record<SegmentedControlSize, "xs" | "sm" | "md"> = { sm: "xs", md: "sm", lg: "md" };

function getLabel(opt: SegmentedOption): string {
    return typeof opt === "string" ? opt : opt.label;
}

function getIcon(opt: SegmentedOption): React.ReactNode | undefined {
    return typeof opt === "string" ? undefined : opt.icon;
}

export function SegmentedControl({
    options,
    selectedIndex,
    onChange,
    size = "md",
    height: heightProp,
    disabled = false,
}: SegmentedControlProps) {
    const tokens = useTokens();
    const { segmentedControl } = useComponentTokens();
    const { isSelected, setSelectedIndex, getTabProps } = useSegmentedControl({
        value: selectedIndex,
        onChange: (val) => onChange(val as number),
        disabled,
    });

    const resolvedHeight = heightProp ?? SIZE_HEIGHT[size];
    const fontKey = SIZE_FONT[size];

    const [containerWidth, setContainerWidth] = useState(0);
    const [layoutReady, setLayoutReady] = useState(false);

    const innerWidth = Math.max(0, containerWidth - TRACK_PADDING * 2);
    const segmentWidth = options.length > 0 ? innerWidth / options.length : 0;
    const translateX = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);
    const didInitialLayout = useRef(false);

    React.useEffect(() => {
        if (segmentWidth <= 0) return;
        const target = selectedIndex * segmentWidth;
        if (!didInitialLayout.current) {
            didInitialLayout.current = true;
            translateX.value = target;
            indicatorWidth.value = segmentWidth;
            return;
        }
        translateX.value = withSpring(target, INDICATOR_SPRING);
        indicatorWidth.value = withSpring(segmentWidth, INDICATOR_SPRING);
    }, [selectedIndex, segmentWidth, translateX, indicatorWidth]);

    const onLayout = (e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        setContainerWidth(w);
        if (w > 0) setLayoutReady(true);
    };

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: indicatorWidth.value,
    }));

    const showIndicator = layoutReady && segmentWidth > 0;

    return (
        <View
            onLayout={onLayout}
            style={[
                segmentedControl.container,
                { height: resolvedHeight, borderRadius: resolvedHeight / 2, opacity: disabled ? 0.6 : 1 },
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
                            borderRadius: (resolvedHeight - TRACK_PADDING * 2) / 2,
                        },
                        indicatorStyle,
                    ]}
                />
            )}

            {options.map((option, index) => {
                const selected = isSelected(index as any);
                const label = getLabel(option);
                const icon = getIcon(option);
                return (
                    <Pressable
                        key={label}
                        disabled={disabled}
                        {...getTabProps(index as any, index)}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: icon ? 6 : 0,
                            zIndex: 1,
                        }}
                    >
                        {icon}
                        <Text
                            style={{
                                fontSize: tokens.fontSize[fontKey],
                                fontWeight: selected ? tokens.fontWeight.semibold : tokens.fontWeight.medium,
                                color: selected ? segmentedControl.item.activeText.color : segmentedControl.item.text.color,
                            }}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
