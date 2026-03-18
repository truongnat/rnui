import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  FadeInUp,
  FadeOutUp,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { View, Text, Pressable } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";
import { spring } from "@rnui/tokens";
import type { ToastItem as ToastItemType, ToastPosition } from "@rnui/headless";

function VariantIcon({ variant, color }: { variant: ToastItemType["variant"]; color: string }) {
  const size = 20;
  if (variant === "success") {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800", marginTop: -1 }}>✓</Text>
      </View>
    );
  }
  if (variant === "error") {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 13, fontWeight: "800", marginTop: -1 }}>✕</Text>
      </View>
    );
  }
  if (variant === "warning") {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 13, fontWeight: "900" }}>!</Text>
      </View>
    );
  }
  if (variant === "info") {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 13, fontWeight: "900" }}>i</Text>
      </View>
    );
  }
  return null;
}

// ─── Props ────────────────────────────────────────────────────────

interface ToastItemProps {
  item: ToastItemType;
  position: ToastPosition;
  onDismiss: (id: string) => void;
}

// ─── Component ────────────────────────────────────────────────────

export function ToastItem({ item, position, onDismiss }: ToastItemProps) {
  const { toast } = useComponentTokens();
  const tokens = useTokens();

  // Progress bar for auto-dismiss
  const progress = useSharedValue(1);

  useEffect(() => {
    if (item.persistent) return;
    progress.value = withTiming(0, { duration: item.duration }, (finished) => {
      if (finished) runOnJS(onDismiss)(item.id);
    });
    return () => {
      progress.value = 1;
    };
  }, [item.id, item.duration, item.persistent]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  // Pick variant colors
  const variantMap = {
    default: { icon: null, iconColor: tokens.color.text.tertiary, progressColor: tokens.color.border.strong },
    success: { icon: "success", iconColor: tokens.color.success.icon, progressColor: tokens.color.success.icon },
    warning: { icon: "warning", iconColor: tokens.color.warning.icon, progressColor: tokens.color.warning.icon },
    error: { icon: "error", iconColor: tokens.color.error.icon, progressColor: tokens.color.error.icon },
    info: { icon: "info", iconColor: tokens.color.info.icon, progressColor: tokens.color.info.icon },
  } as const;

  const v = variantMap[item.variant];

  const entering = position === "top" ? FadeInDown.springify().damping(18).stiffness(280) : FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? FadeOutUp.duration(200) : FadeOutDown.duration(200);

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      style={[
        toast.container,
        toast.variant[item.variant],
        { overflow: "hidden", marginBottom: 8 },
      ]}
    >
      {/* Icon */}
      {item.icon ? (
        <View style={{ width: 20, height: 20, alignItems: "center", justifyContent: "center" }}>
          {React.isValidElement(item.icon)
            ? React.cloneElement(item.icon as React.ReactElement, {
              size: (item.icon.props as any)?.size ?? 20,
              color: (item.icon.props as any)?.color ?? "#FFFFFF",
            } as any)
            : item.icon}
        </View>
      ) : item.variant !== "default" && (
        <VariantIcon variant={item.variant} color={v.iconColor} />
      )}

      {/* Message */}
      <Text style={[toast.text, { flex: 1 }]} numberOfLines={3}>
        {item.message}
      </Text>

      {/* Action button */}
      {item.action && (
        <Pressable
          onPress={() => {
            item.action!.onPress();
            onDismiss(item.id);
          }}
          style={{ paddingLeft: 4 }}
        >
          <Text style={{ fontSize: 13, fontWeight: "700", color: tokens.color.brand.muted }}>
            {item.action.label}
          </Text>
        </Pressable>
      )}

      {/* Dismiss button */}
      <Pressable onPress={() => onDismiss(item.id)} hitSlop={8}>
        <Text style={{ fontSize: 16, color: tokens.color.text.inverse, opacity: 0.7, lineHeight: 18 }}>✕</Text>
      </Pressable>

      {/* Progress bar */}
      {!item.persistent && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "transparent" }}>
          <Animated.View style={[{ height: 2, backgroundColor: v.progressColor, opacity: 0.5 }, progressStyle]} />
        </View>
      )}
    </Animated.View>
  );
}