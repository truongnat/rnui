import type React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/**
 * Animation types for overlay transitions
 */
export type OverlayAnimationType =
  | 'scale'
  | 'slideUp'
  | 'slideDown'
  | 'fade'
  | 'none';

/**
 * Spring configuration for spring animations
 */
export interface SpringConfig {
  dampingRatio?: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
}

/**
 * Props for the AnimatedOverlay component
 */
export interface AnimatedOverlayProps {
  /** Whether the overlay is visible. Alias for 'visible' */
  isVisible?: boolean;
  /** Whether the overlay is visible */
  visible?: boolean;
  /** Animation type for enter/exit transitions */
  animationType?: OverlayAnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether to use spring animation instead of timing */
  useSpring?: boolean;
  /** Spring configuration for spring animations */
  springConfig?: SpringConfig;
  /** Children to render inside the overlay */
  children: React.ReactNode;
  /** Custom styles for the overlay container */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for the backdrop */
  backdropStyle?: StyleProp<ViewStyle>;
  /** Opacity of the backdrop (0 to 1) */
  backdropOpacity?: number;
  /** Color of the backdrop */
  backdropColor?: string;
  /** Whether to show the backdrop */
  showBackdrop?: boolean;
  /** Callback when the backdrop is pressed */
  onBackdropPress?: () => void;
  /** Accessibility label for the overlay */
  accessibilityLabel?: string;
  /** Callback when animation starts */
  onAnimationStart?: (entering: boolean) => void;
  /** Callback when animation ends */
  onAnimationEnd?: (entering: boolean) => void;
  /** Test ID for testing */
  testID?: string;
}
