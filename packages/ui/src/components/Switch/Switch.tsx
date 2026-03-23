import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { useSwitch, useTokens, useComponentTokens } from "@truongnat/headless";
import { spring } from "@truongnat/tokens";
import type { UseSwitchOptions } from "@truongnat/headless";

export interface SwitchProps extends UseSwitchOptions {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export const Switch = React.memo(({ label, description, size = "md", ...hookOptions }: SwitchProps) => {
  const tokens = useTokens();
  const { switch: switchT } = useComponentTokens();
  const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch(hookOptions);

  const tTrack = switchT.track[size];
  const tThumb = switchT.thumb[size];
  const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;

  // Shared value 0 = off, 1 = on
  const progress = useSharedValue(isOn ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isOn ? 1 : 0, spring.snappy);
  }, [isOn]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [switchT.colors.trackOff, switchT.colors.trackOn]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * thumbTravel }],
  }));

  return (
    <Pressable
      onPress={toggle}
      disabled={isDisabled}
      style={{ flexDirection: "row", alignItems: "center", gap: 12, opacity: isDisabled ? switchT.colors.disabledOpacity : 1 }}
      {...accessibilityProps}
    >
      {/* Track */}
      <Animated.View
        style={[
          {
            width: tTrack.width,
            height: tTrack.height,
            borderRadius: tTrack.borderRadius,
            justifyContent: "center",
            padding: tTrack.padding,
          },
          trackStyle,
        ]}
      >
        {/* Thumb */}
        <Animated.View
          style={[
            {
              width: tThumb.width,
              height: tThumb.height,
              borderRadius: tThumb.borderRadius,
              backgroundColor: switchT.colors.thumb,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 2,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>

      {(label || description) && (
        <View style={{ flex: 1 }}>
          {label && (
            <Text style={{ fontSize: tokens.fontSize.md, color: tokens.color.text.primary, fontWeight: tokens.fontWeight.medium }}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: tokens.fontSize.sm, color: tokens.color.text.secondary, marginTop: 2 }}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
});