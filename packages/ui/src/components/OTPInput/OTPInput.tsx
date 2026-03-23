import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    withSequence,
} from "react-native-reanimated";
import { useComponentTokens, useTokens, useOTPInput } from "@truongdq01/headless";

export interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    onComplete,
    disabled = false,
}: OTPInputProps) {
    const { otpInput } = useComponentTokens();
    const { inputRef, isFocused, handlePress, getOtpProps } = useOTPInput({
        length,
        value,
        onChange,
        onComplete,
        disabled,
    });

    return (
        <View style={{ width: "100%" }}>
            <TextInput
                ref={inputRef as any}
                caretHidden
                style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    opacity: 0,
                }}
                {...getOtpProps()}
            />

            <Pressable
                onPress={handlePress}
                style={[otpInput.container, { width: "100%" }]}
            >
                {Array.from({ length }).map((_, index) => {
                    const char = value[index] || "";
                    const isCurrentFocus = isFocused && value.length === index;
                    const isFilled = char.length > 0;
                    const isLastCellWhenFull = isFocused && value.length === length && index === length - 1;
                    const hasFocusBorder = isCurrentFocus || isLastCellWhenFull;

                    return (
                        <OTPCell
                            key={index}
                            char={char}
                            isFocused={hasFocusBorder}
                            isFilled={isFilled}
                        />
                    );
                })}
            </Pressable>
        </View>
    );
}

function OTPCell({
    char,
    isFocused,
    isFilled,
}: {
    char: string;
    isFocused: boolean;
    isFilled: boolean;
}) {
    const { otpInput } = useComponentTokens();
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isFocused) {
            scale.value = withSequence(
                withTiming(1.1, { duration: 150 }),
                withTiming(1, { duration: 150 })
            );
        } else if (isFilled) {
            scale.value = withSpring(1, { damping: 10, stiffness: 200 });
        } else {
            scale.value = withTiming(1, { duration: 150 });
        }
    }, [isFocused, isFilled]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            borderColor: isFocused ? otpInput.cell.focused.borderColor : (isFilled ? otpInput.cell.borderColor : otpInput.cell.borderColor),
            backgroundColor: isFilled ? otpInput.cell.backgroundColor : otpInput.cell.backgroundColor,
        };
    });

    return (
        <Animated.View
            style={[
                otpInput.cell,
                { flex: 1, aspectRatio: 0.8 },
                animatedStyle,
            ]}
        >
            <Text
                style={{
                    fontSize: otpInput.cell.fontSize,
                    fontWeight: otpInput.cell.fontWeight,
                    color: otpInput.cell.color,
                }}
            >
                {char}
            </Text>
        </Animated.View>
    );
}
