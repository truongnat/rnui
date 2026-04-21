import { useId, useIsDark, useTheme } from '@truongdq01/headless';
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

/**
 * Available shimmer animation directions
 */
export type SkeletonShimmerDirection =
  | 'pulse'
  | 'left-to-right'
  | 'right-to-left';

// ─── Shared shimmer context ───────────────────────────────────────
const ShimmerCtx = createContext<SharedValue<number> | null>(null);

/**
 * Props for the ShimmerProvider component
 */
export interface ShimmerProviderProps {
  children: React.ReactNode;
  /** Animation duration per cycle (ms) */
  duration?: number;
}

/**
 * Provider component that shares shimmer animation across child skeletons.
 * Improves performance by using a single shared animation value.
 *
 * @param props - Shimmer provider configuration
 * @returns Context provider component
 *
 * @example
 * ```tsx
 * <ShimmerProvider>
 *   <Skeleton width={200} height={20} />
 *   <Skeleton width={150} height={20} />
 * </ShimmerProvider>
 * ```
 */
export function ShimmerProvider({
  children,
  duration = 1200,
}: ShimmerProviderProps) {
  const shimmer = useSharedValue(0);
  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration }), -1, true);
    return () => cancelAnimation(shimmer);
  }, [duration]);
  return <ShimmerCtx.Provider value={shimmer}>{children}</ShimmerCtx.Provider>;
}

function useShimmerValue(
  animate: boolean,
  delayMs: number
): SharedValue<number> {
  const shared = useContext(ShimmerCtx);
  const local = useSharedValue(0);

  useEffect(() => {
    if (shared || !animate) {
      cancelAnimation(local);
      local.value = 0;
      return;
    }
    const start = () => {
      local.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
    };
    if (delayMs > 0) {
      const t = setTimeout(start, delayMs);
      return () => {
        clearTimeout(t);
        cancelAnimation(local);
      };
    }
    start();
    return () => cancelAnimation(local);
  }, [animate, delayMs, !!shared]);

  return shared ?? local;
}

// ─── Base Skeleton ────────────────────────────────────────────────

export interface SkeletonProps {
  id?: string;
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
  id: idProp,
  width = '100%',
  height = 16,
  borderRadius,
  animate = true,
  delayMs = 0,
  shimmerDirection = 'pulse',
}: SkeletonProps) {
  const id = useId(idProp, 'skeleton');
  const {
    components: { skeleton },
  } = useTheme();
  const isDark = useIsDark();
  const shimmer = useShimmerValue(animate, delayMs);
  const [layoutW, setLayoutW] = useState(0);

  const sweepHighlight = isDark
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.45)';

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      shimmer.value,
      [0, 1],
      [skeleton.opacity.start, skeleton.opacity.end]
    ),
  }));

  const sweepStyle = useAnimatedStyle(() => {
    const w = Math.max(layoutW, 1);
    const sweep = w * 0.35;
    const t =
      shimmerDirection === 'right-to-left' ? 1 - shimmer.value : shimmer.value;
    return {
      transform: [{ translateX: interpolate(t, [0, 1], [-sweep, w]) }],
      opacity: 0.45,
    };
  });

  const isSweep =
    shimmerDirection === 'left-to-right' ||
    shimmerDirection === 'right-to-left';

  return (
    <Animated.View
      nativeID={id}
      style={[
        {
          width: width,
          height,
          borderRadius: borderRadius ?? skeleton.borderRadius,
          backgroundColor: skeleton.backgroundColor,
          overflow: 'hidden',
        },
        animate && !isSweep ? pulseStyle : null,
      ]}
      onLayout={(e) => setLayoutW(e.nativeEvent.layout.width)}
    >
      {animate && isSweep && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '35%',
              backgroundColor: sweepHighlight,
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

export const SkeletonText = React.memo(function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
  shimmerDirection = 'pulse',
}: {
  lines?: number;
  lastLineWidth?: `${number}%`;
  shimmerDirection?: SkeletonShimmerDirection;
}) {
  const { tokens } = useTheme();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          height={14}
          shimmerDirection={shimmerDirection}
        />
      ))}
    </View>
  );
});

export const SkeletonCard = React.memo(function SkeletonCard() {
  const { tokens } = useTheme();
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
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.spacing[3],
          alignItems: 'center',
        }}
      >
        <Skeleton width={44} height={44} borderRadius={22} />
        <View style={{ flex: 1, gap: tokens.spacing[2] }}>
          <Skeleton width="50%" height={14} />
          <Skeleton width="35%" height={12} />
        </View>
      </View>
      <SkeletonText lines={3} />
      <Skeleton width="40%" height={16} borderRadius={tokens.radius.md} />
    </View>
  );
});

export const SkeletonListItem = React.memo(function SkeletonListItem() {
  const { tokens } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
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
});

/** Avatar + two text lines — profile card placeholder */
export const SkeletonProfile = React.memo(function SkeletonProfile() {
  const { tokens } = useTheme();
  return (
    <View style={{ gap: tokens.spacing[4], alignItems: 'center' }}>
      <Skeleton
        width={96}
        height={96}
        borderRadius={48}
        shimmerDirection="left-to-right"
      />
      <Skeleton width="70%" height={18} />
      <Skeleton width="45%" height={14} />
    </View>
  );
});

/** 16:9 block + title lines */
export const SkeletonMedia = React.memo(function SkeletonMedia() {
  const { tokens } = useTheme();
  return (
    <View style={{ gap: tokens.spacing[3] }}>
      <Skeleton
        width="100%"
        height={180}
        borderRadius={tokens.radius.lg}
        shimmerDirection="left-to-right"
      />
      <Skeleton width="80%" height={16} />
      <Skeleton width="50%" height={13} />
    </View>
  );
});

/** Repeated label + field rows */
export const SkeletonForm = React.memo(function SkeletonForm({
  rows = 4,
}: {
  rows?: number;
}) {
  const { tokens } = useTheme();
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
});

/** N×M grid of squares */
export const SkeletonGrid = React.memo(function SkeletonGrid({
  columns = 3,
  rows = 2,
  cell = 48,
}: {
  columns?: number;
  rows?: number;
  cell?: number;
}) {
  const { tokens } = useTheme();
  return (
    <View
      style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[2] }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <Skeleton
          key={i}
          width={cell}
          height={cell}
          borderRadius={tokens.radius.sm}
        />
      ))}
    </View>
  );
});

/** Header row + data rows */
export const SkeletonTable = React.memo(function SkeletonTable({
  columns = 4,
  dataRows = 3,
}: {
  columns?: number;
  dataRows?: number;
}) {
  const { tokens } = useTheme();
  return (
    <View style={{ gap: tokens.spacing[2] }}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing[2] }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`h-${i}`} width={`${90 / columns}%`} height={14} />
        ))}
      </View>
      {Array.from({ length: dataRows }).map((_, r) => (
        <View key={r} style={{ flexDirection: 'row', gap: tokens.spacing[2] }}>
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton
              key={`${r}-${c}`}
              width={`${90 / columns}%`}
              height={12}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
