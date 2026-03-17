import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRadioGroup, useTokens } from "@rnui/headless";
import { spring } from "@rnui/tokens";
import type { UseRadioGroupOptions } from "@rnui/headless";

// ─── RadioItem ────────────────────────────────────────────────────

export interface RadioItemProps<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
  isSelected: boolean;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
}

const OUTER = { sm: 18, md: 22, lg: 26 };
const INNER = { sm: 8, md: 10, lg: 12 };

export function RadioItem<T = string>({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md",
}: RadioItemProps<T>) {
  const tokens = useTokens();
  const outerSize = OUTER[size];
  const innerSize = INNER[size];
  const snappySpring = spring.snappy;

  const scale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    scale.value = withSpring(isSelected ? 1 : 0, snappySpring);
  }, [isSelected, snappySpring]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const handlePress = () => {
    if (!isSelected) {
      scale.value = withSpring(0.6, { damping: 12, stiffness: 200 }, () => {
        "worklet";
        scale.value = withSpring(1, snappySpring);
      });
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        opacity: disabled ? 0.4 : 1,
      }}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
    >
      {/* Outer ring */}
      <View
        style={{
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderWidth: isSelected ? 0 : 1.5,
          borderColor: isSelected ? "transparent" : tokens.color.border.default,
          backgroundColor: isSelected ? tokens.color.brand.default : "transparent",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {/* Inner dot */}
        <Animated.View
          style={[
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              backgroundColor: "#fff",
            },
            dotStyle,
          ]}
        />
      </View>

      {(label || description) && (
        <View style={{ flex: 1, paddingTop: 1 }}>
          {label && (
            <Text
              style={{
                fontSize: tokens.fontSize.md,
                color: tokens.color.text.primary,
                fontWeight: tokens.fontWeight.medium,
              }}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              style={{
                fontSize: tokens.fontSize.sm,
                color: tokens.color.text.secondary,
                marginTop: 2,
              }}
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

// ─── RadioGroup ───────────────────────────────────────────────────

export interface RadioOption<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps<T = string> extends UseRadioGroupOptions<T> {
  options: RadioOption<T>[];
  label?: string;
  direction?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
}

export function RadioGroup<T = string>({
  options,
  label,
  direction = "vertical",
  size = "md",
  ...hookOptions
}: RadioGroupProps<T>) {
  const tokens = useTokens();
  const { isSelected, getItemProps } = useRadioGroup(hookOptions);

  return (
    <View>
      {label && (
        <Text
          style={{
            fontSize: tokens.fontSize.sm,
            fontWeight: tokens.fontWeight.medium,
            color: tokens.color.text.secondary,
            marginBottom: tokens.spacing[2],
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: direction === "horizontal" ? "row" : "column",
          flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
          gap: direction === "horizontal" ? tokens.spacing[4] : tokens.spacing[3],
        }}
      >
        {options.map((option) => {
          const itemProps = getItemProps(option.value, option.disabled);
          return (
            <RadioItem
              key={String(option.value)}
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
              isSelected={isSelected(option.value)}
              onPress={itemProps.onPress}
              size={size}
            />
          );
        })}
      </View>
    </View>
  );
}