import React from "react";
import { View, Text, Image, type ViewStyle } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
  style?: ViewStyle | ViewStyle[];
}

const STATUS_COLORS = {
  online:  "#22C55E",
  offline: "#9CA3AF",
  busy:    "#EF4444",
  away:    "#F59E0B",
};

const STATUS_DOT_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

const STATUS_DOT_COLORS = {
  online: "#22C55E",  // success
  away: "#F59E0B",    // warning
  offline: "#9CA3AF", // muted
  busy: "#EF4444",    // error
} as const;

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
  style,
}: AvatarProps) {
  const { avatar } = useComponentTokens();
  const tokens = useTokens();
  const sizeConfig = avatar.size[size];
  const radius = shape === "circle" ? sizeConfig.borderRadius : tokens.radius.md;
  const colorIdx = initials ? getColorIndex(initials) : 0;

  const dotSize = status ? STATUS_DOT_SIZE[size] : 0;

  return (
    <View
      style={[{ width: sizeConfig.width, height: sizeConfig.height }, style]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={{ width: sizeConfig.width, height: sizeConfig.height, borderRadius: radius }}
          accessibilityLabel={accessibilityLabel}
        />
      ) : initials ? (
        <View
          style={{
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: radius,
            backgroundColor: BG_PALETTE[colorIdx],
            alignItems: avatar.container.alignItems as any,
            justifyContent: avatar.container.justifyContent as any,
          }}
        >
          <Text
            style={{
              fontSize: sizeConfig.fontSize,
              fontWeight: avatar.text.fontWeight as any,
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
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: radius,
            backgroundColor: avatar.container.backgroundColor,
            alignItems: avatar.container.alignItems as any,
            justifyContent: avatar.container.justifyContent as any,
          }}
        >
          {fallbackIcon ?? (
            <Text style={{ fontSize: sizeConfig.fontSize, color: tokens.color.text.tertiary }}>
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
            borderWidth: avatar.presence.borderWidth,
            borderColor: avatar.presence.borderColor,
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
  const { avatar: avatarTokens } = useComponentTokens();
  const tokens = useTokens();
  const sizeConfig = avatarTokens.size[size];
  const dim = sizeConfig.width;
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
            borderWidth: avatarTokens.presence.borderWidth,
            borderColor: avatarTokens.presence.borderColor,
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
            backgroundColor: avatarTokens.container.backgroundColor,
            alignItems: avatarTokens.container.alignItems as any,
            justifyContent: avatarTokens.container.justifyContent as any,
            borderWidth: avatarTokens.presence.borderWidth,
            borderColor: avatarTokens.presence.borderColor,
            zIndex: 0,
          }}
        >
          <Text
            style={{
              fontSize: sizeConfig.fontSize,
              color: tokens.color.text.secondary,
              fontWeight: avatarTokens.text.fontWeight as any,
            }}
          >
            +{overflow}
          </Text>
        </View>
      )}
    </View>
  );
}