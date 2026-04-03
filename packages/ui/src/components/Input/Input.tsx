import React, { useMemo, useState, useEffect } from "react";
import {
  TextInput as RNTextInput,
  View,
  Text,
  type TextInputProps as RNTextInputProps,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";
import { useComponentTokens, useTokens, useIconStyle } from "@truongdq01/headless";
import { useFormGroupVariant } from "../FormField/FormGroupContext";
import { AnimatedHelperText } from "./AnimatedHelperText";

const FOCUS_MS = 150;

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

// ─── Types ────────────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<RNTextInputProps, "style" | "onChange"> {
  /** Callback for when the text changes */
  onChange?: (text: string) => void;
  /** Field label shown above input (or floating inside when `floatingLabel`) */
  label?: string;
  /** Error message shown below input */
  error?: string;
  /** Helper text shown below input (overridden by error) */
  helperText?: string;
  /** Animate label inside the field (Material / Telegram-style) */
  floatingLabel?: boolean;
  /** Size preset */
  size?: InputSize;
  /** Slot for leading icon/element inside input */
  leadingElement?: React.ReactNode;
  /** Slot for trailing icon/element inside input */
  trailingElement?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
  /** Callback when error should be cleared (called on first keystroke) */
  onClearError?: () => void;
}

// ─── Component ────────────────────────────────────────────────────

export function Input({
  label,
  error,
  helperText,
  floatingLabel = false,
  size = "md",
  leadingElement,
  trailingElement,
  disabled = false,
  onClearError,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  placeholder,
  accessibilityLabel: accessibilityLabelProp,
  ...rest
}: InputProps) {
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const { size: iconSize, color: iconColor } = useIconStyle("input");
  const formGroupVariant = useFormGroupVariant();
  const isGrouped = formGroupVariant === "grouped";

  const [isFocused, setIsFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [uncontrolledText, setUncontrolledText] = useState(() =>
    defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : ""
  );

  const hasValue =
    value !== undefined && value !== null
      ? String(value).length > 0
      : uncontrolledText.length > 0;

  const focusProgress = useSharedValue(0);
  const floatProgress = useSharedValue(0);
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

  useEffect(() => {
    if (!floatingLabel || !label) return;
    floatProgress.value = withTiming(isFocused || hasValue ? 1 : 0, { duration: FOCUS_MS });
  }, [isFocused, hasValue, floatingLabel, label, floatProgress]);

  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;
  const errorBorder = tokens.color.border.error;
  const disabledBorder = tokens.color.border.default;

  const fl = input.floatingLabel;

  const animatedContainerStyle = useAnimatedStyle(() => {
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
      borderColor: interpolateColor(focusProgress.value, [0, 1], [defaultBorder, focusBorder]),
    };
  }, [defaultBorder, disabledBorder, errorBorder, focusBorder]);

  const floatingLabelStyle = useAnimatedStyle(() => {
    if (!floatingLabel || !label || !fl) {
      return {};
    }
    const inactiveFs = fl.fontSize.inactive;
    const activeFs = fl.fontSize.active;
    const inactiveC = fl.color.inactive;
    const activeC = fl.color.active;
    const ty0 = fl.translateY.inactive;
    const ty1 = fl.translateY.active;
    return {
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: interpolate(floatProgress.value, [0, 1], [16, 6]),
      transform: [{ translateY: interpolate(floatProgress.value, [0, 1], [ty0, ty1]) }],
      fontSize: interpolate(floatProgress.value, [0, 1], [inactiveFs, activeFs]),
      color: interpolateColor(floatProgress.value, [0, 1], [inactiveC, activeC]),
      pointerEvents: "none" as const,
    };
  }, [floatingLabel, label, fl]);

  const animatedInputPadStyle = useAnimatedStyle(() => {
    if (!floatingLabel || !label) {
      return {};
    }
    return {
      paddingTop: interpolate(floatProgress.value, [0, 1], [0, 12]),
    };
  }, [floatingLabel, label]);

  const staticContainerStyle = useMemo(() => {
    const groupedChrome = isGrouped
      ? {
          borderWidth: 0,
          borderRadius: 0,
          backgroundColor: "transparent" as const,
        }
      : {};

    return [
      input.container,
      input.size[size],
      !isGrouped && error && input.state.error,
      !isGrouped && disabled && input.state.disabled,
      groupedChrome,
    ];
  }, [input, size, error, disabled, isGrouped]);

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    if (value === undefined) {
      setUncontrolledText(text);
    }
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };

  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement<{ size?: number | string; color?: string }>(icon)) {
      return React.cloneElement(icon, {
        size: icon.props.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props.color ?? iconColor,
      });
    }
    return icon;
  };

  const placeholderResolved =
    floatingLabel && label ? (isFocused || hasValue ? placeholder ?? "" : "") : placeholder;

  const inner = (
    <>
      {renderIcon(leadingElement)}
      <View style={{ flex: 1, position: "relative" as const, justifyContent: "center" as const }}>
        {floatingLabel && label ? (
          <Animated.Text style={floatingLabelStyle as any}>{label}</Animated.Text>
        ) : null}
        <AnimatedTextInput
          style={[
            { flex: 1, color: input.text.color, fontSize: input.size[size].fontSize },
            animatedInputPadStyle,
          ]}
          placeholderTextColor={input.text.placeholderColor}
          editable={!disabled}
          accessibilityLabel={label ?? accessibilityLabelProp}
          accessibilityState={{ disabled }}
          value={value}
          defaultValue={defaultValue}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onChange={handleChange}
          placeholder={placeholderResolved}
          {...rest}
        />
      </View>
      {renderIcon(trailingElement)}
    </>
  );

  return (
    <View>
      {label && !floatingLabel ? <Text style={input.label}>{label}</Text> : null}

      <Animated.View style={[staticContainerStyle as any, animatedContainerStyle]}>{inner}</Animated.View>

      {error ? (
        <AnimatedHelperText text={error} isError={true} style={input.errorText as any} />
      ) : (
        <AnimatedHelperText text={helperText} isError={false} style={input.helperText as any} />
      )}
    </View>
  );
}
