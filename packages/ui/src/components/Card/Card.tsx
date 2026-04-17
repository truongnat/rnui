import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { View, StyleProp, ViewStyle } from 'react-native';
import { usePressable, useComponentTokens } from '@truongdq01/headless';

// ─── Types ────────────────────────────────────────────────────────

export type CardPadding = 'sm' | 'md' | 'lg' | 'none';

export interface CardProps {
  children: React.ReactNode;
  /** If provided, card becomes pressable */
  onPress?: () => void;
  /** Inner padding preset */
  padding?: CardPadding;
  /** Accessibility label (required if pressable) */
  accessibilityLabel?: string;
  /** Additional style override */
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────

export function Card({
  children,
  onPress,
  padding = 'md',
  accessibilityLabel,
  style,
}: CardProps) {
  const { card } = useComponentTokens();

  const containerStyle = useMemo(
    () => [
      card.container,
      padding !== 'none' && { padding: card.padding[padding] },
      style,
    ],
    [card, padding, style]
  );

  if (onPress) {
    const { animatedStyle, gesture, accessibilityProps } = usePressable({
      onPress,
      feedbackMode: 'scaleSubtle',
      accessibilityLabel,
      accessibilityRole: 'button',
    });

    return (
      <GestureDetector gesture={gesture}>
        {/* Reanimated style prop is stricter than RN StyleProp when project uses web types; cast merged styles */}
        <Animated.View
          style={[containerStyle, animatedStyle] as any}
          {...accessibilityProps}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}
