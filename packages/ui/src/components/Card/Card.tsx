import {
  concentricRadius,
  useId,
  usePressable,
  useTheme,
  type ViewAnimatedStyle,
} from '@truongdq01/headless';
import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

// ─── Types ────────────────────────────────────────────────────────

export type CardPadding = 'sm' | 'md' | 'lg' | 'none';

// ─── Concentric radius context ─────────────────────────────────────
// Exposes the card's outer radius, applied padding, and the concentric inner
// radius so nested media/elements can round consistently (Astryx shape).
export interface CardSurface {
  radius: number;
  padding: number;
  innerRadius: number;
}

const CardSurfaceContext = createContext<CardSurface | null>(null);

/** Read the surrounding Card's concentric radius info (if any). */
export function useCardSurface(): CardSurface | null {
  return useContext(CardSurfaceContext);
}

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
    tokens,
  } = useTheme();

  const content = useMemo(() => {
    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <Text
          style={{
            color: tokens.color.text.primary,
            fontSize: tokens.fontSize.md,
            lineHeight: tokens.fontSize.md * 1.5,
          }}
        >
          {children}
        </Text>
      );
    }
    return children;
  }, [children, tokens]);

  const activePadding = padding === 'none' ? 0 : card.padding[padding];

  const containerStyle = useMemo(
    () => [
      card.container,
      padding !== 'none' && { padding: card.padding[padding] },
      style,
    ],
    [card, padding, style]
  );

  const surface = useMemo<CardSurface>(() => {
    const flat = StyleSheet.flatten(containerStyle) as ViewStyle;
    const radius =
      typeof flat.borderRadius === 'number'
        ? flat.borderRadius
        : card.container.borderRadius;
    return {
      radius,
      padding: activePadding,
      innerRadius: concentricRadius(radius, activePadding),
    };
  }, [containerStyle, card.container.borderRadius, activePadding]);

  const isPressable = onPress != null;
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    id,
    onPress: onPress ?? (() => {}),
    disabled: !isPressable,
    feedbackMode: isPressable ? 'scaleSubtle' : 'none',
    accessibilityLabel,
    accessibilityRole: isPressable ? 'button' : undefined,
  });

  if (isPressable) {
    return (
      <CardSurfaceContext.Provider value={surface}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={
              [containerStyle, animatedStyle] as StyleProp<ViewAnimatedStyle>
            }
            {...accessibilityProps}
          >
            {content}
          </Animated.View>
        </GestureDetector>
      </CardSurfaceContext.Provider>
    );
  }

  return (
    <CardSurfaceContext.Provider value={surface}>
      <View nativeID={id} style={containerStyle}>
        {content}
      </View>
    </CardSurfaceContext.Provider>
  );
}
