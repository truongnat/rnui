import {
  useOTPInput,
  useReduceMotionEnabled,
  useTheme,
} from '@truongdq01/headless';
import React, { useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  /** Show dots instead of digits (PIN entry). */
  mask?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  mask = false,
}: OTPInputProps) {
  const {
    components: { otpInput },
  } = useTheme();
  const reduceMotion = useReduceMotionEnabled();
  const { inputRef, isFocused, handlePress, getOtpProps } = useOTPInput({
    length,
    value,
    onChange,
    onComplete,
    disabled,
  });

  return (
    <View style={{ width: '100%' }}>
      <TextInput
        testID="rnui-otp-input"
        ref={inputRef}
        caretHidden
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          opacity: 0,
        }}
        secureTextEntry={mask}
        {...getOtpProps()}
      />

      <Pressable
        onPress={handlePress}
        style={[otpInput.container, { width: '100%' }]}
      >
        {Array.from({ length }).map((_, index) => {
          const char = value[index] || '';
          const isCurrentFocus = isFocused && value.length === index;
          const isFilled = char.length > 0;
          const isLastCellWhenFull =
            isFocused && value.length === length && index === length - 1;
          const hasFocusBorder = isCurrentFocus || isLastCellWhenFull;

          return (
            <OTPCell
              key={index}
              char={char}
              isFocused={hasFocusBorder}
              isFilled={isFilled}
              showCursor={isCurrentFocus && !isFilled}
              mask={mask}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </Pressable>
    </View>
  );
}

function OTPCell({
  char,
  isFocused,
  isFilled,
  showCursor,
  mask,
  reduceMotion,
}: {
  char: string;
  isFocused: boolean;
  isFilled: boolean;
  showCursor: boolean;
  mask: boolean;
  reduceMotion: boolean;
}) {
  const {
    components: { otpInput },
  } = useTheme();
  const scale = useSharedValue(1);
  const cursorOpacity = useSharedValue(1);

  useEffect(() => {
    if (showCursor && !reduceMotion) {
      cursorOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(cursorOpacity);
      cursorOpacity.value = 1;
    }
    return () => cancelAnimation(cursorOpacity);
  }, [showCursor, reduceMotion]);

  useEffect(() => {
    if (isFocused) {
      scale.value = withSequence(
        withTiming(1.1, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
    } else if (isFilled) {
      scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [isFocused, isFilled]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  const borderColor = isFocused
    ? otpInput.cell.focused.borderColor
    : isFilled
      ? otpInput.cell.filled.borderColor
      : otpInput.cell.borderColor;

  const backgroundColor = isFilled
    ? otpInput.cell.filled.backgroundColor
    : otpInput.cell.backgroundColor;

  const borderWidth = isFocused
    ? Math.max(otpInput.cell.borderWidth * 1.5, 2)
    : otpInput.cell.borderWidth;

  const displayChar = isFilled && mask ? '\u2022' : char;

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          aspectRatio: 1,
          minWidth: 0,
          maxHeight: otpInput.cell.height,
          borderRadius: otpInput.cell.borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth,
          borderColor,
          backgroundColor,
        },
        animatedStyle,
      ]}
    >
      {showCursor ? (
        <Animated.View
          style={[
            {
              width: 2,
              height: otpInput.cell.fontSize * 1.2,
              backgroundColor: otpInput.cell.focused.borderColor,
              borderRadius: 1,
            },
            cursorStyle,
          ]}
        />
      ) : (
        <Text
          style={{
            fontSize: otpInput.cell.fontSize,
            fontWeight: otpInput.cell.fontWeight,
            color: otpInput.cell.color,
          }}
        >
          {displayChar}
        </Text>
      )}
    </Animated.View>
  );
}
