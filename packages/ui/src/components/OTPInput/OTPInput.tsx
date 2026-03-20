import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    withSequence,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

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
    const tokens = useTokens();
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Add focus pulse effect
    const pulseScale = useSharedValue(1);

    const handlePress = () => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    };

    const handleChange = (text: string) => {
        // Only keep numeric digits and up to `length`
        const numericVal = text.replace(/[^0-9]/g, "").slice(0, length);
        onChange(numericVal);
        if (numericVal.length === length && onComplete) {
            onComplete(numericVal);
        }
    };

    return (
        <View style={{ width: "100%" }}>
            {/* Hidden TextInput for keyboard interaction and auto-fill */}
            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={handleChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                maxLength={length}
                caretHidden
                style={{
                    position: "absolute",
                    width: 0,
                    height: 0,
                    opacity: 0,
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!disabled}
            />

            <Pressable
                onPress={handlePress}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: tokens.spacing[2],
                }}
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
                            tokens={tokens}
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
    tokens,
}: {
    char: string;
    isFocused: boolean;
    isFilled: boolean;
    tokens: any;
}) {
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
            borderColor: isFocused ? tokens.color.brand.default : (isFilled ? tokens.color.border.strong : tokens.color.border.default),
            backgroundColor: isFilled ? tokens.color.surface.raised : tokens.color.surface.default,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    flex: 1,
                    aspectRatio: 0.8,
                    borderRadius: tokens.radius.md,
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                },
                animatedStyle,
            ]}
        >
            <Text
                style={{
                    fontSize: tokens.fontSize["2xl"],
                    fontWeight: tokens.fontWeight.bold,
                    color: tokens.color.text.primary,
                }}
            >
                {char}
            </Text>
        </Animated.View>
    );
}
