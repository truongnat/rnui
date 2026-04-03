import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { useRadioGroup, useTokens, useComponentTokens, useReduceMotionEnabled } from "@truongdq01/headless";
import { spring } from "@truongdq01/tokens";
import type { UseRadioGroupOptions } from "@truongdq01/headless";

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

export function RadioItem<T = string>({
  label,
  description,
  disabled = false,
  isSelected,
  onPress,
  size = "md",
}: RadioItemProps<T>) {
  const tokens = useTokens();
  const { radio } = useComponentTokens();
  const reduceMotion = useReduceMotionEnabled();

  const outerSize = radio.container[size];
  const innerSize = radio.dot[size];
  const snappySpring = spring.snappy;

  const scale = useSharedValue(isSelected ? 1 : 0);
  const ringFill = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    const target = isSelected ? 1 : 0;
    scale.value = reduceMotion ? target : withSpring(target, snappySpring);
    ringFill.value = reduceMotion ? target : withSpring(target, snappySpring);
  }, [isSelected, snappySpring, reduceMotion, scale, ringFill]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const outerRingStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(ringFill.value, [0, 1], [outerSize.borderWidth, 0]),
    borderColor: interpolateColor(ringFill.value, [0, 1], [radio.colors.borderOff, "transparent"]),
    backgroundColor: interpolateColor(ringFill.value, [0, 1], [radio.colors.bgOff, radio.colors.borderOn]),
  }));

  const handlePress = () => {
    if (!isSelected && !reduceMotion) {
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
        opacity: disabled ? radio.colors.disabledOpacity : 1,
      }}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
    >
      {/* Outer ring */}
      <Animated.View
        style={[
          {
            width: outerSize.width,
            height: outerSize.height,
            borderRadius: outerSize.borderRadius,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          },
          outerRingStyle,
        ]}
      >
        {/* Inner dot */}
        <Animated.View
          style={[
            {
              width: innerSize.width,
              height: innerSize.height,
              borderRadius: innerSize.borderRadius,
              backgroundColor: tokens.color.text.onBrand,
            },
            dotStyle,
          ]}
        />
      </Animated.View>

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