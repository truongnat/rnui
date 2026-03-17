import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useCheckbox, useTokens } from "@rnui/headless";
import { spring } from "@rnui/tokens";
import type { UseCheckboxOptions } from "@rnui/headless";

export interface CheckboxProps extends UseCheckboxOptions {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE = { sm: 18, md: 22, lg: 26 };
const ICON_SIZE = { sm: 10, md: 13, lg: 16 };

export function Checkbox({
  label,
  description,
  size = "md",
  ...hookOptions
}: CheckboxProps) {
  const tokens = useTokens();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } =
    useCheckbox(hookOptions);

  const boxSize = SIZE[size];
  const iconSize = ICON_SIZE[size];

  // Animated values
  const scale = useSharedValue(1);
  const fillProgress = useSharedValue(isChecked || isIndeterminate ? 1 : 0);

  React.useEffect(() => {
    fillProgress.value = withSpring(isChecked || isIndeterminate ? 1 : 0, spring.snappy);
  }, [isChecked, isIndeterminate]);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolate(
      fillProgress.value,
      [0, 1],
      [0, 1]
    ) > 0.5
      ? tokens.color.brand.default
      : "transparent",
    borderColor: fillProgress.value > 0.5
      ? tokens.color.brand.default
      : tokens.color.border.default,
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.88, spring.snappy, () => {
      scale.value = withSpring(1, spring.snappy);
    });
    toggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={{ flexDirection: "row", alignItems: "flex-start", gap: 10, opacity: isDisabled ? 0.4 : 1 }}
      {...accessibilityProps}
    >
      <Animated.View
        style={[
          {
            width: boxSize,
            height: boxSize,
            borderRadius: 5,
            borderWidth: 1.5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
          },
          boxStyle,
        ]}
      >
        <Animated.View style={checkStyle}>
          {isIndeterminate ? (
            <View style={{ width: iconSize, height: 2, backgroundColor: "#fff", borderRadius: 1 }} />
          ) : (
            <Text style={{ color: "#fff", fontSize: iconSize, fontWeight: "700", lineHeight: iconSize + 2 }}>
              ✓
            </Text>
          )}
        </Animated.View>
      </Animated.View>

      {(label || description) && (
        <View style={{ flex: 1, paddingTop: 1 }}>
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