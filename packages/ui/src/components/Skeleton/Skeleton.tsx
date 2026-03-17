import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

// ─── Base Skeleton ────────────────────────────────────────────────

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  /** Disable shimmer animation */
  animate?: boolean;
}

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true,
}: SkeletonProps) {
  const tokens = useTokens();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (!animate) return;
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      true
    );
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.6, 1.0]), // Increased visibility
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: borderRadius ?? tokens.radius.sm,
          backgroundColor: tokens.color.bg.emphasis,
        },
        animate && animatedStyle,
      ]}
    />
  );
}

// ─── Skeleton presets ─────────────────────────────────────────────

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
}: {
  lines?: number;
  lastLineWidth?: `${number}%`;
}) {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height={14}
        />
      ))}
    </View>
  );
}

export function SkeletonCard() {
  const tokens = useTokens();
  return (
    <View
      style={{
        padding: tokens.spacing[4],
        borderRadius: tokens.radius.lg,
        borderWidth: 0.5,
        borderColor: tokens.color.border.default,
        backgroundColor: tokens.color.surface.default,
        gap: tokens.spacing[3],
      }}
    >
      <View style={{ flexDirection: "row", gap: tokens.spacing[3], alignItems: "center" }}>
        <Skeleton width={44} height={44} borderRadius={22} />
        <View style={{ flex: 1, gap: tokens.spacing[2] }}>
          <Skeleton width="50%" height={14} />
          <Skeleton width="35%" height={12} />
        </View>
      </View>
      <SkeletonText lines={3} />
      <Skeleton width="40%" height={32} borderRadius={tokens.radius.md} />
    </View>
  );
}

export function SkeletonListItem() {
  const tokens = useTokens();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[3],
      }}
    >
      <Skeleton width={40} height={40} borderRadius={20} />
      <View style={{ flex: 1, gap: tokens.spacing[2] }}>
        <Skeleton width="55%" height={14} />
        <Skeleton width="38%" height={12} />
      </View>
      <Skeleton width={24} height={14} />
    </View>
  );
}