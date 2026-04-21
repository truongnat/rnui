import { useId, usePressable, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { useMemo } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

// ─── Types ────────────────────────────────────────────────────────

export type CardPadding = 'sm' | 'md' | 'lg' | 'none';

export interface CardProps {
  id?: string;
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

// ─── Component ───────────────────────────────────────────────────

export function Card({
  id: idProp,
  children,
  onPress,
  padding = 'md',
  accessibilityLabel,
  style,
}: CardProps) {
  const id = useId(idProp, 'card');
  const {
    components: { card },
  } = useTheme();

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
      id,
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

  return <View nativeID={id} style={containerStyle}>{children}</View>;
}
