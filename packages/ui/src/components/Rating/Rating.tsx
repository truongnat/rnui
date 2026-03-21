import React from "react";
import { View, Pressable } from "react-native";
import { useRating, useTokens, useComponentTokens } from "@rnui/headless";
import { Icon } from "../Icon";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
}

export function Rating({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  onChange,
}: RatingProps) {
  const { rating } = useComponentTokens();
  const tokens = useTokens();
  const { value: ratingValue, setValue } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange,
  });

  const iconSize = (rating.size as any)[size];
  const activeColor = (rating as any).star.filled.color;
  const inactiveColor = (rating as any).star.empty.color;

  const handlePress = (index: number) => {
    if (disabled || readOnly) return;
    const next = index + 1;
    // Toggle off if same value; otherwise set to pressed star
    const snapped = Math.round(next / precision) * precision;
    setValue(ratingValue === snapped ? 0 : snapped);
  };

  return (
    <View style={(rating as any).container}>
      {Array.from({ length: max }).map((_, i) => {
        const starNumber = i + 1;
        const filled = ratingValue >= starNumber;
        const halfFilled = !filled && ratingValue >= starNumber - 0.5 && precision <= 0.5;

        return (
          <Pressable
            key={i}
            onPress={() => handlePress(i)}
            disabled={disabled || readOnly}
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            <Icon 
              size={iconSize} 
              color={filled || halfFilled ? activeColor : inactiveColor}
            >
              {filled ? "star" : halfFilled ? "star" : "star"} 
            </Icon>
          </Pressable>
        );
      })}
    </View>
  );
}
