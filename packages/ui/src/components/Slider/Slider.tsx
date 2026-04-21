import { useId, useSlider, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { SliderContext } from './context';
import { SliderMark } from './SliderMark';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';
import {
  SliderValueLabelRange,
  SliderValueLabelSingle,
} from './SliderValueLabel';
import type { LiveValueStyle, SliderProps } from './types';

export function Slider({
  id: idProp,
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
  const id = useId(idProp, 'slider');
  const {
    components: { slider },
    tokens,
  } = useTheme();
  const isVertical = orientation === 'vertical';

  const sliderState = useSlider({
    min,
    max,
    step,
    orientation,
    range: range as any,
    ...rest,
  } as any);

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
      fontWeight: tokens.fontWeight.semibold as any,
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
            left: '50%' as unknown as number,
            marginLeft: -thumbW / 2,
            top: (-thumbH / 2) as number,
          }
        : { left: (-thumbW / 2) as number, top: undefined as undefined }),
    };
  }, [thumbRenderer, isVertical, thumbW, thumbH, slider.thumb]);

  const headerRowStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: tokens.spacing[2],
    }),
    [tokens.spacing]
  );

  const labelTextStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.sm,
      fontWeight: tokens.fontWeight.medium as any,
      color: tokens.color.text.secondary,
    }),
    [tokens.fontSize.sm, tokens.fontWeight.medium, tokens.color.text.secondary]
  );

  const minMaxRowStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginTop: -tokens.spacing[1],
    }),
    [tokens.spacing]
  );

  const minMaxTextStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.xs,
      color: tokens.color.text.tertiary,
    }),
    [tokens.fontSize.xs, tokens.color.text.tertiary]
  );

  const disabled = (rest as { disabled?: boolean }).disabled;

  // ── Range mode ──────────────────────────────────────────────────────────────
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

    return (
      <SliderContext.Provider
        value={{
          currentValue,
          min,
          max,
          step,
          isRange: true,
          thumbRatioLowShared,
          thumbRatioHighShared,
        }}
      >
        <View
          nativeID={id}
          style={{ opacity: disabled ? slider.disabledOpacity : 1 }}
        >
          {(label || showValue) && (
            <View style={headerRowStyle}>
              {label && <Text style={labelTextStyle}>{label}</Text>}
              {showValue && (
                <SliderValueLabelRange
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

          <SliderTrack
            isVertical={isVertical}
            sliderHeight={sliderHeight}
            trackThickness={trackThickness}
            thumbW={thumbW}
            thumbH={thumbH}
            trackPad={trackPad}
            fillAnimatedStyle={fillAnimatedStyle}
            trackAnimatedStyle={trackAnimatedStyle}
            onTrackLayout={onTrackLayout}
          >
            {showMarks &&
              !isVertical &&
              marks.map((mark) => (
                <SliderMark
                  key={mark}
                  mark={mark}
                  min={min}
                  max={max}
                  isActive={mark <= hi && mark >= lo}
                  thumbH={thumbH}
                  trackPad={trackPad}
                />
              ))}
            <GestureDetector gesture={panGestureLow}>
              <SliderThumb
                animatedStyle={thumbLowAnimatedStyle}
                thumbShellStyle={thumbShellStyle}
                kind="low"
                value={lo}
                thumbRenderer={thumbRenderer}
              />
            </GestureDetector>
            <GestureDetector gesture={panGestureHigh}>
              <SliderThumb
                animatedStyle={thumbHighAnimatedStyle}
                thumbShellStyle={thumbShellStyle}
                kind="high"
                value={hi}
                thumbRenderer={thumbRenderer}
              />
            </GestureDetector>
          </SliderTrack>

          {showMinMaxLabels && (
            <View style={minMaxRowStyle}>
              <Text style={minMaxTextStyle}>{formatValue(min)}</Text>
              <Text style={minMaxTextStyle}>{formatValue(max)}</Text>
            </View>
          )}
        </View>
      </SliderContext.Provider>
    );
  }

  // ── Single mode ─────────────────────────────────────────────────────────────
  const {
    currentValue,
    thumbRatioShared,
    thumbAnimatedStyle,
    fillAnimatedStyle,
    trackAnimatedStyle,
    panGesture,
    onTrackLayout,
  } = sliderState;

  return (
    <SliderContext.Provider
      value={{
        currentValue,
        min,
        max,
        step,
        isRange: false,
        thumbRatioShared,
      }}
    >
      <View
        nativeID={id}
        style={{ opacity: disabled ? slider.disabledOpacity : 1 }}
      >
        {(label || showValue) && (
          <View style={headerRowStyle}>
            {label && <Text style={labelTextStyle}>{label}</Text>}
            {showValue && (
              <SliderValueLabelSingle
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

        <SliderTrack
          isVertical={isVertical}
          sliderHeight={sliderHeight}
          trackThickness={trackThickness}
          thumbW={thumbW}
          thumbH={thumbH}
          trackPad={trackPad}
          fillAnimatedStyle={fillAnimatedStyle}
          trackAnimatedStyle={trackAnimatedStyle}
          onTrackLayout={onTrackLayout}
        >
          <GestureDetector gesture={panGesture}>
            <>
              {showMarks &&
                !isVertical &&
                marks.map((mark) => (
                  <SliderMark
                    key={mark}
                    mark={mark}
                    min={min}
                    max={max}
                    isActive={mark <= currentValue}
                    thumbH={thumbH}
                    trackPad={trackPad}
                  />
                ))}
              <SliderThumb
                animatedStyle={thumbAnimatedStyle}
                thumbShellStyle={thumbShellStyle}
                kind="single"
                value={currentValue}
                thumbRenderer={thumbRenderer}
              />
            </>
          </GestureDetector>
        </SliderTrack>

        {showMinMaxLabels && (
          <View style={minMaxRowStyle}>
            <Text style={minMaxTextStyle}>{formatValue(min)}</Text>
            <Text style={minMaxTextStyle}>{formatValue(max)}</Text>
          </View>
        )}
      </View>
    </SliderContext.Provider>
  );
}
