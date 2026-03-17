import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { useSwitch, useTokens } from "@rnui/headless";
import { spring } from "@rnui/tokens";
import type { UseSwitchOptions } from "@rnui/headless";

export interface SwitchProps extends UseSwitchOptions {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const TRACK = {
  sm: { width: 36, height: 20, radius: 10, thumbSize: 16, thumbOffset: 2 },
  md: { width: 46, height: 26, radius: 13, thumbSize: 22, thumbOffset: 2 },
  lg: { width: 56, height: 30, radius: 15, thumbSize: 26, thumbOffset: 2 },
};

export function Switch({ label, description, size = "md", ...hookOptions }: SwitchProps) {
  const tokens = useTokens();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);

  const t = TRACK[size];
  const thumbTravel = t.width - t.thumbSize - t.thumbOffset * 2;

  // Shared value 0 = off, 1 = on
  const progress = useSharedValue(isOn ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isOn ? 1 : 0, spring.snappy);
  }, [isOn]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [tokens.color.border.default, tokens.color.brand.default]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * thumbTravel }],
  }));

  return (
    <Pressable
      onPress={toggle}
      disabled={isDisabled}
      style={{ flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? 0.4 : 1 }}
      {...accessibilityProps}
    >
      {/* Track */}
      <Animated.View
        style={[
          {
            width: t.width,
            height: t.height,
            borderRadius: t.radius,
            justifyContent: "center",
            padding: t.thumbOffset,
          },
          trackStyle,
        ]}
      >
        {/* Thumb */}
        <Animated.View
          style={[
            {
              width: t.thumbSize,
              height: t.thumbSize,
              borderRadius: t.thumbSize / 2,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 2,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>

      {(label || description) && (
        <View style={{ flex: 1 }}>
          {label && (
            <Text style={{ fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium }}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 }}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}