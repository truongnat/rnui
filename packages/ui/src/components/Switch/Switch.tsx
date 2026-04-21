import type { UseSwitchOptions } from '@truongdq01/headless';
import {
  useReduceMotionEnabled,
  useSwitch,
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

export interface SwitchProps extends UseSwitchOptions {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const Switch = React.memo(
  ({
    label,
    description,
    size = 'md',
    id: idProp,
    ...hookOptions
  }: SwitchProps) => {
    const {
      components: { switch: switchT },
      tokens,
    } = useTheme();
    const reduceMotion = useReduceMotionEnabled();
    const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch({
      id: idProp,
      ...hookOptions,
    });

    const tTrack = switchT.track[size];
    const tThumb = switchT.thumb[size];
    const thumbTravel = Math.max(
      0,
      tTrack.width - tThumb.width - tTrack.padding * 2
    );

    // Shared value 0 = off, 1 = on
    const progress = useSharedValue(isOn ? 1 : 0);

    React.useEffect(() => {
      const target = isOn ? 1 : 0;
      progress.value = reduceMotion
        ? target
        : withSpring(target, spring.snappy);
    }, [isOn, reduceMotion]);

    const trackStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [switchT.colors.trackOff, switchT.colors.trackOn]
      ),
    }));

    const thumbStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: progress.value * thumbTravel }],
    }));

    return (
      <Pressable
        onPress={toggle}
        disabled={isDisabled}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing[3],
          opacity: isDisabled ? switchT.colors.disabledOpacity : 1,
        }}
        {...accessibilityProps}
      >
        {/* Track */}
        <Animated.View
          style={[
            {
              width: tTrack.width,
              height: tTrack.height,
              borderRadius: tTrack.borderRadius,
              justifyContent: 'center',
              padding: tTrack.padding,
            },
            trackStyle,
          ]}
        >
          {/* Thumb */}
          <Animated.View
            style={[
              {
                width: tThumb.width,
                height: tThumb.height,
                borderRadius: tThumb.borderRadius,
                backgroundColor: switchT.colors.thumb,
                ...tokens.shadow.sm,
              },
              thumbStyle,
            ]}
          />
        </Animated.View>

        {(label || description) && (
          <View style={{ flex: 1 }}>
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
                  marginTop: tokens.spacing[0.5],
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
);
