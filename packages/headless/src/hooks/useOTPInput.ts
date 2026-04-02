import { useState, useCallback, useRef } from "react";
import { TextInput, type TextInputProps } from "react-native";

/** Props for the hidden single-field OTP `TextInput` (paste/autofill). */
export type OtpHiddenInputProps = Pick<
  TextInputProps,
  "value" | "onChangeText" | "onFocus" | "onBlur" | "keyboardType" | "maxLength" | "editable"
> &
  Pick<TextInputProps, "textContentType" | "autoComplete">;

export interface UseOTPInputOptions {
  length: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

export interface UseOTPInputReturn {
  inputRef: React.RefObject<TextInput | null>;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  handlePress: () => void;
  handleChange: (text: string) => void;
  getOtpProps: () => OtpHiddenInputProps;
}

export function useOTPInput({
  length,
  value,
  onChange,
  onComplete,
  disabled = false,
}: UseOTPInputOptions): UseOTPInputReturn {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleChange = useCallback((text: string) => {
    const numericVal = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(numericVal);
    if (numericVal.length === length && onComplete) {
      onComplete(numericVal);
    }
  }, [length, onChange, onComplete]);

  return {
    inputRef,
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    handlePress,
    handleChange,
    getOtpProps: () => ({
      value,
      onChangeText: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      keyboardType: "number-pad" as const,
      textContentType: "oneTimeCode" as const,
      autoComplete: "one-time-code" as const,
      maxLength: length,
      editable: !disabled,
    }),
  };
}
