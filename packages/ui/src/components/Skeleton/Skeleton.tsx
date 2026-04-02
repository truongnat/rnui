import React, { useEffect, useState, Children, isValidElement, cloneElement } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  cancelAnimation,
} from "react-native-reanimated";
import { useTokens, useComponentTokens } from "@truongdq01/headless";

export type SkeletonShimmerDirection = "pulse" | "left-to-right" | "right-to-left";

// ─── Base Skeleton ────────────────────────────────────────────────

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  /** Disable shimmer animation */
  animate?: boolean;
  /** Stagger start — used by `SkeletonGroup` */
  delayMs?: number;
  /** Shimmer style — default `pulse` (opacity); LTR/RTL sweep uses translateX */
  shimmerDirection?: SkeletonShimmerDirection;
}

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  animate = true,
  delayMs = 0,
  shimmerDirection = "pulse",
}: SkeletonProps) {
  const { skeleton } = useComponentTokens();
  const shimmer = useSharedValue(0);
  const [layoutW, setLayoutW] = useState(0);

  useEffect(() => {
    if (!animate) {
      cancelAnimation(shimmer);
      shimmer.value = 0;
      return;
    }
    const start = () => {
      shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
    };
    if (delayMs > 0) {
      const t = setTimeout(start, delayMs);
      return () => {
        clearTimeout(t);
        cancelAnimation(shimmer);
      };
    }
    start();
    return () => {
      cancelAnimation(shimmer);
    };
  }, [animate, delayMs]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [skeleton.opacity.start, skeleton.opacity.end]),
  }));

  const sweepStyle = useAnimatedStyle(() => {
    const w = Math.max(layoutW, 1);
    const sweep = w * 0.35;
    const t = shimmerDirection === "right-to-left" ? 1 - shimmer.value : shimmer.value;
    return {
      transform: [{ translateX: interpolate(t, [0, 1], [-sweep, w]) }],
      opacity: 0.45,
    };
  });

  const isSweep = shimmerDirection === "left-to-right" || shimmerDirection === "right-to-left";

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: borderRadius ?? skeleton.borderRadius,
          backgroundColor: skeleton.backgroundColor,
          overflow: "hidden",
        },
        animate && !isSweep ? pulseStyle : null,
      ]}
      onLayout={(e) => setLayoutW(e.nativeEvent.layout.width)}
    >
      {animate && isSweep && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "35%",
              backgroundColor: "rgba(255,255,255,0.35)",
              borderRadius: borderRadius ?? skeleton.borderRadius,
            },
            sweepStyle,
          ]}
        />
      )}
    </Animated.View>
  );
}

// ─── SkeletonGroup — stagger children that accept `delayMs` ───────

export interface SkeletonGroupProps {
  children: React.ReactNode;
  /** Delay between each child (ms) */
  stagger?: number;
}

export function SkeletonGroup({ stagger = 80, children }: SkeletonGroupProps) {
  return (
    <>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as React.ReactElement<{ delayMs?: number }>, {
          delayMs: i * stagger,
        });
      })}
    </>
  );
}

// ─── Presets ──────────────────────────────────────────────────────

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  shimmerDirection = "pulse",
}: {
  lines?: number;
  lastLineWidth?: `${number}%`;
  shimmerDirection?: SkeletonShimmerDirection;
}) {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height={14}
          shimmerDirection={shimmerDirection}
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

/** Avatar + two text lines — profile card placeholder */
export function SkeletonProfile() {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[4], alignItems: "center" }}>
      <Skeleton width={96} height={96} borderRadius={48} shimmerDirection="left-to-right" />
      <Skeleton width="70%" height={18} />
      <Skeleton width="45%" height={14} />
    </View>
  );
}

/** 16:9 block + title lines */
export function SkeletonMedia() {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[3] }}>
      <Skeleton width="100%" height={180} borderRadius={tokens.radius.lg} shimmerDirection="left-to-right" />
      <Skeleton width="80%" height={16} />
      <Skeleton width="50%" height={13} />
    </View>
  );
}

/** Repeated label + field rows */
export function SkeletonForm({ rows = 4 }: { rows?: number }) {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[4] }}>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={{ gap: tokens.spacing[2] }}>
          <Skeleton width="30%" height={12} />
          <Skeleton width="100%" height={44} borderRadius={tokens.radius.md} />
        </View>
      ))}
    </View>
  );
}

/** N×M grid of squares */
export function SkeletonGrid({ columns = 3, rows = 2, cell = 48 }: { columns?: number; rows?: number; cell?: number }) {
  const tokens = useTokens();
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing[2] }}>
      {Array.from({ length: columns * rows }).map((_, i) => (
        <Skeleton key={i} width={cell} height={cell} borderRadius={tokens.radius.sm} />
      ))}
    </View>
  );
}

/** Header row + data rows */
export function SkeletonTable({ columns = 4, dataRows = 3 }: { columns?: number; dataRows?: number }) {
  const tokens = useTokens();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      <View style={{ flexDirection: "row", gap: tokens.spacing[2] }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`h-${i}`} width={`${90 / columns}%`} height={14} />
        ))}
      </View>
      {Array.from({ length: dataRows }).map((_, r) => (
        <View key={r} style={{ flexDirection: "row", gap: tokens.spacing[2] }}>
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={`${r}-${c}`} width={`${90 / columns}%`} height={12} />
          ))}
        </View>
      ))}
    </View>
  );
}
