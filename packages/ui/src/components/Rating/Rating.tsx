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
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  onChange?: (value: number) => void;
}

const SIZE_MAP = { sm: 16, md: 22, lg: 28 } as const;

export function Rating({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  icon,
  emptyIcon,
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

  const display = ratingValue;

  const renderStar = (filled: boolean, idx: number) => {
    const fontSize = SIZE_MAP[size];
    const color = filled ? tokens.color.brand.default : tokens.color.border.default;

    if (filled && icon) return icon;
    if (!filled && emptyIcon) return emptyIcon;

    return (
      <Text style={{ fontSize, color, marginHorizontal: 2 }}>
        *
      </Text>
    );
  };

  const handlePress = (index: number) => {
    if (disabled || readOnly) return;
    const next = Math.max(0, Math.min(max, index + 1));
    const snapped = Math.round(next / precision) * precision;
    setValue(snapped);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = display >= i + 1;
        return (
          <Pressable
            key={i}
            onPress={() => handlePress(i)}
            disabled={disabled || readOnly}
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            {renderStar(filled, i)}
          </Pressable>
        );
      })}
    </View>
  );
}
