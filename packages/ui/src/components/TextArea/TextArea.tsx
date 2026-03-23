import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
} from "react-native";
import { useComponentTokens, useTokens } from "@truongnat/headless";

export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  helperText?: string;
  /** Minimum number of visible lines */
  minLines?: number;
  /** Maximum lines before scroll kicks in */
  maxLines?: number;
  /** Show character counter */
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  accessibilityLabel?: string;
}

export function TextArea({
  label,
  placeholder,
  value = "",
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  minLines = 3,
  maxLines = 8,
  maxLength,
  disabled = false,
  autoFocus = false,
  accessibilityLabel,
}: TextAreaProps) {
  const { textArea } = useComponentTokens();
  const tokens = useTokens();
  const [isFocused, setIsFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const LINE_HEIGHT = tokens.fontSize.md * tokens.lineHeight.normal;
  const minHeight = minLines * LINE_HEIGHT + tokens.spacing[3] * 2;
  const maxHeight = maxLines * LINE_HEIGHT + tokens.spacing[3] * 2;

  const dynamicHeight = contentHeight
    ? Math.min(Math.max(contentHeight + tokens.spacing[3] * 2, minHeight), maxHeight)
    : minHeight;

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    setContentHeight(e.nativeEvent.contentSize.height);
  };

  const containerStyle = [
    textArea.container,
    { height: dynamicHeight },
    isFocused && textArea.state.focused,
    error && textArea.state.error,
    disabled && textArea.state.disabled,
  ];

  const charCount = value.length;
  const nearLimit = maxLength && charCount >= maxLength * 0.9;
  const atLimit = maxLength && charCount >= maxLength;

  return (
    <View>
      {/* Label row */}
      {(label || maxLength) && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: tokens.spacing[1] }}>
          {label && <Text style={textArea.label}>{label}</Text>}
          {maxLength && (
            <Text
              style={{
                fontSize: tokens.fontSize.xs,
                color: atLimit
                  ? tokens.color.error.text
                  : nearLimit
                  ? tokens.color.warning.text
                  : tokens.color.text.tertiary,
                fontWeight: atLimit ? tokens.fontWeight.semibold : tokens.fontWeight.regular,
              }}
            >
              {charCount}/{maxLength}
            </Text>
          )}
        </View>
      )}

      {/* Text area */}
      <View style={containerStyle as any}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={textArea.text.placeholderColor}
          multiline
          scrollEnabled={contentHeight + tokens.spacing[3] * 2 > maxHeight}
          maxLength={maxLength}
          editable={!disabled}
          autoFocus={autoFocus}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled }}
          onContentSizeChange={handleContentSizeChange}
          style={{
            flex: 1,
            width: "100%",
            fontSize: tokens.fontSize.md,
            color: textArea.text.color,
            lineHeight: LINE_HEIGHT,
            textAlignVertical: "top",
            paddingTop: 0,
            paddingBottom: 0,
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
      </View>

      {/* Helper / error */}
      {error ? (
        <Text style={textArea.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={textArea.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}