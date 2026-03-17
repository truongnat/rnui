import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useSlider, useTokens } from "@rnui/headless";
import type { UseSliderOptions } from "@rnui/headless";

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 22;

export interface SliderProps extends UseSliderOptions {
  label?: string;
  /** Show current value as tooltip above thumb */
  showValue?: boolean;
  /** Custom value formatter */
  formatValue?: (v: number) => string;
  /** Show min/max labels */
  showRange?: boolean;
  /** Show step tick marks */
  showMarks?: boolean;
}

export function Slider({
  label,
  showValue = false,
  formatValue = (v) => String(v),
  showRange = false,
  showMarks = false,
  min = 0,
  max = 100,
  step = 1,
  ...hookOptions
}: SliderProps) {
  const tokens = useTokens();
  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
    percentage,
  } = useSlider({ min, max, step, ...hookOptions });

  const marks =
    showMarks && step > 0
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min)
      : [];

  return (
    <View>
      {/* Label row */}
      {(label || showValue) && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] }}>
          {label && (
            <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary }}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default }}>
              {formatValue(currentValue)}
            </Text>
          )}
        </View>
      )}

      {/* Track area — extra vertical padding for hit area */}
      <Animated.View style={[{ paddingVertical: 12 }, trackAnimatedStyle]}>
        <GestureDetector gesture={panGesture}>
          <View
            style={{ height: THUMB_SIZE, justifyContent: "center" }}
            onLayout={(e) => onTrackLayout(e.nativeEvent.layout.width)}
          >
            {/* Track background */}
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: TRACK_HEIGHT,
                borderRadius: TRACK_HEIGHT / 2,
                backgroundColor: tokens.color.bg.muted,
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <Animated.View
                style={[
                  {
                    height: TRACK_HEIGHT,
                    backgroundColor: tokens.color.brand.default,
                    borderRadius: TRACK_HEIGHT / 2,
                  },
                  fillAnimatedStyle,
                ]}
              />
            </View>

            {/* Step marks */}
            {showMarks && marks.map((mark) => {
              const markPct = (mark - min) / (max - min);
              const isActive = mark <= currentValue;
              return (
                <View
                  key={mark}
                  style={{
                    position: "absolute",
                    left: `${markPct * 100}%` as any,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    marginLeft: -2,
                    backgroundColor: isActive ? tokens.color.brand.default : tokens.color.border.strong,
                    top: (THUMB_SIZE - 4) / 2,
                  }}
                />
              );
            })}

            {/* Thumb */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: -(THUMB_SIZE / 2),
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  backgroundColor: tokens.color.surface.default,
                  borderWidth: 2,
                  borderColor: tokens.color.brand.default,
                  // Shadow
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.12,
                  shadowRadius: 4,
                  elevation: 3,
                },
                thumbAnimatedStyle,
              ]}
            />
          </View>
        </GestureDetector>
      </Animated.View>

      {/* Min / max range labels */}
      {showRange && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] }}>
          <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
            {formatValue(min)}
          </Text>
          <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
            {formatValue(max)}
          </Text>
        </View>
      )}
    </View>
  );
}