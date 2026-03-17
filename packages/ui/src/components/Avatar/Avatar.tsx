import React from "react";
import { View, Text, Image } from "react-native";
import { useTokens } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /** Image URI */
  src?: string;
  /** Fallback initials if no src */
  initials?: string;
  /** Fallback when no src and no initials */
  fallbackIcon?: React.ReactNode;
  size?: AvatarSize;
  status?: AvatarStatus;
  shape?: "circle" | "rounded";
  /** Accessible label */
  accessibilityLabel?: string;
}

const SIZES: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 52,
  xl: 68,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 15,
  lg: 18,
  xl: 24,
};

const STATUS_COLORS = {
  online:  "#22C55E",
  offline: "#9CA3AF",
  busy:    "#EF4444",
  away:    "#F59E0B",
};

const STATUS_DOT: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
};

// Deterministic color from initials string
const BG_PALETTE = [
  "#EEEDFE", // purple-50
  "#E1F5EE", // teal-50
  "#FAECE7", // coral-50
  "#FBEAF0", // pink-50
  "#EAF3DE", // green-50
  "#FAEEDA", // amber-50
  "#E6F1FB", // blue-50
];
const TEXT_PALETTE = [
  "#3C3489",
  "#085041",
  "#712B13",
  "#72243E",
  "#27500A",
  "#633806",
  "#0C447C",
];

function getColorIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % BG_PALETTE.length;
}

// ─── Avatar ───────────────────────────────────────────────────────

export function Avatar({
  src,
  initials,
  fallbackIcon,
  size = "md",
  status,
  shape = "circle",
  accessibilityLabel,
}: AvatarProps) {
  const tokens = useTokens();
  const dim = SIZES[size];
  const radius = shape === "circle" ? dim / 2 : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;

  const dotSize = status ? STATUS_DOT[size] : 0;

  return (
    <View style={{ width: dim, height: dim }} accessible={!!accessibilityLabel} accessibilityLabel={accessibilityLabel}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={{ width: dim, height: dim, borderRadius: radius }}
          accessibilityLabel={accessibilityLabel}
        />
      ) : initials ? (
        <View
          style={{
            width: dim,
            height: dim,
            borderRadius: radius,
            backgroundColor: BG_PALETTE[colorIdx],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZES[size],
              fontWeight: "600",
              color: TEXT_PALETTE[colorIdx],
              letterSpacing: 0.5,
            }}
          >
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      ) : (
        // Generic fallback
        <View
          style={{
            width: dim,
            height: dim,
            borderRadius: radius,
            backgroundColor: tokens.color.bg.muted,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fallbackIcon ?? (
            <Text style={{ fontSize: FONT_SIZES[size], color: tokens.color.text.tertiary }}>
              ?
            </Text>
          )}
        </View>
      )}

      {/* Status dot */}
      {status && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: STATUS_COLORS[status],
            borderWidth: 1.5,
            borderColor: tokens.color.surface.default,
          }}
        />
      )}
    </View>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  overlap?: number;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  overlap,
}: AvatarGroupProps) {
  const tokens = useTokens();
  const dim = SIZES[size];
  const gap = overlap ?? Math.round(dim * 0.3);

  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: visible.length * (dim - gap) + gap + (overflow > 0 ? dim - gap : 0),
        height: dim,
      }}
    >
      {visible.map((avatar, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: i * (dim - gap),
            zIndex: visible.length - i,
            borderWidth: 2,
            borderColor: tokens.color.surface.default,
            borderRadius: dim / 2 + 2,
          }}
        >
          <Avatar {...avatar} size={size} />
        </View>
      ))}

      {overflow > 0 && (
        <View
          style={{
            position: "absolute",
            left: visible.length * (dim - gap),
            width: dim,
            height: dim,
            borderRadius: dim / 2,
            backgroundColor: tokens.color.bg.muted,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: tokens.color.surface.default,
            zIndex: 0,
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZES[size],
              color: tokens.color.text.secondary,
              fontWeight: "600",
            }}
          >
            +{overflow}
          </Text>
        </View>
      )}
    </View>
  );
}