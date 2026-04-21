import type { UseCheckboxOptions } from '@truongdq01/headless';
import {
  useCheckbox,
  useReduceMotionEnabled,
  useTheme,
} from '@truongdq01/headless';
import { spring } from '@truongdq01/tokens';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface CheckboxProps extends UseCheckboxOptions {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Checkbox({
  label,
  description,
  size = 'md',
  id: idProp,
  ...hookOptions
}: CheckboxProps) {
  const {
    components: { checkbox },
    tokens,
  } = useTheme();
  const reduceMotion = useReduceMotionEnabled();
  const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } =
    useCheckbox({ id: idProp, ...hookOptions });

  const sizeConfig = checkbox.size[size];

  // Animated values
  const scale = useSharedValue(1);
  const fillProgress = useSharedValue(isChecked || isIndeterminate ? 1 : 0);

  React.useEffect(() => {
    const target = isChecked || isIndeterminate ? 1 : 0;
    fillProgress.value = reduceMotion
      ? target
      : withSpring(target, spring.snappy);
  }, [isChecked, isIndeterminate, reduceMotion]);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      fillProgress.value,
      [0, 1],
      [
        checkbox.state.default.backgroundColor,
        checkbox.state.checked.backgroundColor,
      ]
    ),
    borderColor: interpolateColor(
      fillProgress.value,
      [0, 1],
      [checkbox.state.default.borderColor, checkbox.state.checked.borderColor]
    ),
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: fillProgress.value,
    transform: [{ scale: fillProgress.value }],
  }));

  const handlePress = () => {
    if (!reduceMotion) {
      scale.value = withSpring(0.88, spring.snappy, () => {
        scale.value = withSpring(1, spring.snappy);
      });
    }
    toggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        opacity: isDisabled ? checkbox.state.disabled.opacity : 1,
      }}
      {...accessibilityProps}
    >
      <Animated.View
        style={[
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: sizeConfig.borderRadius,
            borderWidth: sizeConfig.borderWidth,
            alignItems: checkbox.container.alignItems,
            justifyContent: checkbox.container.justifyContent,
            marginTop: 1,
          },
          boxStyle,
        ]}
      >
        <Animated.View style={checkStyle}>
          {isIndeterminate ? (
            <View
              style={{
                width: sizeConfig.iconSize,
                height: 2,
                backgroundColor: tokens.color.text.inverse,
                borderRadius: 1,
              }}
            />
          ) : (
            <Text
              style={{
                color: tokens.color.text.inverse,
                fontSize: sizeConfig.iconSize,
                fontWeight: '700',
                lineHeight: sizeConfig.iconSize + 2,
              }}
            >
              ✓
            </Text>
          )}
        </Animated.View>
      </Animated.View>

      {(label || description) && (
        <View style={{ flex: 1, paddingTop: 1 }}>
          {label && (
            <Text
              style={{
                fontSize: tokens.fontSize.md,
                color: tokens.color.text.primary,
                fontWeight: tokens.fontWeight.medium,
              }}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              style={{
                fontSize: tokens.fontSize.sm,
                color: tokens.color.text.secondary,
                marginTop: 2,
              }}
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
