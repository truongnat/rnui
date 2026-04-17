import React, { useMemo } from 'react';
import { View, Text, TextInput, type TextStyle } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSlider, useTokens, useComponentTokens } from '@truongdq01/headless';
import type {
  UseSliderOptions,
  UseSliderOptionsRange,
  UseSliderOptionsSingle,
  UseSliderReturnRange,
  UseSliderReturnSingle,
} from '@truongdq01/headless';

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
    kind: 'single' | 'low' | 'high';
    value: number;
  }) => React.ReactNode;
};

export type SliderProps =
  | (SliderUiProps & UseSliderOptionsSingle)
  | (SliderUiProps & UseSliderOptionsRange);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/** Worklet snap (mirrors headless `snapRatioWorklet` for live labels). */
function snapSliderValueWorklet(
  raw: number,
  minV: number,
  maxV: number,
  stepV: number
): number {
  'worklet';
  if (stepV === 0 || maxV === minV) return Math.max(minV, Math.min(maxV, raw));
  const snapped = Math.round((raw - minV) / stepV) * stepV + minV;
  return Math.max(minV, Math.min(maxV, snapped));
}

type LiveValueStyle = Pick<TextStyle, 'fontSize' | 'fontWeight' | 'color'>;

function SliderLiveSingleValue(props: {
  show: boolean;
  thumbRatioShared: UseSliderReturnSingle['thumbRatioShared'];
  min: number;
  max: number;
  step: number;
  style: LiveValueStyle;
}) {
  const { show, thumbRatioShared, min, max, step, style } = props;
  const animatedProps = useAnimatedProps(() => {
    const raw = thumbRatioShared.value * (max - min) + min;
    const s = snapSliderValueWorklet(raw, min, max, step);
    return { text: String(s) };
  });
  if (!show) return null;
  return (
    <AnimatedTextInput
      animatedProps={animatedProps as object}
      editable={false}
      pointerEvents="none"
      underlineColorAndroid="transparent"
      style={{
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 40,
        textAlign: 'right',
      }}
    />
  );
}

function SliderLiveRangeValue(props: {
  show: boolean;
  thumbRatioLowShared: UseSliderReturnRange['thumbRatioLowShared'];
  thumbRatioHighShared: UseSliderReturnRange['thumbRatioHighShared'];
  min: number;
  max: number;
  step: number;
  style: LiveValueStyle;
}) {
  const {
    show,
    thumbRatioLowShared,
    thumbRatioHighShared,
    min,
    max,
    step,
    style,
  } = props;
  const animatedProps = useAnimatedProps(() => {
    const rawLo = thumbRatioLowShared.value * (max - min) + min;
    const rawHi = thumbRatioHighShared.value * (max - min) + min;
    const lo = snapSliderValueWorklet(rawLo, min, max, step);
    const hi = snapSliderValueWorklet(rawHi, min, max, step);
    return { text: `${lo} – ${hi}` };
  });
  if (!show) return null;
  return (
    <AnimatedTextInput
      animatedProps={animatedProps as object}
      editable={false}
      pointerEvents="none"
      underlineColorAndroid="transparent"
      style={{
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        padding: 0,
        margin: 0,
        minWidth: 56,
        textAlign: 'right',
      }}
    />
  );
}

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
  orientation = 'horizontal',
  range = false,
  ...rest
}: SliderProps) {
  const tokens = useTokens();
  const { slider } = useComponentTokens();
  const isVertical = orientation === 'vertical';

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
      ? Array.from(
          { length: Math.floor((max - min) / step) + 1 },
          (_, i) => i * step + min
        )
      : [];

  const liveValueStyle = useMemo(
    (): LiveValueStyle => ({
      fontSize: tokens.fontSize.sm,
      fontWeight: tokens.fontWeight.semibold,
      color: tokens.color.brand.default,
    }),
    [tokens.color.brand.default, tokens.fontSize.sm, tokens.fontWeight.semibold]
  );

  const trackThickness = slider.track.height;
  const thumbW = slider.thumb.width;
  const thumbH = slider.thumb.height;

  // Match Meta's minimum comfortable hit target (48dp) while keeping the visual thumb smaller.
  const minHitSize = 48;
  const trackPad = Math.max(12, (minHitSize - thumbH) / 2);

  const thumbShellStyle = useMemo(() => {
    const chrome = thumbRenderer
      ? {
          backgroundColor: 'transparent' as const,
          borderWidth: 0,
          borderColor: 'transparent' as const,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 } as const,
          shadowColor: 'transparent' as const,
        }
      : {
          backgroundColor: slider.thumb.bg,
          borderWidth: slider.thumb.borderWidth,
          borderColor: slider.thumb.borderColor,
          shadowColor: slider.thumb.shadowColor,
          shadowOffset: slider.thumb.shadowOffset,
          shadowOpacity: slider.thumb.shadowOpacity,
          shadowRadius: slider.thumb.shadowRadius,
          elevation: slider.thumb.elevation,
        };
    return {
      position: 'absolute' as const,
      width: thumbW,
      height: thumbH,
      borderRadius: slider.thumb.borderRadius,
      ...chrome,
      ...(isVertical
        ? {
            left: '50%' as const,
            marginLeft: -thumbW / 2,
            top: (-thumbH / 2) as number,
          }
        : { left: (-thumbW / 2) as number, top: undefined as undefined }),
    };
  }, [thumbRenderer, isVertical, thumbW, thumbH, slider.thumb]);

  function renderThumb(
    animatedStyle: object,
    kind: 'single' | 'low' | 'high',
    value: number
  ) {
    const custom = thumbRenderer?.({ kind, value });
    return (
      <Animated.View style={[thumbShellStyle, animatedStyle] as any}>
        {custom ?? null}
      </Animated.View>
    );
  }

  if (sliderState.mode === 'range') {
    const {
      currentValue,
      thumbRatioLowShared,
      thumbRatioHighShared,
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: tokens.spacing[2],
            }}
          >
            {label && (
              <Text
                style={{
                  fontSize: tokens.fontSize.sm,
                  fontWeight: tokens.fontWeight.medium,
                  color: tokens.color.text.secondary,
                }}
              >
                {label}
              </Text>
            )}
            {showValue && (
              <SliderLiveRangeValue
                show={showValue}
                thumbRatioLowShared={thumbRatioLowShared}
                thumbRatioHighShared={thumbRatioHighShared}
                min={min}
                max={max}
                step={step}
                style={liveValueStyle}
              />
            )}
          </View>
        )}

        <Animated.View
          style={
            [
              {
                paddingVertical: isVertical ? 0 : trackPad,
                paddingHorizontal: isVertical ? trackPad : 0,
              },
              trackAnimatedStyle,
            ] as any
          }
        >
          <View
            style={
              isVertical
                ? {
                    width: thumbW + trackPad * 2,
                    height: sliderHeight,
                    justifyContent: 'center',
                  }
                : { height: thumbH + trackPad * 2, justifyContent: 'center' }
            }
            onLayout={(e) =>
              onTrackLayout(
                isVertical
                  ? e.nativeEvent.layout.height
                  : e.nativeEvent.layout.width
              )
            }
          >
            <View
              style={{
                position: 'absolute',
                ...(isVertical
                  ? {
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      marginLeft: -trackThickness / 2,
                      width: trackThickness,
                    }
                  : { left: 0, right: 0, height: trackThickness }),
                borderRadius: slider.track.borderRadius,
                backgroundColor: slider.track.bgOff,
                overflow: 'hidden',
              }}
            >
              <Animated.View
                style={
                  [
                    {
                      height: isVertical ? '100%' : slider.track.height,
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
                      position: 'absolute',
                      left: `${markPct * 100}%`,
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginLeft: -2,
                      backgroundColor: isActive
                        ? slider.track.bgOn
                        : tokens.color.border.strong,
                      top: (thumbH - 4) / 2 + trackPad,
                    }}
                  />
                );
              })}

            <GestureDetector gesture={panGestureLow}>
              {renderThumb(thumbLowAnimatedStyle, 'low', lo)}
            </GestureDetector>
            <GestureDetector gesture={panGestureHigh}>
              {renderThumb(thumbHighAnimatedStyle, 'high', hi)}
            </GestureDetector>
          </View>
        </Animated.View>

        {showRangeLabels && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: -tokens.spacing[1],
            }}
          >
            <Text
              style={{
                fontSize: tokens.fontSize.xs,
                color: tokens.color.text.tertiary,
              }}
            >
              {formatValue(min)}
            </Text>
            <Text
              style={{
                fontSize: tokens.fontSize.xs,
                color: tokens.color.text.tertiary,
              }}
            >
              {formatValue(max)}
            </Text>
          </View>
        )}
      </View>
    );
  }

  const {
    currentValue,
    thumbRatioShared,
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: tokens.spacing[2],
          }}
        >
          {label && (
            <Text
              style={{
                fontSize: tokens.fontSize.sm,
                fontWeight: tokens.fontWeight.medium,
                color: tokens.color.text.secondary,
              }}
            >
              {label}
            </Text>
          )}
          {showValue && (
            <SliderLiveSingleValue
              show={showValue}
              thumbRatioShared={thumbRatioShared}
              min={min}
              max={max}
              step={step}
              style={liveValueStyle}
            />
          )}
        </View>
      )}

      <Animated.View
        style={
          [
            {
              paddingVertical: isVertical ? 0 : trackPad,
              paddingHorizontal: isVertical ? trackPad : 0,
            },
            trackAnimatedStyle,
          ] as any
        }
      >
        <GestureDetector gesture={panGesture}>
          <View
            style={
              isVertical
                ? {
                    width: thumbW + trackPad * 2,
                    height: sliderHeight,
                    justifyContent: 'center',
                  }
                : { height: thumbH + trackPad * 2, justifyContent: 'center' }
            }
            onLayout={(e) =>
              onTrackLayout(
                isVertical
                  ? e.nativeEvent.layout.height
                  : e.nativeEvent.layout.width
              )
            }
          >
            <View
              style={{
                position: 'absolute',
                ...(isVertical
                  ? {
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      marginLeft: -trackThickness / 2,
                      width: trackThickness,
                    }
                  : { left: 0, right: 0, height: trackThickness }),
                borderRadius: slider.track.borderRadius,
                backgroundColor: slider.track.bgOff,
                overflow: 'hidden',
              }}
            >
              <Animated.View
                style={
                  [
                    {
                      height: isVertical ? '100%' : slider.track.height,
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
                      position: 'absolute',
                      left: `${markPct * 100}%`,
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginLeft: -2,
                      backgroundColor: isActive
                        ? slider.track.bgOn
                        : tokens.color.border.strong,
                      top: (thumbH - 4) / 2 + trackPad,
                    }}
                  />
                );
              })}

            {renderThumb(thumbAnimatedStyle, 'single', currentValue)}
          </View>
        </GestureDetector>
      </Animated.View>

      {showRangeLabels && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -tokens.spacing[1],
          }}
        >
          <Text
            style={{
              fontSize: tokens.fontSize.xs,
              color: tokens.color.text.tertiary,
            }}
          >
            {formatValue(min)}
          </Text>
          <Text
            style={{
              fontSize: tokens.fontSize.xs,
              color: tokens.color.text.tertiary,
            }}
          >
            {formatValue(max)}
          </Text>
        </View>
      )}
    </View>
  );
}
