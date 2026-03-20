import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRating, useTokens } from "@rnui/headless";

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

const SIZE_MAP = { sm: 18, md: 24, lg: 32 } as const;

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

  const fontSize = SIZE_MAP[size];
  const activeColor = tokens.color.brand.default;
  const inactiveColor = tokens.color.border.default;

  const handlePress = (index: number) => {
    if (disabled || readOnly) return;
    const next = index + 1;
    // Toggle off if same value; otherwise set to pressed star
    const snapped = Math.round(next / precision) * precision;
    setValue(ratingValue === snapped ? 0 : snapped);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
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
            <Text style={{ fontSize, color: filled || halfFilled ? activeColor : inactiveColor, lineHeight: fontSize * 1.2 }}>
              {filled ? "★" : halfFilled ? "⯨" : "☆"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
