import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  FadeInUp,
  FadeOutUp,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { View, Text, Pressable } from "react-native";
import { useComponentTokens, useTokens } from "@truongnat/headless";
import { Icon } from "../Icon";
import type { ToastItem as ToastItemType, ToastPosition } from "@truongnat/headless";

const VARIANT_ICONS: Record<string, string> = {
  success: "checkCircle",
  error: "error",
  warning: "warning",
  info: "info",
};

export interface ToastItemProps {
  item: ToastItemType;
  position: ToastPosition;
  onDismiss: (id: string) => void;
}

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
    default: { iconColor: tokens.color.text.tertiary, progressColor: tokens.color.border.strong },
    success: { iconColor: tokens.color.success.icon, progressColor: tokens.color.success.icon },
    warning: { iconColor: tokens.color.warning.icon, progressColor: tokens.color.warning.icon },
    error: { iconColor: tokens.color.error.icon, progressColor: tokens.color.error.icon },
    info: { iconColor: tokens.color.info.icon, progressColor: tokens.color.info.icon },
  } as const;

  const v = variantMap[item.variant] || variantMap.default;

  const entering = position === "top" ? FadeInDown.springify().damping(18).stiffness(280) : FadeInUp.springify().damping(18).stiffness(280);
  const exiting = position === "top" ? FadeOutUp.duration(200) : FadeOutDown.duration(200);

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      style={[
        toast.container,
        toast.variant[item.variant] as any,
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
        <Icon size={20} color={v.iconColor} name={"VARIANT_ICONS[item.variant]" as any} />
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
        <Icon size={18} color={tokens.color.text.inverse} name={"close" as any} />
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
