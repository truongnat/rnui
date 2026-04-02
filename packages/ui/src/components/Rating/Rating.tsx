import React, { memo, useCallback } from "react";
import {
  View,
  Pressable,
  Text,
  AccessibilityInfo,
  type AccessibilityActionEvent,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { spring } from "@truongdq01/tokens";
import { useRating, useComponentTokens, useReduceMotionEnabled } from "@truongdq01/headless";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";

const DEFAULT_ICON_NAMES = {
  filled: "star" as const,
  empty: "star" as const,
  half: "starHalf" as const,
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Star row item: press feedback uses Reanimated; stars are not separate a11y nodes.
 * Consumers should pass a stable `onChange` (e.g. `useCallback`) so `Rating` memo stays effective.
 */
export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
  /** When true, show numeric value next to stars (e.g. `3/5`). */
  showValue?: boolean;
  /** Where `showValue` sits relative to the star row. Default `end`. */
  valuePosition?: "start" | "end";
  /** Tighter gap between stars (uses `rating.containerCompact`). */
  compact?: boolean;
  /**
   * Icons for filled / empty / half. Empty uses the same glyph as `filled` with empty token color
   * when both default to `star`.
   */
  iconNames?: { filled: IconName; empty: IconName; half: IconName };
}

type RatingStarButtonProps = {
  index: number;
  iconSize: number;
  iconName: IconName;
  iconColor: string;
  disabled: boolean;
  readOnly: boolean;
  reduceMotion: boolean;
  onPress: (index: number) => void;
};

function RatingStarButton({
  index,
  iconSize,
  iconName,
  iconColor,
  disabled,
  readOnly,
  reduceMotion,
  onPress,
}: RatingStarButtonProps) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled || readOnly || reduceMotion) return;
    scale.value = withSpring(1.12, spring.snappy);
  };

  const handlePressOut = () => {
    if (disabled || readOnly) return;
    if (reduceMotion) {
      scale.value = 1;
      return;
    }
    scale.value = withSpring(1, spring.snappy);
  };

  return (
    <Pressable
      accessibilityElementsHidden
      importantForAccessibility="no"
      accessible={false}
      disabled={disabled || readOnly}
      onPress={() => onPress(index)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View style={animStyle}>
        <Icon size={iconSize} color={iconColor}>
          {iconName}
        </Icon>
      </Animated.View>
    </Pressable>
  );
}

function RatingInner({
  value,
  defaultValue,
  max = 5,
  precision = 1,
  readOnly = false,
  disabled = false,
  size = "md",
  onChange,
  showValue = false,
  valuePosition = "end",
  compact = false,
  iconNames: iconNamesProp,
}: RatingProps) {
  const { rating } = useComponentTokens();
  const reduceMotion = useReduceMotionEnabled();
  const icons = { ...DEFAULT_ICON_NAMES, ...iconNamesProp };

  const { value: ratingValue, setValue, precision: effectivePrecision } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    onChange,
  });

  const iconSize = rating.size[size];
  const activeColor = rating.star.filled.color;
  const inactiveColor = rating.star.empty.color;
  const halfColor = rating.star.half.color;

  const announceValue = useCallback(
    (next: number) => {
      // TODO i18n — fixed English for library default
      const announce = AccessibilityInfo.announceForAccessibility;
      if (typeof announce === "function") {
        announce(`${next} out of ${max} stars`);
      }
    },
    [max]
  );

  const handlePress = (index: number) => {
    if (disabled || readOnly) return;
    const tapTarget = index + 1;
    const snapped = Math.round(tapTarget / effectivePrecision) * effectivePrecision;
    const newVal = ratingValue === snapped ? 0 : snapped;
    setValue(newVal);
    announceValue(newVal);
  };

  const applyAccessibilityStep = (delta: 1 | -1) => {
    if (disabled || readOnly) return;
    const raw = ratingValue + delta * effectivePrecision;
    const snapped = Math.round(raw / effectivePrecision) * effectivePrecision;
    const next = clamp(snapped, 0, max);
    if (next !== ratingValue) {
      setValue(next);
      announceValue(next);
    }
  };

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const name = event.nativeEvent.actionName;
    if (name === "increment") {
      applyAccessibilityStep(1);
    } else if (name === "decrement") {
      applyAccessibilityStep(-1);
    }
  };

  const interactive = !readOnly && !disabled;
  const rowStyle = compact ? rating.containerCompact : rating.container;

  const valueLabel = (
    <Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      accessible={false}
      style={{ fontSize: iconSize * 0.7, color: activeColor, marginHorizontal: 4 }}
    >
      {`${ratingValue}/${max}`}
    </Text>
  );

  const starsRow = (
    <View
      accessible={interactive || readOnly || disabled}
      accessibilityRole={interactive ? "adjustable" : "none"}
      accessibilityValue={
        interactive
          ? {
              min: 0,
              max,
              now: ratingValue,
            }
          : undefined
      }
      accessibilityHint={
        interactive
          ? "Swipe up or down to adjust rating" // TODO i18n
          : undefined
      }
      accessibilityLabel={
        !interactive ? `${ratingValue} out of ${max} stars` : undefined
      }
      onAccessibilityAction={interactive ? onAccessibilityAction : undefined}
      style={rowStyle}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starNumber = i + 1;
        const filled = ratingValue >= starNumber;
        const halfFilled =
          !filled && ratingValue >= starNumber - 0.5 && effectivePrecision <= 0.5;

        let iconName: IconName = icons.empty;
        if (halfFilled) iconName = icons.half;
        else if (filled) iconName = icons.filled;
        const iconColor = halfFilled ? halfColor : filled ? activeColor : inactiveColor;

        return (
          <RatingStarButton
            key={i}
            index={i}
            iconSize={iconSize}
            iconName={iconName}
            iconColor={iconColor}
            disabled={disabled}
            readOnly={readOnly}
            reduceMotion={reduceMotion}
            onPress={handlePress}
          />
        );
      })}
    </View>
  );

  if (!showValue) {
    return <View>{starsRow}</View>;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {valuePosition === "start" ? valueLabel : null}
      {starsRow}
      {valuePosition === "end" ? valueLabel : null}
    </View>
  );
}

export const Rating = memo(RatingInner);
Rating.displayName = "Rating";
