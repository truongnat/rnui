import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useSlider, useTokens, useComponentTokens } from "@truongdq01/headless";
import type {
  UseSliderOptions,
  UseSliderOptionsRange,
  UseSliderOptionsSingle,
  UseSliderReturnSingle,
} from "@truongdq01/headless";

type SliderUiProps = {
  label?: string;
  /** Show current value (single) or "lo – hi" (range) */
  showValue?: boolean;
  formatValue?: (v: number) => string;
  /** Min / max labels under the track */
  showMinMaxLabels?: boolean;
  showMarks?: boolean;
  /** Vertical track height when `orientation="vertical"` */
  sliderHeight?: number;
  /** Replace default thumb circle */
  thumbRenderer?: (args: {
    kind: "single" | "low" | "high";
    value: number;
  }) => React.ReactNode;
};

export type SliderProps =
  | (SliderUiProps & UseSliderOptionsSingle)
  | (SliderUiProps & UseSliderOptionsRange);

export function Slider({
  label,
  showValue = false,
  formatValue = (v: number) => String(v),
  showMinMaxLabels = false,
  showMarks = false,
  sliderHeight = 150,
  thumbRenderer,
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  range = false,
  ...rest
}: SliderProps) {
  const tokens = useTokens();
  const { slider } = useComponentTokens();
  const isVertical = orientation === "vertical";

  const sliderState = useSlider({
    min,
    max,
    step,
    orientation,
    range,
    ...rest,
  } as UseSliderOptions);

  const showRangeLabels = showMinMaxLabels;

  const marks =
    showMarks && step > 0
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => i * step + min)
      : [];

  const trackThickness = slider.track.height;
  const thumbW = slider.thumb.width;
  const thumbH = slider.thumb.height;

  const thumbShellStyle = {
    position: "absolute" as const,
    left: isVertical ? undefined : (-thumbW / 2) as number,
    top: isVertical ? (-thumbH / 2) as number : undefined,
    width: thumbW,
    height: thumbH,
    borderRadius: slider.thumb.borderRadius,
    backgroundColor: slider.thumb.bg,
    borderWidth: slider.thumb.borderWidth,
    borderColor: slider.thumb.borderColor,
    shadowColor: slider.thumb.shadowColor,
    shadowOffset: slider.thumb.shadowOffset,
    shadowOpacity: slider.thumb.shadowOpacity,
    shadowRadius: slider.thumb.shadowRadius,
    elevation: slider.thumb.elevation,
  };

  function renderThumb(
    animatedStyle: object,
    kind: "single" | "low" | "high",
    value: number
  ) {
    const custom = thumbRenderer?.({ kind, value });
    return (
      <Animated.View style={[thumbShellStyle, animatedStyle] as any}>
        {custom ?? null}
      </Animated.View>
    );
  }

  if (sliderState.mode === "range") {
    const {
      currentValue,
      thumbLowAnimatedStyle,
      thumbHighAnimatedStyle,
      fillAnimatedStyle,
      trackAnimatedStyle,
      panGestureLow,
      panGestureHigh,
      onTrackLayout,
    } = sliderState;
    const [lo, hi] = currentValue;
    const d = (rest as { disabled?: boolean }).disabled;

    return (
      <View style={{ opacity: d ? slider.disabledOpacity : 1 }}>
        {(label || showValue) && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[2] }}>
            {label && (
              <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary }}>
                {label}
              </Text>
            )}
            {showValue && (
              <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, color: tokens.color.brand.default }}>
                {formatValue(lo)} – {formatValue(hi)}
              </Text>
            )}
          </View>
        )}

        <Animated.View style={[{ paddingVertical: isVertical ? 0 : 12, paddingHorizontal: isVertical ? 12 : 0 }, trackAnimatedStyle] as any}>
          <View
            style={
              isVertical
                ? { width: thumbW + 24, height: sliderHeight, justifyContent: "center" }
                : { height: thumbH + 24, justifyContent: "center" }
            }
            onLayout={(e) =>
              onTrackLayout(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
            }
          >
            <View
              style={{
                position: "absolute",
                ...(isVertical
                  ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness }
                  : { left: 0, right: 0, height: trackThickness }),
                borderRadius: slider.track.borderRadius,
                backgroundColor: slider.track.bgOff,
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={
                  [
                    {
                      height: isVertical ? "100%" : slider.track.height,
                      backgroundColor: slider.track.bgOn,
                      borderRadius: slider.track.borderRadius,
                    },
                    fillAnimatedStyle,
                  ] as any
                }
              />
            </View>

            {showMarks &&
              !isVertical &&
              marks.map((mark) => {
                const markPct = (mark - min) / (max - min);
                const isActive = mark <= hi && mark >= lo;
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
                      top: (thumbH - 4) / 2 + 12,
                    }}
                  />
                );
              })}

            <GestureDetector gesture={panGestureLow}>
              {renderThumb(thumbLowAnimatedStyle, "low", lo)}
            </GestureDetector>
            <GestureDetector gesture={panGestureHigh}>
              {renderThumb(thumbHighAnimatedStyle, "high", hi)}
            </GestureDetector>
          </View>
        </Animated.View>

        {showRangeLabels && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] }}>
            <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>{formatValue(min)}</Text>
            <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>{formatValue(max)}</Text>
          </View>
        )}
      </View>
    );
  }

  const {
    currentValue,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
  } = sliderState as UseSliderReturnSingle;
  const disabled = (rest as { disabled?: boolean }).disabled;

  return (
    <View style={{ opacity: disabled ? slider.disabledOpacity : 1 }}>
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

      <Animated.View style={[{ paddingVertical: isVertical ? 0 : 12, paddingHorizontal: isVertical ? 12 : 0 }, trackAnimatedStyle] as any}>
        <GestureDetector gesture={panGesture}>
          <View
            style={
              isVertical
                ? { width: thumbW + 24, height: sliderHeight, justifyContent: "center" }
                : { height: thumbH + 24, justifyContent: "center" }
            }
            onLayout={(e) =>
              onTrackLayout(isVertical ? e.nativeEvent.layout.height : e.nativeEvent.layout.width)
            }
          >
            <View
              style={{
                position: "absolute",
                ...(isVertical
                  ? { top: 0, bottom: 0, left: "50%", marginLeft: -trackThickness / 2, width: trackThickness }
                  : { left: 0, right: 0, height: trackThickness }),
                borderRadius: slider.track.borderRadius,
                backgroundColor: slider.track.bgOff,
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={
                  [
                    {
                      height: isVertical ? "100%" : slider.track.height,
                      backgroundColor: slider.track.bgOn,
                      borderRadius: slider.track.borderRadius,
                    },
                    fillAnimatedStyle,
                  ] as any
                }
              />
            </View>

            {showMarks &&
              !isVertical &&
              marks.map((mark) => {
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
                      top: (thumbH - 4) / 2 + 12,
                    }}
                  />
                );
              })}

            {renderThumb(thumbAnimatedStyle, "single", currentValue)}
          </View>
        </GestureDetector>
      </Animated.View>

      {showRangeLabels && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -tokens.spacing[1] }}>
          <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>{formatValue(min)}</Text>
          <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>{formatValue(max)}</Text>
        </View>
      )}
    </View>
  );
}
