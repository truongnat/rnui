import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useComponentTokens, useTokens } from '@truongdq01/headless';
import { useFormGroupVariant } from '../FormField/FormGroupContext';
import { AnimatedHelperText } from '../Input/AnimatedHelperText';

/** IMPROVEMENT_PLAN Issue #1 — `inside` | `above` (label row) | `below` (between field and helper) */
export type TextAreaCounterPosition = 'inside' | 'above' | 'below';

const FOCUS_MS = 150;

export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  helperText?: string;
  /**
   * Kept for API compatibility (e.g. TextField `rows`); layout height uses `maxLines` only.
   */
  minLines?: number;
  /** Visible height is fixed to this many lines; extra text scrolls inside. */
  maxLines?: number;
  /** Show character counter when `maxLength` is set */
  showCounter?: boolean;
  /**
   * `inside` = bottom-right inside the field (default);
   * `above` = same row as label (top);
   * `below` = between the field and helper/error.
   */
  counterPosition?: TextAreaCounterPosition;
  /** Maximum length (enables counter when `showCounter` is true) */
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  accessibilityLabel?: string;
}

export function TextArea({
  label,
  placeholder,
  value = '',
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  minLines: _minLines = 3,
  maxLines = 8,
  maxLength,
  showCounter = true,
  counterPosition = 'inside',
  disabled = false,
  autoFocus = false,
  accessibilityLabel,
}: TextAreaProps) {
  const { textArea } = useComponentTokens();
  const tokens = useTokens();
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === 'grouped';
  const [isFocused, setIsFocused] = useState(false);

  const focusProgress = useSharedValue(0);
  const errorSv = useSharedValue(0);
  const disabledSv = useSharedValue(0);
  const groupedSv = useSharedValue(0);

  useEffect(() => {
    errorSv.value = error ? 1 : 0;
  }, [error, errorSv]);

  useEffect(() => {
    disabledSv.value = disabled ? 1 : 0;
  }, [disabled, disabledSv]);

  useEffect(() => {
    groupedSv.value = isGrouped ? 1 : 0;
  }, [isGrouped, groupedSv]);

  useEffect(() => {
    if (error || disabled) {
      focusProgress.value = 0;
      return;
    }
    focusProgress.value = withTiming(isFocused ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, error, disabled, focusProgress]);

  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;

  const animatedBorderStyle = useAnimatedStyle(() => {
    if (groupedSv.value === 1) {
      return {};
    }
    if (errorSv.value === 1) {
      return { borderColor: errorBorder };
    }
    if (disabledSv.value === 1) {
      return { borderColor: disabledBorder };
    }
    return {
      borderColor: interpolateColor(
        focusProgress.value,
        [0, 1],
        [defaultBorder, focusBorder]
      ),
    };
  }, [defaultBorder, disabledBorder, errorBorder, focusBorder]);

  const LINE_HEIGHT = tokens.fontSize.md * tokens.lineHeight.normal;
  /** Fixed outer height from `maxLines` — no content measurement (avoids layout loops). */
  const maxHeight = maxLines * LINE_HEIGHT + tokens.spacing[3] * 2;

  /** Vertical padding inside bordered container (must match `textArea.container`). */
  const containerPadV = tokens.spacing[2];

  const showCounterAbove = Boolean(
    maxLength && showCounter && counterPosition === 'above'
  );
  const showCounterInside = Boolean(
    maxLength && showCounter && counterPosition === 'inside'
  );
  const showCounterBelow = Boolean(
    maxLength && showCounter && counterPosition === 'below'
  );
  const counterPaddingBottom = showCounterInside ? tokens.spacing[5] : 0;

  const innerMaxH = Math.max(1, maxHeight - 2 * containerPadV);

  const groupedChrome = isGrouped
    ? {
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: 'transparent' as const,
      }
    : {};

  const containerStyle = [
    textArea.container,
    { height: maxHeight },
    !isGrouped && error && textArea.state.error,
    !isGrouped && disabled && textArea.state.disabled,
    groupedChrome,
  ];

  const charCount = value.length;
  const nearLimit = maxLength && charCount >= maxLength * 0.9;
  const atLimit = maxLength && charCount >= maxLength;

  const counterColor = atLimit
    ? tokens.color.error.text
    : nearLimit
      ? tokens.color.warning.text
      : tokens.color.text.tertiary;

  const counterWeight = atLimit
    ? tokens.fontWeight.semibold
    : tokens.fontWeight.regular;

  const counterEl =
    maxLength && showCounter ? (
      <Text
        pointerEvents="none"
        style={{
          fontSize: tokens.fontSize.xs,
          color: counterColor,
          fontWeight: counterWeight,
        }}
      >
        {charCount}/{maxLength}
      </Text>
    ) : null;

  return (
    <View>
      {/* Label row — counter when `above` */}
      {(label || showCounterAbove) && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: tokens.spacing[1],
          }}
        >
          {label ? <Text style={textArea.label}>{label}</Text> : null}
          {showCounterAbove ? counterEl : null}
        </View>
      )}

      {/* Text area */}
      <Animated.View
        style={
          [
            containerStyle,
            showCounterInside && { position: 'relative' as const },
            animatedBorderStyle,
          ] as any
        }
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={textArea.text.placeholderColor}
          multiline
          scrollEnabled
          maxLength={maxLength}
          editable={!disabled}
          autoFocus={autoFocus}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled }}
          style={{
            height: innerMaxH,
            width: '100%',
            fontSize: tokens.fontSize.md,
            color: textArea.text.color,
            lineHeight: LINE_HEIGHT,
            textAlignVertical: 'top',
            paddingTop: 0,
            paddingBottom: counterPaddingBottom,
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
        />
        {showCounterInside && counterEl ? (
          <View
            style={{
              position: 'absolute',
              right: tokens.spacing[3],
              bottom: tokens.spacing[2],
            }}
          >
            {counterEl}
          </View>
        ) : null}
      </Animated.View>

      {/* Counter between field and helper — `below` */}
      {showCounterBelow && counterEl ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: tokens.spacing[1],
          }}
        >
          {counterEl}
        </View>
      ) : null}

      {error ? (
        <AnimatedHelperText
          text={error}
          isError={true}
          style={textArea.errorText as any}
        />
      ) : (
        <AnimatedHelperText
          text={helperText}
          isError={false}
          style={textArea.helperText as any}
        />
      )}
    </View>
  );
}
