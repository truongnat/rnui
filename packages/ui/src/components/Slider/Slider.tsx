import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useSlider, useTokens, useComponentTokens } from "@truongdq01/headless";
import type { UseSliderOptions } from "@truongdq01/headless";

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
  const { slider } = useComponentTokens();
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
    <View style={{ opacity: hookOptions.disabled ? slider.disabledOpacity : 1 }}>
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
            style={{ height: slider.thumb.height, justifyContent: "center" }}
            onLayout={(e) => onTrackLayout(e.nativeEvent.layout.width)}
          >
            {/* Track background */}
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: slider.track.height,
                borderRadius: slider.track.borderRadius,
                backgroundColor: slider.track.bgOff,
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <Animated.View
                style={[
                  {
                    height: slider.track.height,
                    backgroundColor: slider.track.bgOn,
                    borderRadius: slider.track.borderRadius,
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
                    left: `${markPct * 100}%`,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    marginLeft: -2,
                    backgroundColor: isActive ? slider.track.bgOn : tokens.color.border.strong,
                    top: (slider.thumb.height - 4) / 2,
                  }}
                />
              );
            })}

            {/* Thumb */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: -(slider.thumb.width / 2),
                  width: slider.thumb.width,
                  height: slider.thumb.height,
                  borderRadius: slider.thumb.borderRadius,
                  backgroundColor: slider.thumb.bg,
                  borderWidth: slider.thumb.borderWidth,
                  borderColor: slider.thumb.borderColor,
                  shadowColor: slider.thumb.shadowColor,
                  shadowOffset: slider.thumb.shadowOffset,
                  shadowOpacity: slider.thumb.shadowOpacity,
                  shadowRadius: slider.thumb.shadowRadius,
                  elevation: slider.thumb.elevation,
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